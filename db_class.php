<?php
//require database serverens sin informasjon
require 'config.php';

class db_class{
	//database klassens elementer
	public $host = db_host;
	public $user = db_user;
	public $pass = db_pass;
	public $dbname = db_name;
	public $conn;	
	public $error;
	// Constructor som kalles ved opprettelse av nytt objekt
	public function __construct (){
		$this->connect();
	}
	// privat funksjon som oppretter tilgang til databasen
	private function connect(){
		try {
		    $this->conn = new PDO("mysql:host=$this->host;dbname=$this->dbname", $this->user, $this->pass);
		    // set the PDO error mode to exception
		    $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		    // echo "Connected successfully"; 
		    }
		catch(PDOException $e){
		    echo "Connection failed: " . $e->getMessage();
		    }
	}
	//Funksjon for å opprette bruker i databasen
	public function save($username, $hash, $firm){
		try {
			$stmt = $this->conn->prepare("INSERT INTO user (username, password, firm) VALUES(:username, :password, :firm)") or die($this->conn->error);
			$stmt->bindParam(':username', $username);
			$stmt->bindParam(':password', $hash);
			$stmt->bindParam(':firm', $firm);

			$stmt->execute();
		}
		catch(PDOException $e){
	    	echo "Error: " . $e->getMessage();
	    }
		$conn = null;
	}
	//Funksjon for å logge inn en bruker
	public function login($username, $password){
		// Henter alt om brukeren
		try {
			$sql = "SELECT * FROM user WHERE username = :username";
			$stmt = $this->conn->prepare($sql);
			$stmt->execute(array(":username" => $username));
			if($user = $stmt->fetch(PDO::FETCH_ASSOC)){
				if (password_verify($password, $user['password'])) {
					session_start();
					$_SESSION['user_id'] = $user['user_id']; // lagrer brukerens id i session
					echo '<script>alert("Successfully login!")</script>';
					echo '<script>window.location = "home.php"</script>'; 
				} else {
					echo '<script>alert("Invalid username or password")</script>';
					echo '<script>window.location = "login.php"</script>';
				}
			} else {
				echo '<script>alert("Invalid username or password")</script>';
				echo '<script>window.location = "login.php"</script>';
			}
		}
		catch(PDOException $e){
	    	echo "Error: " . $e->getMessage();
	    }

	}
}

?>