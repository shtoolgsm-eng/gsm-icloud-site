// assets/js/order.js

async function processOrder() {
    const payBtn = document.getElementById('pay-btn');
    
    // بيانات الربط الخاصة بك
    const telegramToken = "8689063454:AAGx1Bmf4E0X3ElFSEVPf-zSoYBiU0geUAc"; 
    const chatId = "ضع_هنا_معرف_حسابك_ChatID"; // احصل عليه من بوت userinfobot
    const btcWallet = "bc1p3w4yfuyu52gdv296nqrs72mfaafkr5qu7u3xmamflrmql0sqvsmqvhazr9"; //

    payBtn.disabled = true;
    payBtn.innerText = "جاري معالجة الطلب...";

    // إنشاء بيانات الطلب
    const orderId = "GSM-" + Math.floor(Math.random() * 900000 + 100000);
    const time = new Date().toLocaleString('ar-EG');

    // نص الرسالة المنسق لتلجرام
    const message = `🚀 *طلب جديد: GSM SHTOOL*\n\n` +
                    `🆔 *رقم الطلب:* \`${orderId}\`\n` +
                    `💰 *المبلغ:* 75$\n` +
                    `⏰ *الوقت:* ${time}\n\n` +
                    `⚠️ العميل بانتظار فتح المحفظة لإتمام التحويل.`;

    try {
        // 1. إرسال الطلب لتلجرام
        const response = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: "Markdown"
            })
        });

        if (response.ok) {
            // 2. توجيه العميل لفتح المحفظة
            window.location.href = `bitcoin:${btcWallet}?amount=0.0011`; 
        } else {
            throw new Error("Telegram API Error");
        }

    } catch (error) {
        console.error("Error:", error);
        alert("حدث خطأ في الاتصال، يرجى مراسلة الدعم الفني مباشرة.");
        payBtn.disabled = false;
        payBtn.innerText = "إتمام الطلب والدفع";
    }
}
