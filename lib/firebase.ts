import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwnIgc_YxlFLuOy1uzKEycOwCFPN-_Yw4",
  authDomain: "malalang-4f179.firebaseapp.com",
  projectId: "malalang-4f179",
  storageBucket: "malalang-4f179.firebasestorage.app",
  messagingSenderId: "672928403718",
  appId: "1:672928403718:web:7eee4dd5c82c43c8ad8e87",
  measurementId: "G-F1BXNGHY4X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
