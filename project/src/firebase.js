// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {GoogleAuthProvider, getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuDxMPx380AxqyYumwS9hxVws44bAjGO8",
  authDomain: "diaspire-b7e49.firebaseapp.com",
  projectId: "diaspire-b7e49",
  storageBucket: "diaspire-b7e49.firebasestorage.app",
  messagingSenderId: "441180079702",
  appId: "1:441180079702:web:854304b84e96c5b63d5df7",
  measurementId: "G-G93NZ0N75E"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);