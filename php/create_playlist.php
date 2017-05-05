<?php
require_once 'db_class.php';
session_start();
if(isset($_SESSION['bid'])) { // Hvis brukeren har en bruker ID
	$conn = new db_class();
	//Hjelpevariabel for å linke spilleliste til riktig bruker i database
	$id = $_SESSION['bid']; // Sett session til $id
	$playlist_name = $_POST['playlist']; // Setter medsendt playlist navn til $playlist_name
	$conn->create_playlist($id, $playlist_name); // starter create_playlist i db_class med medsendte parametre.
} else {
	echo "you are not logged in!";
}

?>