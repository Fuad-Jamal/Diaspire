// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuDxMPx380AxqyYumwS9hxVws44bAjGO8",
  authDomain: "diaspire-b7e49.firebaseapp.com",
  projectId: "diaspire-b7e49",
  storageBucket: "diaspire-b7e49.firebasestorage.app",
  messagingSenderId: "441180079702",
  appId: "1:441180079702:web:854304b84e96c5b63d5df7",
  measurementId: "G-G93NZ0N75E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);