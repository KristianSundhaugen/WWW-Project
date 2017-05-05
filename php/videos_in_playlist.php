<?php
require_once "db_class.php";
session_start();
if(isset($_SESSION['bid'])) {
	$conn = new db_class();
	$pid = $_POST['pid'];
	$id = $_SESSION['bid'];
	$conn->display_videos_in_playlist($pid, $id);
}