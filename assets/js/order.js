// assets/js/order.js - النسخة المدمجة والمطورة
async function processOrder() {
    const btn = document.getElementById('pay-btn');
    
    // --- بيانات الربط (تأكد من وضع رقم Chat ID الصحيح هنا) ---
    const token = "8689063454:AAGx1Bmf4E0X3ElFSEVPf-zSoYBiU0geUAc";
    const chatId = "ضع_رقم_الـ_ID_الجديد_هنا"; // استبدل هذا النص بالرقم الذي حصلت عليه من البوت
    const wallet = "bc1p3w4yfuyu52gdv296nqrs72mfaafkr5qu7u3xmamflrmql0sqvsmqvhazr9";
    // -------------------------------------------------------

    // تغيير حالة الزر لمنع الضغط المتكرر وإعطاء مظهر احترافي
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري تأمين الاتصال...';

    // إنشاء رقم طلب عشوائي وتجهيز الرسالة
    const orderId = "GSM-" + Math.floor(Math.random() * 900000 + 100000);
    const msg = `🚀 *طلب جديد: GSM SHTOOL*\n\n🆔 رقم الطلب: \`${orderId}\`\n💰 المبلغ: 75$\n⚠️ العميل بانتظار تحويل البيتكوين.`;

    // دالة فتح محفظة البيتكوين للعميل
    const openWallet = () => {
        window.location.href = `bitcoin:${wallet}?amount=0.0011`;
        // تغيير نص الزر بعد التوجيه
        setTimeout(() => {
            btn.innerText = "تم توجيهك للمحفظة بنجاح";
        }, 3000);
    };

    try {
        // إنشاء مؤقت زمني (5 ثوانٍ): إذا فشل التلجرام في الرد، ننتقل للدفع مباشرة
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); 

        const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                chat_id: chatId, 
                text: msg, 
                parse_mode: "Markdown" 
            }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);
        openWallet(); // نجح الإرسال أو انتهى الوقت -> افتح المحفظة

    } catch (e) {
        // في حال وجود خطأ في الإنترنت أو معرف Chat ID خاطئ، لا نجعل الزبون ينتظر
        console.log("إشعار تلجرام لم يكتمل، يتم التحويل للمحفظة الآن.");
        openWallet(); 
    }
}
