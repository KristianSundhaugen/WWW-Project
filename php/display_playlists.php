<?php
//tilgang til db_klassen for å liste medlemmer for admin/teacher
require_once 'db_class.php';
session_start();
if(isset($_SESSION['bid'])){
	$id = $_SESSION['bid'];
	$conn = new db_class();
	$conn->display_playlist($id);
} else {
	echo 'you have no playlists';
}
?>