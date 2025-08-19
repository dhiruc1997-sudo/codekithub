// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC97aaA8D7NQyFhtoar8UwQvFAXy0BoV0M",
  authDomain: "codekithub-3e880.firebaseapp.com",
  projectId: "codekithub-3e880",
  storageBucket: "codekithub-3e880.firebasestorage.app",
  messagingSenderId: "744022526348",
  appId: "1:744022526348:web:5a66f93c12bde542c8eea9",
  measurementId: "G-L0D1BCL683"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
