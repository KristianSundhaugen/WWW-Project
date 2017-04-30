<?php
require_once 'db_class.php';

if($_POST) {
    $conn = new db_class();

    $firstname = mysql_real_escape_string($_POST['firstname']);
    $lastname = mysql_real_escape_string($_POST['lastname']);
    $email     = mysql_real_escape_string($_POST['email']);
    $password  = mysql_real_escape_string($_POST['password']);
    $joining_date   = date('Y-m-d H:i:s');
    
    //password_hash see : http://www.php.net/manual/en/function.password-hash.php
    $password   = password_hash( $password, PASSWORD_BCRYPT, array('cost' => 11));

    $conn->save($firstname, $lastname, $email, $password, $joining_date);
}
?>