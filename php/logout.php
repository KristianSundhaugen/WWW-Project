<?php
	session_start();
	session_unset($_SESSION['bid']); // Fjerner brukerID når bruker logger ut
?>