<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if (isset($_GET['q'])) {
    $search = $_GET['q'];
    $tac = substr($search, 0, 8); // قص أول 8 أرقام من الـ IMEI

    $json_data = file_get_contents('../database/devices.json');
    $devices = json_decode($json_data, true);

    $found = false;
    foreach ($devices as $device) {
        if ($device['tac'] == $tac) {
            echo json_encode(["status" => "success", "data" => $device]);
            $found = true;
            break;
        }
    }

    if (!$found) {
        echo json_encode(["status" => "error", "message" => "Device not found in local database."]);
    }
}
?>
