// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBc0FCTA1Em_ZJKc1WXluWpAxIKX6XJWwg",
    authDomain: "appointment-scheduling-s-7a2bf.firebaseapp.com",
    projectId: "appointment-scheduling-s-7a2bf",
    storageBucket: "appointment-scheduling-s-7a2bf.firebasestorage.app",
    messagingSenderId: "243776656337",
    appId: "1:243776656337:web:70f96d5ea61e75992446f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
