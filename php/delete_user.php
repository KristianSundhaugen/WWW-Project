<?php
require_once 'db_class.php';

$id = $_POST['id'];
$conn = new db_class();
$conn->delete_user($id); // starter delete_user i db_class med medsendt parameter

?>