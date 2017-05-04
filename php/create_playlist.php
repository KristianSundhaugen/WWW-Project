<?php
require_once 'db_class.php';
session_start();
if(isset($_SESSION['bid'])) {
	$conn = new db_class();
	//Hjelpevariabel for å linke spilleliste til riktig bruker i database
	$id = $_SESSION['bid'];
	$playlist_name = $_POST['playlist'];
	$conn->create_playlist($id, $playlist_name);
} else {
	echo "you are not logged in!";
}

?>