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
	public function save($firstname, $lastname, $email, $password, $joining_date){

		try {

			$stmt = $this->conn->prepare("SELECT * FROM users WHERE email=:email");
        	$stmt->execute(array(":email"=>$email));
        	$count = $stmt->rowCount();
        
	        if($count==0){
	            
	            $stmt = $this->conn->prepare("INSERT INTO users(firstname, lastname, email, pwd, joining_date) VALUES(:firstname, :lastname, :email, :pwd, :jdate)");
	            $stmt->bindParam(":firstname",$firstname);
	            $stmt->bindParam(":lastname",$lastname);
	            $stmt->bindParam(":email",$email);
	            $stmt->bindParam(":pwd",$password);
	            $stmt->bindParam(":jdate",$joining_date);

	            if($stmt->execute()) {
	                echo "registered";
	            } else {
	                echo "Query could not execute !";
	            }
	        } else{
	            echo "1"; //  not available
	        }
		}
		catch(PDOException $e){
        	echo $e->getMessage();
    	}
	}
	//Funksjon for å logge inn en bruker
	public function login($email, $password){
		// Henter alt om brukeren
		try {
			$sql = "SELECT * FROM users WHERE email=:email";
			$stmt = $this->conn->prepare($sql);
			$stmt->execute(array(":email" => $email));
			 if($user = $stmt->fetch(PDO::FETCH_ASSOC)) {
				if (password_verify($password, $user['pwd'])) {
					session_start();
					$_SESSION['bid'] = $user['bid']; // lagrer brukerens id i session
					echo "Logged in";		
				//  echo '<script>alert("Successfully login!")</script>';
				//	echo '<script>window.location = "#member"</script>';
					// header("Location: #member");
				} else {
					echo "Invalid username or password";				
				//	echo '<script>alert("Invalid username or password")</script>';
				//	echo '<script>window.location = "#login"</script>';
				}
			} else {
				echo "Invalid username or password";
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


	public function upload() {
		

	}
}

?>