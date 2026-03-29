async function processOrder() {
    const payBtn = document.getElementById('pay-btn');
    
    // بيانات تلجرام الخاصة بك
    const telegramToken = "8689063454:AAGx1Bmf4E0X3ElFSEVPf-zSoYBiU0geUAc"; //
    const chatId = "ضع_هنا_ChatID_الخاص_بك"; // احصل عليه من @userinfobot

    payBtn.disabled = true;
    payBtn.innerText = "جاري إرسال الطلب...";

    const orderId = "GSM-" + Math.floor(Math.random() * 900000 + 100000); //
    const amount = "75 USDT"; //

    // صياغة الرسالة
    const message = `🚀 طلب جديد من موقع GSM\n\n🆔 رقم الطلب: ${orderId}\n💰 المبلغ: ${amount}\n⏰ الوقت: ${new Date().toLocaleString('ar-EG')}`;

    try {
        // إرسال البيانات لتلجرام
        const response = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message
            })
        });

        if (response.ok) {
            // توجيه العميل لمحفظتك (استبدل العنوان بعنوان محفظتك الحقيقي)
            window.location.href = "https://link.trustwallet.com/send?asset=c60&address=عنـوان_محفظتـك_هنـا&amount=75";
        } else {
            throw new Error("خطأ في الإرسال");
        }

    } catch (error) {
        console.error("Error:", error);
        alert("فشل إرسال الطلب، تأكد من الاتصال.");
        payBtn.disabled = false;
        payBtn.innerText = "شراء الخدمة";
    }
}
window.processOrder = processOrder;
