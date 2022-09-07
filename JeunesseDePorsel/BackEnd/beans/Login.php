<?php
/**
 * Class Login
 * 
 * Cette classe représente un login
 * 
 * @version 1.0
 * @author PascheK
 *  
 */

class Login
{
    private $pk_login;
    private $username;
    private $password;
   
    /**
     * Constructeur d'un login
     */
    public function __construct($pk_login, $username, $password)
    {
        $this->pk_login = $pk_login;
        $this->username = $username;
        $this->password = $password;
      
    }   

    
    /**
     * Get the value of pk_login
     */ 
    public function getPk_login()
    {
        return $this->pk_login;
    }

    /**
     * Get the value of username
     */ 
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * Get the value of password
     */ 
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Méthode de conversion en JSON
     */
    public function toJSON()
    {
        $result = array();
        $result["pk"] = $this->getPk_login();
        $result["username"] = $this->getUsername();
        $result["password"]=$this->getPassword();
        return $result;
    }




}

?>