/**
 * GSM SHTOOL PRO - Integrated Final Version
 * Features: Order System, AI Lab (DeepSeek/NanoBanana), & Payment Proof Upload
 * Developed by: Engineer Shamsan Shaaban
 */

// 1. Connection Settings
const BOT_TOKEN = "8689063454:AAGx1Bmf4E0X3ElFSEVPf-zSoYBiU0geUAc";
const CHAT_ID = "-1003811162767"; // Group ID with negative prefix for successful connection
const WALLET_ADDR = "bc1p3w4yfuyu52gdv296nqrs72mfaafkr5qu7u3xmamflrmql0sqvsmqvhazr9";

// --- Section 1: AI Laboratory Functions ---

// Send technical AI inquiries
async function askAI() {
    const queryInput = document.getElementById('ai-query');
    const query = queryInput?.value;
    
    if(!query) return alert("Please describe the technical issue first.");

    const msg = `🤖 *AI Technical Inquiry (DeepSeek)*\n\n` +
                `🆔 *ID:* \`${localStorage.getItem('currentOrderId') || 'New Client'}\`\n` +
                `❓ *Question:* ${query}\n\n` +
                `⚠️ Please respond to the client via the group immediately.`;
    
    const sent = await sendToTelegram(msg);
    if(sent) {
        alert("Your inquiry has been sent to Engineer Shamsan Shaaban. You will receive a response shortly.");
        queryInput.value = "";
    }
}

// Request logo design
async function generateLogo() {
    const promptInput = document.getElementById('img-prompt');
    const prompt = promptInput?.value;
    
    if(!prompt) return alert("Please describe the logo design you need.");

    const msg = `🎨 *Logo Design Request (NanoBanana)*\n\n` +
                `📝 *Description:* ${prompt}\n\n` +
                `⚠️ Please generate the image and send it to the client.`;
    
    const sent = await sendToTelegram(msg);
    if(sent) {
        alert("Design request received. Processing via NanoBanana algorithms...");
        promptInput.value = "";
    }
}

// --- Section 2: Order & Payment System ---

// Process order and trigger wallet
async function processOrder() {
    const btn = document.getElementById('pay-btn');
    if (!btn) return;

    const sName = localStorage.getItem('selectedServiceName') || "Undefined Service";
    const sPrice = localStorage.getItem('selectedPrice') || "0";
    const orderId = "GSM-" + Date.now().toString().slice(-6);
    localStorage.setItem("currentOrderId", orderId);

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening Wallet...';

    const msg = `🚀 *New Order: GSM SHTOOL*\n\n` +
                `🆔 *Order ID:* \`${orderId}\`\n` +
                `🛠 *Service:* ${sName}\n` +
                `💰 *Price:* ${sPrice}$\n` +
                `⚠️ Client is opening the wallet for payment.`;

    // Redirect to Bitcoin wallet
    window.location.href = `bitcoin:${WALLET_ADDR}?amount=0.0011`;

    await sendToTelegram(msg);

    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check-circle"></i> Redirected to Wallet';
    }, 2000);
}

// Manual payment confirmation text
async function confirmPayment() {
    const orderId = localStorage.getItem("currentOrderId") || "Unknown";
    const statusLabel = document.getElementById("status");

    const confirmMsg = `✅ *Payment Confirmation*\n\n` +
                       `🆔 *Order ID:* \`${orderId}\`\n` +
                       `👤 Client claims the transfer is completed.`;

    const sent = await sendToTelegram(confirmMsg);
    if (sent) {
        if (statusLabel) {
            statusLabel.innerText = "Confirmation sent successfully! ✅";
            statusLabel.style.color = "#22c55e";
        }
        alert("Confirmation sent. Service will be activated after verification.");
    }
}

// Upload payment proof image
async function sendPaymentScreenshot() {
    const fileInput = document.getElementById('payment-screenshot');
    const file = fileInput?.files[0];
    const orderId = localStorage.getItem("currentOrderId") || "Unknown";

    if (!file) return alert("Please select the invoice image first.");

    const btn = document.querySelector('.btn-upload');
    if(btn) btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';

    const formData = new FormData();
    formData.append('chat_id', CHAT_ID);
    formData.append('photo', file);
    formData.append('caption', `📸 *New Payment Proof*\n\n🆔 *Order ID:* \`${orderId}\`\n👤 Client uploaded a payment screenshot.`);
    formData.append('parse_mode', 'Markdown');

    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert("Payment proof uploaded successfully! ✅");
            if(btn) btn.innerHTML = 'Uploaded Successfully';
        } else {
            alert("Upload failed. Check image size or connection.");
        }
    } catch (e) {
        console.error("Upload Error:", e);
        alert("An error occurred while connecting to the server.");
    }
}

// --- Section 3: Helper Utilities ---

// Generic Telegram message sender
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

function copyBTC() {
    navigator.clipboard.writeText(WALLET_ADDR).then(() => alert("✅ Address Copied"));
}

function openWallet() {
    window.location.href = `bitcoin:${WALLET_ADDR}`;
}

// Export functions to Global Scope
window.askAI = askAI;
window.generateLogo = generateLogo;
window.processOrder = processOrder;
window.confirmPayment = confirmPayment;
window.sendPaymentScreenshot = sendPaymentScreenshot;
window.copyBTC = copyBTC;
window.openWallet = openWallet;

console.log("GSM SHTOOL PRO - ENGLISH VERSION LOADED ✅");
