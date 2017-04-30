<?php
//require database serverens sin informasjon
require 'config.php';

$response = array();

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
	public function save($first, $last, $email, $hash){
		try {
			$stmt = $this->conn->prepare("INSERT INTO users (firstname, lastname, email, password) VALUES(:firstname, :lastname, :email, :password)") or die($this->conn->error);
			$stmt->bindParam(':firstname', $first);
			$stmt->bindParam(':lastname', $last);
			$stmt->bindParam(':email', $email);
			$stmt->bindParam(':password', $hash);			

			$stmt->execute();
		}
		catch(PDOException $e){
	    	echo "Error: " . $e->getMessage();
	    }
		$conn = null;
	}
	//Funksjon for å logge inn en bruker
	public function login($email, $password){
		// Henter alt om brukeren
		try {
			$sql = "SELECT * FROM users WHERE email=:email";
			$stmt = $this->conn->prepare($sql);
			$stmt->execute(array(":email" => $email));
			 if($user = $stmt->fetch(PDO::FETCH_ASSOC)) {
			 	echo "1";
				if (password_verify($password, $user['pwd'])) {
					session_start();
					$_SESSION['bid'] = $user['bid']; // lagrer brukerens id i session
					echo "LoggedIn!";			
				//	echo '<script>alert("Successfully login!")</script>';
				//	echo '<script>window.location = "#member"</script>';
					// header("Location: #member");
				} else {
					echo "4";
				//	echo '<script>alert("Invalid username or password")</script>';
				//	echo '<script>window.location = "#login"</script>';
				}
			} else {
				echo "2";
			//	echo '<script>alert("Invalid username or password")</script>';
			//	echo '<script>window.location = "#login"</script>';
			}
		}
		catch(PDOException $e){
	    	echo "Error: " . $e->getMessage();
	    }
	    // die(json_encode(array("return" => $return)));

	}
	// Funksjon for å sjekke om bruker er logget inn.
	 public function is_loggedIn() {
		if(isset($_SESSION['bid'])) 
		return true;
	}
	/*// Funksjon for å logge ut bruker.
	public function logout() {
		session_destroy();
		unset($_SESSION['bid']);
		return true;
	}
	*/
}

?>