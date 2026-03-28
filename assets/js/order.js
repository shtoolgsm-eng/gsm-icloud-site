// js/order.js
async function processOrder() {
    const payBtn = document.getElementById('pay-btn');
    payBtn.disabled = true;
    payBtn.innerText = "جاري إنشاء الطلب...";

    const orderId = "GSM-" + Math.floor(Math.random() * 900000 + 100000);
    
    try {
        // استخدام الدوال المصدرة من نافذة window
        await window.setDoc(window.doc(window.db, "orders", orderId), {
            order_id: orderId,
            amount: 75,
            currency: "USDT",
            status: "Pending",
            timestamp: window.serverTimestamp()
        });

        alert("تم إنشاء الطلب بنجاح: " + orderId);
        window.location.href = "tracking.html?order=" + orderId;

    } catch (error) {
        console.error("Error creating order:", error);
        alert("خطأ في الاتصال بقاعدة البيانات");
        payBtn.disabled = false;
        payBtn.innerText = "فتح المحفظة الآن";
    }
}
// جعل الدالة متاحة للزر في HTML
window.processOrder = processOrder;
