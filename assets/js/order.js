// assets/js/order.js - النسخة النهائية المدمجة والمربوطة بحسابك
async function processOrder() {
    const btn = document.getElementById('pay-btn');
    
    // --- بيانات الربط المحدثة بنجاح ---
    const token = "8689063454:AAGx1Bmf4E0X3ElFSEVPf-zSoYBiU0geUAc";
    const chatId = "8025084849"; // تم ربط معرف الحساب الخاص بك هنا
    const wallet = "bc1p3w4yfuyu52gdv296nqrs72mfaafkr5qu7u3xmamflrmql0sqvsmqvhazr9";
    // -------------------------------------------------------

    // تغيير حالة الزر لمنع التكرار وإظهار عملية التحميل
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري تأمين الاتصال...';

    // جلب البيانات التي اختارها العميل من الصفحة السابقة (الموديل والسعر)
    const selectedPrice = localStorage.getItem('selectedPrice') || "75";
    const selectedService = localStorage.getItem('selectedServiceName') || "خدمة غير محددة";
    const orderId = "GSM-" + Math.floor(Math.random() * 900000 + 100000);

    // صياغة الرسالة الاحترافية التي ستصلك على تلجرام
    const msg = `🚀 *طلب جديد: GSM SHTOOL*\n\n` +
                `🛠 *الخدمة:* ${selectedService}\n` +
                `🆔 *رقم الطلب:* \`${orderId}\`\n` +
                `💰 *المبلغ:* ${selectedPrice}$\n` +
                `⚠️ العميل ينتظر التوجيه للمحفظة الآن.`;

    // دالة فتح المحفظة للعميل
    const openWallet = () => {
        // توجيه العميل لمحفظة البيتكوين
        window.location.href = `bitcoin:${wallet}?amount=0.0011`;
        
        setTimeout(() => {
            btn.innerText = "تم توجيهك للمحفظة بنجاح";
        }, 3000);
    };

    try {
        // إعداد مؤقت زمني لضمان عدم تعليق الزر (5 ثوانٍ)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); 

        // إرسال الإشعار إلى حسابك في تلجرام
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
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
        openWallet(); // التحويل للدفع

    } catch (e) {
        console.log("إشعار تلجرام لم يكتمل، يتم التحويل للمحفظة لضمان عدم ضياع العميل.");
        openWallet(); 
    }
}
window.processOrder = processOrder;
