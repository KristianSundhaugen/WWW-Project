
<?php
session_start();
include "c:/xampp/htdocs/prosjekt2/php/db_class.php";
 if($_FILES["videoFile"]["name"] != "") { 			
	$extension = end(explode(".", $_FILES["videoFile"] ["name"]));
	$allowed_type = array("ogg", "mp4", "webm");
	if(in_array($extension, $allowed_type)) {
		$conn = new db_class();
		$fileName = $_FILES["videoFile"]["name"];
		$tmpName = $_FILES["videoFile"]["tmp_name"];
        $fileSize = $_FILES["videoFile"]["size"];
        $fileType = $_FILES["videoFile"]["type"];
        $userbid = $_SESSION["bid"];
        
        $tmpName = rand() . "." . $extension;
        $path="c:/xampp/htdocs/prosjekt2/Uploads/videos/" . $fileName;
        move_uploaded_file($_FILES["videoFile"]["tmp_name"], $path);
        $upload_file = $conn->upload($userbid, $fileName, $fileSize, $fileType);
        
	} else {
		echo "<script>alert('Invalid File Formate')</script>";
	}
} else {

	echo "<script>alert('Please Select File')</script>";
}