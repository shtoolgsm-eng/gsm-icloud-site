const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('order');

document.getElementById('order-id').innerText = "رقم الطلب: " + orderId;

async function loadOrder() {
    const doc = await db.collection("orders").doc(orderId).get();

    if (doc.exists) {
        const data = doc.data();
        document.getElementById('status').innerText = "الحالة: " + data.status;
    } else {
        document.getElementById('status').innerText = "الطلب غير موجود";
    }
}

loadOrder();
