// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArW4hSV6sXT44OPjGY40vi-C8nP-DLMa0",
  authDomain: "your-personal-media.firebaseapp.com",
  projectId: "your-personal-media",
  storageBucket: "your-personal-media.firebasestorage.app",
  messagingSenderId: "677434450849",
  appId: "1:677434450849:web:5ff8973e34c123fef6e1e0",
  measurementId: "G-2M4WE2N144"
};

const app = initializeApp(firebaseConfig);

// Export singletons
export const auth = getAuth(app);
export const db = getFirestore(app);