<?php
//tilgang til db_klassen for å liste medlemmer for admin/teacher
require_once 'db_class.php';
session_start();
if(isset($_SESSION['bid'])){ // sjekker om bruker i logget inn
	$id = $_SESSION['bid']; // lagrer brukerID
	$conn = new db_class();
	$conn->my_videos($id); // Starter my_videos fra db_class med medsendt parametre
} else {
	echo 'You have no videos uploaded';
}
?>