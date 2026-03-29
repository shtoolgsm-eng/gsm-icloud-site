// 🔥 GSM SHTOOL PRO VERSION

const BOT_TOKEN = "PUT_NEW_TOKEN_HERE";
const CHAT_ID = "8025084849";
const WALLET = "bc1p3w4yfuyu52gdv296nqrs72mfaafkr5qu7u3xmamflrmql0sqvsmqvhazr9";

// 🚀 إرسال الطلب + فتح المحفظة
function processOrder() {

    const btn = document.getElementById("pay-btn");
    btn.disabled = true;
    btn.innerText = "جاري إنشاء الطلب...";

    const name = localStorage.getItem("selectedServiceName") || "خدمة";
    const price = localStorage.getItem("selectedPrice") || "0";

    const orderId = "GSM-" + Date.now();
    localStorage.setItem("orderId", orderId);

    const msg = `
🚀 طلب جديد

🆔 ${orderId}
📱 ${name}
💰 ${price}$

💳 BTC:
${WALLET}
`;

    // 🔥 فتح المحفظة فورًا (حل المشكلة الأساسية)
    window.location.href = `bitcoin:${WALLET}?amount=0.0011`;

    // 🔥 إرسال Telegram بالخلفية
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: msg
        })
    }).catch(()=>{});

    setTimeout(()=>{
        btn.innerText = "تم إرسال الطلب ✅";
    },2000);
}

// ✅ تأكيد الدفع
function confirmPayment() {

    const orderId = localStorage.getItem("orderId");

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: `✅ تم الدفع: ${orderId}`
        })
    });

    document.getElementById("status").innerText =
    "تم إرسال التأكيد بنجاح ✅";
}

// 📋 نسخ العنوان
function copyBTC() {
    navigator.clipboard.writeText(WALLET);
    alert("تم النسخ");
}

// 💰 فتح المحفظة
function openWallet() {
    window.location.href = `bitcoin:${WALLET}`;
}
