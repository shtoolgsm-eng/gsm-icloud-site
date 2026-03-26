// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyDILFJsscE8s2W9iJKiOXBYqzg5Tv1a93E",
  authDomain: "gsm-pro-54d77-e7210.firebaseapp.com",
  projectId: "gsm-pro-54d77-e7210",
  storageBucket: "gsm-pro-54d77-e7210.firebasestorage.app",
  messagingSenderId: "386257765697",
  appId: "1:386257765697:web:30cc4397b02fdbe29c8dc0",
  measurementId: "G-HF7NJTF74R"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// تصدير الكائنات لتكون متاحة عالمياً في المتصفح
window.auth = auth;
window.db = db;
window.analytics = analytics;

console.log("Firebase Initialized Successfully!");
