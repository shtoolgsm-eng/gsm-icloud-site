// assets/js/order.js

async function processOrder() {
    const payBtn = document.getElementById('pay-btn');
    
    // بياناتك المؤكدة
    const telegramToken = "8689063454:AAGx1Bmf4E0X3ElFSEVPf-zSoYBiU0geUAc"; //
    const chatId = "ضع_هنا_الرقم_الذي_حصلت_عليه_من_userinfobot"; 
    const btcWallet = "bc1p3w4yfuyu52gdv296nqrs72mfaafkr5qu7u3xmamflrmql0sqvsmqvhazr9"; //

    payBtn.disabled = true;
    payBtn.innerText = "جاري إرسال الطلب...";

    const orderId = "GSM-" + Math.floor(Math.random() * 900000 + 100000); //
    const message = `🚀 *طلب جديد: GSM SHTOOL*\n\n🆔 رقم الطلب: ${orderId}\n💰 المبلغ: 75$\n📍 المحفظة: BTC Taproot\n⏰ الوقت: ${new Date().toLocaleString('ar-EG')}`;

    try {
        // 1. إرسال الإشعار لتلجرام
        await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: "Markdown"
            })
        });

        // 2. توجيه العميل لفتح محفظة البيتكوين مباشرة
        window.location.href = `bitcoin:${btcWallet}?amount=0.0011`; // القيمة تقريبية لـ 75$

    } catch (error) {
        console.error("Error:", error);
        alert("فشل في معالجة الطلب، تأكد من الاتصال.");
        payBtn.disabled = false;
        payBtn.innerText = "إتمام الطلب والدفع";
    }
}

window.processOrder = processOrder;
        alert("فشل إرسال الطلب، تأكد من الاتصال.");
        payBtn.disabled = false;
        payBtn.innerText = "شراء الخدمة";
    }
}
window.processOrder = processOrder;
