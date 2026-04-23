<?php
header('Content-Type: application/json');

if (isset($_GET['q'])) {
    $imei = preg_replace('/[^0-9]/', '', $_GET['q']);
    $tac = substr($imei, 0, 8);

    $devices = json_decode(file_get_contents('../database/devices.json'), true);
    
    // البحث الذكي
    $foundDevice = null;
    foreach ($devices as $device) {
        if ($device['tac'] == $tac) {
            $foundDevice = $device;
            break;
        }
    }

    if ($foundDevice) {
        // إضافة نصيحة تلقائية بناءً على المعالج
        $hint = "Standard USB connection.";
        if (stripos($foundDevice['cpu'], 'Qualcomm') !== false) {
            $hint = "Use EDL Cable or Test Point for deep flashing.";
        } elseif (stripos($foundDevice['cpu'], 'MTK') !== false || stripos($foundDevice['cpu'], 'MediaTek') !== false) {
            $hint = "Hold Volume buttons for BROM mode.";
        }

        echo json_encode([
            "status" => "success",
            "data" => array_merge($foundDevice, ["tech_hint" => $hint])
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Unknown Device"]);
    }
}
