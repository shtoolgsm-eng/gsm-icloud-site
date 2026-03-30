/**
 * GSM SHTOOL PRO - النسخة الشاملة والمدمجة
 * يشمل: نظام الطلبات + مختبر الذكاء الاصطناعي + الربط مع التلجرام
 * تطوير: المهندس شمسان شعبان
 */

// 1. إعدادات الربط الثابتة (تأكد من صحة البيانات)
const BOT_TOKEN = "8689063454:AAGx1Bmf4E0X3ElFSEVPf-zSoYBiU0geUAc";
const CHAT_ID = "8025084849";
const WALLET_ADDR = "bc1p3w4yfuyu52gdv296nqrs72mfaafkr5qu7u3xmamflrmql0sqvsmqvhazr9";

// --- القسم الأول: وظائف مختبر الذكاء الاصطناعي (DeepSeek & NanoBanana) ---

// وظيفة إرسال استشارات الذكاء الاصطناعي
async function askAI() {
    const queryInput = document.getElementById('ai-query');
    const query = queryInput?.value;
    
    if(!query) return alert("فضلاً، صف المشكلة التقنية أولاً");

    const msg = `🤖 *استشارة تقنية (DeepSeek)*\n\n` +
                `🆔 *رقم الهوية:* \`${localStorage.getItem('currentOrderId') || 'عميل جديد'}\`\n` +
                `❓ *السؤال:* ${query}\n\n` +
                `⚠️ يرجى الرد على العميل عبر البوت فوراً.`;
    
    const sent = await sendToTelegram(msg);
    if(sent) {
        alert("تم إرسال استفسارك للمهندس شمسان شعبان، سيتم الرد عليك عبر البوت فوراً.");
        queryInput.value = "";
    }
}

// وظيفة طلب تصميم شعار (NanoBanana)
async function generateLogo() {
    const promptInput = document.getElementById('img-prompt');
    const prompt = promptInput?.value;
    
    if(!prompt) return alert("يرجى وصف الشعار المطلوب تصميمه");

    const msg = `🎨 *طلب تصميم شعار (NanoBanana)*\n\n` +
                `📝 *الوصف:* ${prompt}\n\n` +
                `⚠️ يرجى توليد الصورة وإرسالها للعميل عبر التلجرام.`;
    
    const sent = await sendToTelegram(msg);
    if(sent) {
        alert("تم استلام طلب التصميم بنجاح، جارٍ المعالجة بواسطة خوارزميات NanoBanana...");
        promptInput.value = "";
    }
}

// --- القسم الثاني: وظائف نظام الطلبات والدفع (Bitcoin) ---

// وظيفة معالجة الطلب وفتح المحفظة
async function processOrder() {
    const btn = document.getElementById('pay-btn');
    if (!btn) return;

    const sName = localStorage.getItem('selectedServiceName') || "خدمة غير محددة";
    const sPrice = localStorage.getItem('selectedPrice') || "0";
    const orderId = "GSM-" + Date.now().toString().slice(-6);
    localStorage.setItem("currentOrderId", orderId);

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري فتح المحفظة...';

    const msg = `🚀 *طلب جديد: GSM SHTOOL*\n\n` +
                `🆔 *رقم الطلب:* \`${orderId}\`\n` +
                `🛠 *الخدمة:* ${sName}\n` +
                `💰 *السعر:* ${sPrice}$\n` +
                `⚠️ العميل يقوم بفتح المحفظة الآن لإتمام الدفع.`;

    // توجيه العميل لمحفظة البيتكوين
    window.location.href = `bitcoin:${WALLET_ADDR}?amount=0.0011`;

    // إرسال الإشعار
    await sendToTelegram(msg);

    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check-circle"></i> تم توجيهك للمحفظة';
    }, 2000);
}

// وظيفة تأكيد الدفع يدوياً
async function confirmPayment() {
    const orderId = localStorage.getItem("currentOrderId") || "Unknown";
    const statusLabel = document.getElementById("status");

    const confirmMsg = `✅ *تأكيد دفع جديد*\n\n` +
                       `🆔 *رقم الطلب:* \`${orderId}\`\n` +
                       `👤 العميل يؤكد أنه قام بالتحويل البنكي/الرقمي.`;

    const sent = await sendToTelegram(confirmMsg);
    if (sent) {
        if (statusLabel) {
            statusLabel.innerText = "تم إرسال تأكيدك للفني بنجاح ✅";
            statusLabel.style.color = "#22c55e";
        }
        alert("تم إرسال التأكيد بنجاح، سيتم تفعيل الخدمة بعد التحقق من الشبكة.");
    } else {
        alert("حدث خطأ في الإرسال، يرجى المحاولة لاحقاً أو التواصل مع الدعم.");
    }
}

// --- القسم الثالث: الأدوات المساعدة (Utilities) ---

// دالة الإرسال الموحدة للتلجرام (Async/Await لضمان الدقة)
async function sendToTelegram(text) {
    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                chat_id: CHAT_ID, 
                text: text, 
                parse_mode: "Markdown" 
            })
        });
        return response.ok;
    } catch (e) {
        console.error("Telegram API Error:", e);
        return false;
    }
}

// نسخ عنوان المحفظة
function copyBTC() {
    navigator.clipboard.writeText(WALLET_ADDR).then(() => {
        alert("✅ تم نسخ عنوان المحفظة بنجاح");
    });
}

// فتح المحفظة يدوياً
function openWallet() {
    window.location.href = `bitcoin:${WALLET_ADDR}`;
}

// تصدير الوظائف للمتصفح (Global Scope)
window.askAI = askAI;
window.generateLogo = generateLogo;
window.processOrder = processOrder;
window.confirmPayment = confirmPayment;
window.copyBTC = copyBTC;
window.openWallet = openWallet;

console.log("GSM SHTOOL PRO - FULLY INTEGRATED & READY ✅");
