<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$database = "pos";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$category = isset($_GET['category']) ? $_GET['category'] : '';

$sql = "SELECT * FROM stock";
if (!empty($category)) {
    $sql .= " WHERE category = '$category'";
}

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<div class='item-card'>
                <img src='" . $row['image'] . "' alt='" . $row['name'] . "'>
                <h3>" . $row['name'] . "</h3>
                <p>Price: $" . $row['price'] . "</p>
              </div>";
    }
}

$conn->close();
?>
