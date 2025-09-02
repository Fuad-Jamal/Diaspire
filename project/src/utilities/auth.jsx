import React, { useState } from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup, signInWithEmailAndPassword, signOut } from 'firebase/auth';

function GoogleSignIn({ onSignIn, onSignOut, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Google sign-in
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (onSignIn) onSignIn(user);
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  // Email/password sign-in
  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      if (onSignIn) onSignIn(user);
    } catch (error) {
      console.error('Email sign-in error:', error);
      alert(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      if (onSignOut) onSignOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign in to Diaspire</h2>

        {/* Email/Password form */}
        <form onSubmit={handleEmailSignIn} className="flex flex-col gap-4 mb-6">
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
            Sign in with Email
          </button>
        </form>

        {/* Google sign-in */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-red-500 text-white py-2 rounded font-bold mb-4"
        >
          Continue with Google
        </button>

        {/* Cancel button */}
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

export default GoogleSignIn;
