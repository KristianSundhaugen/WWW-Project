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

			if(empty($email)){
				$status = "error";
				$message = "You did not enter an email address!";
			}
			else if(!filter_var($email, FILTER_VALIDATE_EMAIL){
				$status = "error";
				$message = "You did have entered an invalid email address!";
			}
			else {
				$existingEmail = $this->conn->prepare("SELECT * FROM users WHERE email = :email")
				$count = $existingEmail->rowCount();
				if($count < 1){

					$stmt = $this->conn->prepare("INSERT INTO users (firstname, lastname, email, pwd) VALUES(:firstname, :lastname, :email, :password)") or die($this->conn->error);
					$stmt->bindParam(':firstname', $first);
					$stmt->bindParam(':lastname', $last);
					$stmt->bindParam(':email', $email);
					$stmt->bindParam(':password', $hash);
					$stmt->execute();

					$status = "sucess";
					$message = "You have been signed up!";
				}
				else {
					$status = "error";
            		$message = "This email address has already been registered!";
				}
			}

			//data for å returnere json respons
			$data = array(
				'status' => $status,
				'message' => $message
			);
		}
		catch(PDOException $e){
	    	echo "Error: " . $e->getMessage();
	    }
		$conn = null;

		return $data;
	 
	}
	//Funksjon for å logge inn en bruker
	public function login($email, $password){
		// Henter alt om brukeren
		try {
			$sql = "SELECT * FROM users WHERE email = :email";
			$stmt = $this->conn->prepare($sql);
			$stmt->execute(array(":email" => $email));
			if($user = $stmt->fetch(PDO::FETCH_ASSOC)){
				if (password_verify($password, $user['password'])) {
					session_start();
					$_SESSION['bid'] = $user['bid']; // lagrer brukerens id i session
					echo '<script>alert("Successfully login!")</script>';
					echo '<script>window.location = "#member"</script>'; 
				} else {
					echo '<script>alert("Invalid username or password")</script>';
					echo '<script>window.location = "#login"</script>';
				}
			} else {
				echo '<script>alert("Invalid username or password")</script>';
				echo '<script>window.location = "#login"</script>';
			}
		}
		catch(PDOException $e){
	    	echo "Error: " . $e->getMessage();
	    }

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
	public function userExists($email) {

		$sql = "SELECT * FROM users WHERE email = :email";
		$stmt = $this->conn->prepare($sql);
		$stmt->execute(array(":email" => $email));
		echo "hello ur in userexists";
		if($stmt->fetch(PDO::FETCH_ASSOC)){
			//brukeren finnes
			return 1;
		}else
			//brukeren finnes ikke
			return 0;
	}
}

?>