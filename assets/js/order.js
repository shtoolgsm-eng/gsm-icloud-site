/**
 * GSM SHTOOL PRO - النسخة النهائية المدمجة
 * تطوير: المهندس شمسان شعبان
 */

// إعدادات الربط الثابتة
const BOT_TOKEN = "8689063454:AAGx1Bmf4E0X3ElFSEVPf-zSoYBiU0geUAc";
const CHAT_ID = "8025084849";
const WALLET_ADDR = "bc1p3w4yfuyu52gdv296nqrs72mfaafkr5qu7u3xmamflrmql0sqvsmqvhazr9";

// 🚀 وظيفة إرسال الطلب + فتح المحفظة (تستدعى عند الضغط على إتمام الطلب)
async function processOrder() {
    const btn = document.getElementById('pay-btn');
    if (!btn) return;

    // جلب البيانات من التخزين المحلي
    const sName = localStorage.getItem('selectedServiceName') || "خدمة غير محددة";
    const sPrice = localStorage.getItem('selectedPrice') || "0";
    const orderId = "GSM-" + Date.now().toString().slice(-6); // رقم طلب مميز
    localStorage.setItem("currentOrderId", orderId);

    // 1. تحديث شكل الزر
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري فتح المحفظة...';

    // 2. تجهيز رسالة التلجرام
    const msg = `🚀 *طلب جديد: GSM SHTOOL*\n\n` +
                `🆔 *رقم الطلب:* \`${orderId}\`\n` +
                `🛠 *الخدمة:* ${sName}\n` +
                `💰 *السعر:* ${sPrice}$\n` +
                `⚠️ العميل يقوم بفتح المحفظة الآن.`;

    // 3. فتح المحفظة فوراً (لضمان السرعة وعدم التعليق)
    window.location.href = `bitcoin:${WALLET_ADDR}?amount=0.0011`;

    // 4. إرسال الإشعار للتلجرام في الخلفية
    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                chat_id: CHAT_ID, 
                text: msg, 
                parse_mode: "Markdown" 
            })
        });
    } catch (error) {
        console.log("Telegram silent error:", error);
    }

    // تحديث الزر بعد ثانيتين
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check-circle"></i> تم توجيهك للمحفظة';
    }, 2000);
}

// ✅ وظيفة تأكيد الدفع (تستدعى عند الضغط على زر "تم الدفع")
async function confirmPayment() {
    const orderId = localStorage.getItem("currentOrderId") || "Unknown";
    const statusLabel = document.getElementById("status");

    const confirmMsg = `✅ *تأكيد دفع جديد*\n\n` +
                       `🆔 *الطلب:* \`${orderId}\`\n` +
                       `👤 العميل يؤكد أنه قام بالتحويل.`;

    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                chat_id: CHAT_ID, 
                text: confirmMsg, 
                parse_mode: "Markdown" 
            })
        });
        if (statusLabel) {
            statusLabel.innerText = "تم إرسال تأكيدك للفني بنجاح ✅";
            statusLabel.style.color = "#22c55e";
        }
        alert("تم إرسال التأكيد بنجاح، سيتم تفعيل الخدمة بعد التحقق.");
    } catch (e) {
        alert("حدث خطأ في الإرسال، تواصل مع الدعم الفني.");
    }
}

// 📋 وظيفة نسخ عنوان المحفظة
function copyBTC() {
    navigator.clipboard.writeText(WALLET_ADDR).then(() => {
        alert("✅ تم نسخ عنوان المحفظة بنجاح");
    });
}

// 💰 وظيفة فتح المحفظة يدوياً
function openWallet() {
    window.location.href = `bitcoin:${WALLET_ADDR}`;
}

// جعل الوظائف متاحة عالمياً للمتصفح
window.processOrder = processOrder;
window.confirmPayment = confirmPayment;
window.copyBTC = copyBTC;
window.openWallet = openWallet;

console.log("GSM SHTOOL PRO VERSION LOADED ✅");
