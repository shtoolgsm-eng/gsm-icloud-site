// assets/js/tracking.js
const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('order');

if (orderId) {
    document.getElementById('order-id').innerText = "رقم الطلب: " + orderId;
    // ننتظر قليلاً لضمان اتصال Firebase
    setTimeout(() => { loadOrder(); }, 1000);
}

async function loadOrder() {
    const statusDiv = document.getElementById('status');
    try {
        // استخدام window.db و window.doc المعرفة في firebase-config.js
        const docRef = window.doc(window.db, "orders", orderId);
        const docSnap = await window.getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            let statusText = data.status === "Pending" ? "قيد الانتظار ⏳" : data.status;
            statusDiv.innerText = "الحالة: " + statusText;
            statusDiv.style.color = data.status === "Pending" ? "#ff9f0a" : "#30d158";
        } else {
            statusDiv.innerText = "الطلب غير موجود";
            statusDiv.style.color = "#ff453a";
        }
    } catch (error) {
        console.error(error);
        statusDiv.innerText = "خطأ في جلب البيانات";
    }
}
