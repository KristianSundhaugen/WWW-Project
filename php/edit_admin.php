<?php
require_once 'db_class.php';

$id = $_POST['id'];
$conn = new db_class();
$conn->edit_admin($id); // starter edit_admin i db_class med medsendt parameter

?>