<?php
require_once 'db_class.php';

$id = $_POST['id'];
$conn = new db_class();
$conn->delete_playlist($id); // starter delete_playlist i db_class med medsendt parameter

?>