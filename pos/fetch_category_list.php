<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$database = "pos";

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT DISTINCT category FROM stock WHERE category != ''";
$result = $conn->query($sql);

$options = "<option value=''>Select Category</option>";
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $options .= "<option value='" . $row['category'] . "'>" . $row['category'] . "</option>";
    }
}

echo $options;
$conn->close();
?>
