<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$database = "pos";

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $category = $_POST['category'];
    if (!empty($category)) {
        $sql = "INSERT INTO stock (category, name, price, image) VALUES ('$category', '', 0, '')";
        if ($conn->query($sql) === TRUE) {
            echo "Category added successfully!";
        } else {
            echo "Error: " . $conn->error;
        }
    } else {
        echo "Category name cannot be empty!";
    }
}

$conn->close();
?>
