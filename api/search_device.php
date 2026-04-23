<?php
header('Content-Type: application/json');

// تأكد من مسار الملف الصحيح في الـ GitHub/Server
$db_path = '../database/SupportedDevices.db';

if (isset($_GET['q'])) {
    $search = $_GET['q'];
    
    try {
        $db = new PDO("sqlite:$db_path");
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // الاستعلام من جداول Oxygen Forensic
        $query = "SELECT Manufacturer, Model, MarketingName, CpuType 
                  FROM Devices 
                  WHERE MarketingName LIKE :q 
                  OR Model LIKE :q 
                  LIMIT 15";
        
        $stmt = $db->prepare($query);
        $stmt->execute([':q' => "%$search%"]);
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($results) {
            echo json_encode(["status" => "success", "results" => $results]);
        } else {
            echo json_encode(["status" => "error", "message" => "No matching device found."]);
        }
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => "Database Error"]);
    }
}
