import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArTG0rkl7Xp6vg9CuChdeaeD6O4bmFDQk",
  authDomain: "chat-e2909.firebaseapp.com",
  projectId: "chat-e2909",
  storageBucket: "chat-e2909.appspot.com",
  messagingSenderId: "705460504704",
  appId: "1:705460504704:web:281424eaac1315c932be65",
  measurementId: "G-MSBGLQ6CEZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();