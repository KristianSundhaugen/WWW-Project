<?php
require_once "db_class.php";
	

	
		$conn = new db_class();
		$email = $_POST["email"];
		$password = $_POST["pwd"];		
		$get_user = $conn->login($email, $password);
