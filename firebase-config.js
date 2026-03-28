// firebase-config.js
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// إعدادات Firebase المحدثة لمشروع gsm-pro-54d77-e7210
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

// منع التهيئة المتكررة لضمان استقرار الموقع
let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps()[0];
}

const db = getFirestore(app);

// تصدير الكائنات لضمان عمل ملفات JS الأخرى (مثل order.js و tracking.js)
window.db = db;
window.collection = collection;
window.addDoc = addDoc;
window.serverTimestamp = serverTimestamp;

console.log("%c GSM SHTOOL: Firebase db Ready 💾", "color: #00d2ff; font-weight: bold;");

export { db, collection, addDoc, serverTimestamp };
