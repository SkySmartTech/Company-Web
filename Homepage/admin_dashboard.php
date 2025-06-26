<?php
session_start();
if (!isset($_SESSION['admin'])) die("Access denied");

$conn = new mysqli("localhost", "root", "", "your_db");
$result = $conn->query("SELECT * FROM careers_applications");

echo "<table border='1'><tr><th>Name</th><th>Email</th><th>Phone</th><th>CV</th></tr>";
while ($row = $result->fetch_assoc()) {
    echo "<tr>
        <td>{$row['full_name']}</td>
        <td>{$row['email']}</td>
        <td>{$row['phone']}</td>
        <td><a href='{$row['cv_file']}' target='_blank'>View CV</a></td>
    </tr>";
}
echo "</table>";
?>
