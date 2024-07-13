// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxPAsdy2ij1PsqsjVjgLBHrflrDLWdMQ0",
  authDomain: "express-cafe-9ef4a.firebaseapp.com",
  projectId: "express-cafe-9ef4a",
  storageBucket: "express-cafe-9ef4a.appspot.com",
  messagingSenderId: "692136952148",
  appId: "1:692136952148:web:fedb1202a7322aec0688c1",
  measurementId: "G-3HRZ8VVHT1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth };