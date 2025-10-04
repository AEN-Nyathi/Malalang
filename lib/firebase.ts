import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqkzwgP4IpzDZ8g6K3jr1jXozP60efiLg",
  authDomain: "rise-and-shine-shop.firebaseapp.com",
  projectId: "rise-and-shine-shop",
  storageBucket: "rise-and-shine-shop.firebasestorage.app",
  messagingSenderId: "1000695658741",
  appId: "1:1000695658741:web:aaa173d3ce97f3a70a6dbc",
  measurementId: "G-2JJGQFTT4K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
