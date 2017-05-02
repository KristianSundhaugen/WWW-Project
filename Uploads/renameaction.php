<?php
session_start();
// include "include/db.php";
// include "rename.php";

// Funksjon som sjekker om navnet finnes i databasen
/*function videoExists($conn, $compare) {
    $stmt = $conn->prepare("SELECT name FROM video WHERE name = :name");
    $stmt->bindParam(':name', $compare);
    $stmt->execute();

    if($stmt->rowCount() > 0){
        return 1;
    } else {
        return 0;
    }
} */

 // if (isset($_GET['videoId'])) {

// Lager ny playlist i databasen med pId, navn og brukerId
$vName = $_GET['newname'];
$vId = $_GET['videoId'];

//Sjekker om navnet på spillelisten allerede finnes
// if(videoExists($conn, $vName)){
	// Sendes tilbake til spilleliste siden sin
//	header("Location: rename.php");
// }else {
 	$sql = "UPDATE video SET name='$vName' WHERE vid='$vID'";

$result = $conn->query($sql); // Sender resultat til database
//Setter tilgangen til databasen til 0
$conn = NULL;
header("Location: memberindex.php");
// }
// }
