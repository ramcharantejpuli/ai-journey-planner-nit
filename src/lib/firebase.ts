// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwWLB3D4QHIUZ1jQvrk61E66ke0zLkkpE",
  authDomain: "upgrad-fuck.firebaseapp.com",
  projectId: "upgrad-fuck",
  storageBucket: "upgrad-fuck.firebasestorage.app",
  messagingSenderId: "47420731955",
  appId: "1:47420731955:web:dd599491551897685a2946",
  measurementId: "G-3T6JMXWQ2V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let analytics = null;

// Initialize analytics only in browser environment
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, db, analytics };
