import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAAlCD244WiSuBtgsS-SL1kQMPtmn1hZME",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "portfolio-5712a.firebaseapp.com",
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://portfolio-5712a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "portfolio-5712a",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "portfolio-5712a.appspot.com",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "861317495791",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:861317495791:web:62fee8f1237d764e81d41a",
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-G8J14GFQ9G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);