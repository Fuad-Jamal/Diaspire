import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { db } from '../firebase';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function GoogleAuthPopup({ mode = "signup", onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const isLogin = mode === "login";

  const handleRedirectAfterAuth = async (user) => {
  const role = localStorage.getItem("userRole");

  if (!role || !user?.email) {
    setMessage("Missing role or user email. Please try again.");
    return;
  }

  const collectionName = role === "professional" ? "mentors" : "mentees";
  const q = query(collection(db, collectionName), where("email", "==", user.email));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const docId = snapshot.docs[0].id;

    if (role === "professional") {
      localStorage.setItem("mentorId", docId);
      navigate("/mentor-dashboard");
    } else {
      localStorage.setItem("menteeId", docId);
      navigate("/dashboard");
    }
  } else {
    if (role === "professional") {
      navigate("/profile");
    } else {
      navigate("/mprofile");
    }
  }
};


  const storeMentorIdFromFirestore = async (user) => {
    const role = localStorage.getItem("userRole");
    if (role !== "professional") return;

    try {
      const q = query(collection(db, collectionName), where("email", "==", user.email));
      const snapshot = await getDocs(q);

      let profileDoc;
      if (!snapshot.empty) {
        profileDoc = snapshot.docs[0];
      } else {
        const newMentorRef = doc(db, "mentors", user.uid);
        await setDoc(newMentorRef, {
          name: user.displayName || "Unnamed Mentor",
          email: user.email,
          bio: "",
          linkedinUrl: "",
          img: "",
          title: "Mentor",
          category: "Tech"
        });
        localStorage.setItem("mentorId", user.uid);
      }
    } catch (err) {
      console.error("Error handling user profile:", err);
      localStorage.removeItem(idKey);
      setMessage("Something went wrong. Please try again.");
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const result = isLogin
        ? await signInWithEmailAndPassword(auth, email, password)
        : await createUserWithEmailAndPassword(auth, email, password);

      await storeMentorIdFromFirestore(result.user);
      onSignIn?.(result.user);
      await handleRedirectAfterAuth(result.user);
    } catch (error) {
      const errorMap = {
        'auth/email-already-in-use': 'This email is already registered. Try logging in instead.',
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/weak-password': 'Password should be at least 6 characters.',
        'auth/user-not-found': 'No account found with this email. Try signing up.',
        'auth/wrong-password': 'Incorrect password. Please try again.'
      };
      setMessage(errorMap[error.code] || error.message);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signOut(auth);
      const result = await signInWithPopup(auth, provider);
      await storeMentorIdFromFirestore(result.user);
      onSignIn?.(result.user);
      await handleRedirectAfterAuth(result.user);
    } catch (error) {
      setMessage(error.message);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login to Diaspire" : "Sign up to Diaspire"}
        </h2>

        {message && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-center text-sm">
            {message}
          </div>
        )}

        <form onSubmit={handleEmailAuth} className="flex flex-col gap-4 mb-6">
          <input
            type="email"
            placeholder="Email"
            className="border rounded p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border rounded p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded font-bold"
          >
            {isLogin ? "Login with Email" : "Sign up with Email"}
          </button>
        </form>

        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-red-500 text-white py-2 rounded font-bold mb-4"
        >
          Continue with Google
        </button>

        <button
          onClick={onClose}
          className="w-full bg-gray-300 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default GoogleAuthPopup;
