<?php
//tilkalles av signup.js og lagrer registreringsformets variabler for deretter å koble opp mot databasen
require_once "C:/xampp/htdocs/Prosjekt2/db_class.php";

if($_GET['action'] == 'signup') {
	echo '<script>alert("Successfully login!")</script>';
	echo '<script>window.location = "#member"</script>'; 
	$conn = new db_class();
	$data = [];

	$firstname = mysql_real_escape_string($_POST['firstname']);
	$lastname = mysql_real_escape_string($_POST['lastname']);
	$email = mysql_real_escape_string($_POST['email']);
	$password = ($_POST['password']);
	//Hasher passordet
	$hash = password_hash($password, PASSWORD_DEFAULT);

	$data = $conn->save($firstname, $lastname, $email, $hash);

	echo json_encode($data);
}


/*
$conn = new db_class();
if($_POST){
	$firstname = ($_POST['firstname']);
	$lastname = ($_POST['lastname']);
	$email = ($_POST['email']);
	$password = ($_POST['password']);
	//Hasher passordet
	$hash = password_hash($password, PASSWORD_DEFAULT);
	//Bruker db_class funksjon å legger brukeren inn i databasen
	$conn->save($firstname, $lastname ,$email, $hash);
	echo '<script>alert("Succesfully saved!")</script>';
	echo '<script>window.location= "#member"</script>';
}
*/
?>