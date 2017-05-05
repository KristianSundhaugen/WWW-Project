<?php
//tilgang til db_klassen for å liste videoene som er lastet opp.
require_once 'db_class.php';

$conn = new db_class();

$conn->display();

?>