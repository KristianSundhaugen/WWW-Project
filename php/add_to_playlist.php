<?php
require_once "db_class.php";

if(isset($_SESSION['bid'])) {
	$conn = new db_class();
	$id = $_SESSION['bid'];
	$pid = $_POST['pid'];
	$vid = $_POST['vid'];

	$conn->add_video_to_playlist($pid, $vid, $id);
} 

?>