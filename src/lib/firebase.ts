import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTO1JkQiNR9iV2yepQIjFunGLBcga1KVQ",
  authDomain: "linkedin-companion.firebaseapp.com",
  projectId: "linkedin-companion",
  storageBucket: "linkedin-companion.firebasestorage.app",
  messagingSenderId: "979478066481",
  appId: "1:979478066481:web:0c9edd54a53b8669e2ec10",
  measurementId: "G-S41D9QWKEP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
