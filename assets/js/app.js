async function checkIMEI() {
    let imei = document.getElementById('imei_input').value;
    let resultDiv = document.getElementById('check_result');

    if(imei.length < 8) {
        resultDiv.innerHTML = "<span class='text-danger'>Please enter at least 8 digits (TAC).</span>";
        return;
    }

    resultDiv.innerHTML = "<div class='spinner-border spinner-border-sm text-primary'></div> Searching Database...";

    // استدعاء ملف البحث المحلي
    try {
        const response = await fetch(`api/search_device.php?q=${imei.substring(0, 8)}`);
        const data = await response.json();

        if(data.length > 0) {
            let device = data[0]; // نأخذ أول نتيجة مطابقة
            resultDiv.innerHTML = `
                <div class='alert alert-success mt-3'>
                    <strong>✅ Device Identified (Free Check)</strong><br>
                    <b>Brand:</b> ${device.brand}<br>
                    <b>Model:</b> ${device.model}<br>
                    <b>CPU/Chipset:</b> ${device.cpu || 'N/A'}<br>
                    <b>Connection:</b> ${device.connection || 'Standard USB'}
                </div>`;
        } else {
            resultDiv.innerHTML = "<div class='alert alert-warning mt-3'>Device not found in Forensic DB.</div>";
        }
    } catch (error) {
        resultDiv.innerHTML = "<div class='alert alert-danger mt-3'>Connection Error.</div>";
    }
}
