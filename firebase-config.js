// firebase-config.js
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// إعدادات Firebase المحدثة والمؤكدة لمشروعك
const firebaseConfig = {
  apiKey: "AIzaSyDILFJsscE8s2W9iJKiOXBYqzg5Tv1a93E",
  authDomain: "gsm-pro-54d77-e7210.firebaseapp.com",
  databaseURL: "https://gsm-pro-54d77-e7210-default-rtdb.firebaseio.com",
  projectId: "gsm-pro-54d77-e7210",
  storageBucket: "gsm-pro-54d77-e7210.firebasestorage.app",
  messagingSenderId: "386257765697",
  appId: "1:386257765697:web:30cc4397b02fdbe29c8dc0",
  measurementId: "G-HF7NJTF74R"
};

// تهيئة التطبيق ومنع التكرار
let app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// تصدير الكائنات لتعمل مع order.js و tracking.js
window.db = db;
window.collection = collection;
window.addDoc = addDoc;
window.setDoc = setDoc;
window.getDoc = getDoc;
window.doc = doc;
window.serverTimestamp = serverTimestamp;

console.log("%c GSM SHTOOL: Firebase Connected Successfully 💾", "color: #00d2ff; font-weight: bold;");

export { db, collection, addDoc, serverTimestamp };
