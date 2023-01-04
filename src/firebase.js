import { initializeApp } from "firebase/app";
import 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKTXKIAmF_z9b5Tso-gNMGXl6wPCZ65xQ",
  authDomain: "fb-crud-react-p.firebaseapp.com",
  projectId: "fb-crud-react-p",
  storageBucket: "fb-crud-react-p.appspot.com",
  messagingSenderId: "3731560647",
  appId: "1:3731560647:web:6fd2d314e9d9f6879cc6e2"
};

// Initialize Firebase
const fb = initializeApp(firebaseConfig);
const db = fb.firestore;