<?php
//tilgang til db_klassen for å liste medlemmer for admin/teacher
require_once 'db_class.php';

$conn = new db_class();

$conn->admin_table(); // starter admin_table funksjonen i db_class.php

?>