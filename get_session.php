<?php
	session_start();
	if(isset($_SESSION['bid'])){
		echo "0";
	}else
		echo "1";
?>