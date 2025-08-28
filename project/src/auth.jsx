import React from 'react';
import { auth, provider} from './firebase';
import { signInWithPopup,signOut } from 'firebase/auth'; // Import directly from SDK

function GoogleSignIn() {
    const handleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            // User info
            const user = result.user;
            console.log('Signed in user:', user);
            // You can handle user info here (e.g., save to state, redirect, etc.)
        } catch (error) {
            console.error('Google sign-in error:', error);
        }
    };

    const handleSignInOut = async () => {
        try {
            const result = await signOut(auth, provider);
            // User info
            const user = result.user;
            console.log('Signed in user:', user);
            // You can handle user info here (e.g., save to state, redirect, etc.)
        } catch (error) {
            console.error('Google sign-in error:', error);
        }
    };

    return (
        <>
        <button className='bg-slate-900 text-white' onClick={handleSignIn}>
            Sign in with Google
        </button>
        <br /><br />
        <button className='bg-slate-900 text-white' onClick={handleSignIn}>
            Sign Out
        </button>
        
        </>
    );
}

export default GoogleSignIn;