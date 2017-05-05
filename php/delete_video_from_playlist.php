<?php
require_once 'db_class.php';
session_start();
$id = $_SESSION['bid'];
$vid = $_POST['vid'];
$pid = $_POST['pid']
$conn = new db_class();
$conn->delete_video_from_playlist($id, $vid, $pid);

?>