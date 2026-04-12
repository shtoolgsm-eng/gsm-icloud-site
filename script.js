function sendOrder() {
    const name = document.getElementById("name").value;
    const device = document.getElementById("device").value;
    const service = document.getElementById("service").value;

    if (!name || !device) {
        alert("❌ Please fill in all details!");
        return;
    }

    const orderId = "GSM-" + Math.floor(Math.random() * 90000 + 10000);
    const orderData = { id: orderId, device: device, service: service, status: "Processing 🔄" };

    localStorage.setItem("lastOrder", JSON.stringify(orderData));
    alert("✅ Order Submitted! ID: " + orderId);
    window.location.href = "processing.html";
}

function trackOrder() {
    const searchId = document.getElementById("orderInput").value;
    const statusResult = document.getElementById("statusResult");
    const stored = JSON.parse(localStorage.getItem("lastOrder"));

    if (stored && searchId === stored.id) {
        statusResult.innerHTML = `<div style="margin-top:20px; color:#00ff88;">Status: ${stored.status}<br>Device: ${stored.device}</div>`;
    } else {
        statusResult.innerHTML = `<div style="margin-top:20px; color:red;">Order Not Found!</div>`;
    }
}
