import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-GPhfLraEjGf75y9KkGAC5O84ASnJV0Q",
  authDomain: "next-auth-eff79.firebaseapp.com",
  projectId: "next-auth-eff79",
  storageBucket: "next-auth-eff79.appspot.com",
  messagingSenderId: "524702195587",
  appId: "1:524702195587:web:4b361ae6b3c2be3a5920b6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
