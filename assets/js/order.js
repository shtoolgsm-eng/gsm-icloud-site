// 🔥 نسخة احترافية محسنة 100%

async function processOrder() {
    const btn = document.getElementById('pay-btn');

    const token = "YOUR_BOT_TOKEN";
    const chatId = "8025084849";
    const wallet = "bc1p3w4yfuyu52gdv296nqrs72mfaafkr5qu7u3xmamflrmql0sqvsmqvhazr9";

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري إنشاء الطلب...';

    const selectedPrice = localStorage.getItem('selectedPrice') || "75";
    const selectedService = localStorage.getItem('selectedServiceName') || "خدمة غير محددة";

    const orderId = "GSM-" + Date.now();

    // 💬 رسالة احترافية
    const msg = `🚀 طلب جديد

🆔 ${orderId}
🛠 ${selectedService}
💰 ${selectedPrice}$

💳 BTC:
${wallet}

⚠️ العميل فتح صفحة الدفع الآن`;

    // 🔥 1. فتح المحفظة فورًا (بدون انتظار)
    window.location.href = `bitcoin:${wallet}?amount=0.0011`;

    // 🔥 2. إرسال Telegram بالخلفية
    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ 
            chat_id: chatId, 
            text: msg
        })
    }).catch(() => {});

    // 🔥 3. تحديث الزر
    setTimeout(() => {
        btn.innerHTML = "تم إرسال الطلب وفتح المحفظة ✅";
    }, 2000);
}

window.processOrder = processOrder;
