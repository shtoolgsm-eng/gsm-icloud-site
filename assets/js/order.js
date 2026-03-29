async function processOrder() {
    const btn = document.getElementById('pay-btn');
    const token = "8689063454:AAGx1Bmf4E0X3ElFSEVPf-zSoYBiU0geUAc";
    const chatId = "ضع_هنا_معرف_حسابك_ChatID"; // احصل عليه من بوت userinfobot
    const wallet = "bc1p3w4yfuyu52gdv296nqrs72mfaafkr5qu7u3xmamflrmql0sqvsmqvhazr9";

    btn.disabled = true;
    btn.innerText = "جاري إرسال الطلب وتأمين الاتصال...";

    const orderId = "GSM-" + Math.floor(Math.random() * 900000 + 100000);
    const message = `🚀 *طلب جديد: GSM SHTOOL*\n🆔 رقم الطلب: \`${orderId}\`\n💰 المبلغ: 75$\n⚠️ العميل بانتظار التحويل.`;

    try {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({chat_id: chatId, text: message, parse_mode: "Markdown"})
        });
        window.location.href = `bitcoin:${wallet}?amount=0.0011`;
    } catch (e) {
        alert("خطأ في الاتصال بالسيرفر. يرجى المحاولة لاحقاً.");
        btn.disabled = false;
        btn.innerText = "إعادة المحاولة";
    }
}
