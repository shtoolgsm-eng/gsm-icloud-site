function sendOrder() {
    const name = document.getElementById("name").value;
    const device = document.getElementById("device").value;
    const service = document.getElementById("service").value;

    if(!name || !device){
        alert("❌ Please fill in all details!");
        return;
    }

    const orderId = "GSM-" + Math.floor(Math.random()*90000 + 10000);
    localStorage.setItem("lastOrderId", orderId);
    localStorage.setItem("orderStatus", "Processing");

    alert("✅ Order Placed Successfully!\nYour ID: " + orderId);
    window.location.href = "processing.html";
}
