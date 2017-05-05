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
	            echo "1"; //  finnes ikke
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

	//funksjon for å vise brukernes data og rettigheter for admins/teachers
	public function admin_table() {
		$data = array();	//Hjelpearray for å lagre verdier
		$stmt = $this->conn->prepare("SELECT firstname, lastname, email, admin, bid FROM users");
		$stmt->execute();
		$row = $stmt->fetchALL(PDO::FETCH_ASSOC);
		foreach ($row as $key => $value) {
			$data[$key] = $value;
			$result = json_encode($data);
		}
		echo $result;
	}

	//Funksjon som gir en bruker admin rettigheter
	public function edit_admin($id) {
		$sql = "UPDATE users SET admin = 1 WHERE bid = :id";
		$stmt = $this->conn->prepare($sql);
		$stmt->bindParam(":id", $id);
		$stmt->execute();
	}
	//Funksjon for å slette en bruker fra databasen
	public function delete_user($id) {
		$sql = "DELETE FROM users WHERE bid=:id";
		$stmt = $this->conn->prepare($sql);
		$stmt->bindParam(":id", $id);
		$stmt->execute();
	}

	public function upload($bid, $name, $size, $type) {
		//$path="c:/xampp/htdocs/prosjekt2/Uploads/videos" . $name;
		

		$stmt = $this->conn->prepare("INSERT INTO video(bid, name, size, type) VALUES(:userbid, :fileName, :fileSize, :fileType)");
		$stmt->bindparam(":userbid", $bid);
		$stmt->bindparam(":fileName", $name);
		$stmt->bindparam(":fileSize", $size);
		$stmt->bindparam(":fileType", $type);

		$stmt->execute();
		// $_SESSION['video_id'] = $stmt->lastInsertId();			
		
		echo "Uploaded";
			
		
	}

	public function uploadSub($name, $type, $size, $data) {
		$stmt = $this->conn->prepare("SELECT * FROM video WHERE name=:name");
        	$stmt->execute(array(":name"=>$name));
        	 if($video_id = $stmt->fetch(PDO::FETCH_ASSOC))
        	 	$vid = $video_id['vid']; 
					$stmt = $this->conn->prepare("INSERT INTO subtitles(subName, subType, subSize, vid, data) VALUES(:subName, :subType, :subSize, :video_id, :data)");
					$stmt->bindparam(":subName", $name);	
					$stmt->bindparam(":subType", $type);
					$stmt->bindparam(":subSize", $size);
					$stmt->bindparam(":video_id", $vid);
					$stmt->bindparam(":data", $data);
					

					$stmt->execute();
			
	}

	public function display() {

			$data = array();	//Hjelpearray for å lagre verdier
		$stmt = $this->conn->prepare("SELECT name, size, type, vid, bid FROM video");
		$stmt->execute();
		$row = $stmt->fetchALL(PDO::FETCH_ASSOC);
		foreach ($row as $key => $value) {
			$data[$key] = $value;
			$result = json_encode($data);
			
		}
		echo $result;
	}

	//Funksjon for å opprette spilleliste for bruker
	public function create_playlist($id, $playlist_name) {
		
		$stmt = $this->conn->prepare("SELECT pName FROM playlist WHERE pName = :name");
		$stmt->bindParam(':name', $playlist_name);
		$stmt->execute();
		if($stmt->rowCount() > 0) {
			echo 'playlist already exists';
		} else {
			$stmt = $this->conn->prepare("INSERT INTO playlist(pName, bid) VALUES (:playlist_name, :bid)");
			$stmt->bindParam(':playlist_name', $playlist_name);
			$stmt->bindParam(':bid', $id);
			if($stmt->execute()) {
				echo 'Successfully created playlist';
			} else {
				echo 'Query could not execute !';
			}
		}
	}

	//Funksjon for å displaye spillelister
	public function display_playlist($id) {

		$data = array();	//Hjelpearray for å lagre verdier
		$stmt = $this->conn->prepare('SELECT pName, pId FROM playlist WHERE bid = :bid');
		$stmt->bindParam(':bid', $id);
		$stmt->execute();
		$row = $stmt->fetchALL(PDO::FETCH_ASSOC);

		foreach ($row as $key => $value) {
			$data[$key] = $value;
			$result = json_encode($data);
		}
		echo $result;
	}

	//Funksjon for å slette spilleliste
	public function delete_playlist($id) {
		$sql = "DELETE FROM playlist WHERE pId=:id";
		$stmt = $this->conn->prepare($sql);
		$stmt->bindParam(":id", $id);
		$stmt->execute();
	}

	public function my_videos($id) {
			$data = array();	//Hjelpearray for å lagre verdier
		$stmt = $this->conn->prepare("SELECT * FROM video WHERE bid = :bid");
		$stmt->bindParam(':bid', $id);
		$stmt->execute();
		$row = $stmt->fetchALL(PDO::FETCH_ASSOC);
		foreach ($row as $key => $value) {
			$data[$key] = $value;
			$result = json_encode($data);
			
		}
		echo $result;
	}
	

}


?>