<?php
include 'config.php';
$status = "";
if(isset($_POST['track'])) {
    $imei = mysqli_real_escape_string($conn, $_POST['imei']);
    $query = mysqli_query($conn, "SELECT status FROM orders WHERE imei = '$imei' LIMIT 1");
    if(mysqli_num_rows($query) > 0) {
        $row = mysqli_fetch_assoc($query);
        $status = "Your Order Status: <b style='color:#00ff88'>".strtoupper($row['status'])."</b>";
    } else {
        $status = "No order found for this IMEI.";
    }
}
?>
