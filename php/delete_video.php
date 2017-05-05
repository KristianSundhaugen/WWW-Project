<?php
require_once 'db_class.php';
session_start();
$id = $_SESSION['bid'];
$vid = $_POST['id'];
$conn = new db_class();
$conn->delete_video($id, $vid);

?>