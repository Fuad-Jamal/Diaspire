import React, { useState } from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

function GoogleAuthPopup({ mode = "signup", onSignIn, onSignOut, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLogin = mode === "login";

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    try {
      let result;
      if (isLogin) {
        result = await signInWithEmailAndPassword(auth, email, password);
      } else {
        result = await createUserWithEmailAndPassword(auth, email, password);
      }
      onSignIn?.(result.user);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      onSignIn?.(result.user);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login to Diaspire" : "Sign up to Diaspire"}
        </h2>

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
