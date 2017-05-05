<?php
	if(isset($_SESSION['admin'])){ // sjekker om bruker er admin eller ikke
		echo "1";
	}else
		echo "0";
?>