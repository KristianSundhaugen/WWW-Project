<?php
session_start();
include "c:/xampp/htdocs/prosjekt2/php/db_class.php";
 if($_FILES["subtitlesfile"]["name"] != "") { 			
	$extension = end(explode(".", $_FILES["subtitlesfile"] ["name"]));
	$allowed_type = array("vtt");
	if(in_array($extension, $allowed_type)) {
		$conn = new db_class();
		$subName = $_FILES['subtitlesfile']['name'];
        $subTmpName  = $_FILES['subtitlesfile']['tmp_name'];
        $subSize = $_FILES['subtitlesfile']['size'];
        $subfileType = $_FILES['subtitlesfile']['type'];

        $subTmpName = rand() . "." . $extension;
        $path="c:/xampp/htdocs/prosjekt2/Uploads/subtitles/" . $subName;

        move_uploaded_file($_FILES["subtitlesfile"]["name"], $path);

        $data = file_get_contents($path, NULL, NULL, 0, 60000);
        echo $data;

        $upload_file = $conn->uploadSub($subName, $subfileType, $subSize, $data);
        
	} else {
		echo "<script>alert('Invalid File Formate')</script>";
	}
} else {

	echo "<script>alert('Please Select File')</script>";
}