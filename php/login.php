<?php
require_once "db_class.php";
	

	
$conn = new db_class();
$email = $_POST["email"]; // lagrer parametre
$password = $_POST["pwd"];		
$get_user = $conn->login($email, $password); // starter login i db_class med medsendt parametre
