<?php 
	include_once('Connexion.php');
	include_once('beans/Login.php');

/**
 * Class LoginDbManager
 * 
 * Cette classe représente le manager d'un login
 * 
 * @version 1.0
 * @author PascheK
 *  
 */
	class LoginDbManager
	{
	/**
		 * Méthode de lecture d'un login
		 * cette méthode permet la lecture d'un login
		 * @return la liste des logins
		 */
	public function readLogin() 
	{
			$count = 0;
			$liste = array();
			$query = connexion::getInstance()->SelectQuery("SELECT * FROM T_Login",null);
    
			foreach($query as $data){

				$login = new Login($data['PK'], $data['Username'], $data['Password']);
				$liste[$count++] = $login;

			}
			
			return $liste;
	}

	/**
	 * Méthode de vérification d'un login
	 * cette méthode vérifier un login
	 * @return le le test de la verification
	 */
    public function checkLogin()
    {
    
      parse_str(file_get_contents("php://input"),$vars);
      $username = $vars['user'];
      $liste = $this->readLogin();
			
			for($i=0;$i<sizeof($liste);$i++) 
			{

				$elem = $liste[$i]->toJSON();
				$user = $elem['username'];
				$mdp = $elem['password'];
				if($username == $user)
				{
					if(password_verify ($vars['pass'], $mdp))
					{
						session_start();
						$_SESSION['login'] = $username;
						$_SESSION['pwd'] = $mdp;
						print_r( $_SESSION);
						return "connexion réussite!";
					}	
					else
					{
						return "faux";
					}	
				}else
				{
					return "faux";
				}	
			
			}
	}

	/**
	 * Méthode de vérification d'une Session
	 * cette méthode vérifier une session
	 * @return le le test de la verification
	 */
	public function checkSession()
	{
	
		if(isset($_SESSION['username']) || isset($_SESSION['pwd']) ){
		
			$liste = $this->readLogin();
			$uri = $_POST['data'];
		
			for($i=0;$i<sizeof($liste);$i++) {
				
				$elem = $liste[$i]->toJSON();
			
				$user = $elem['username'];
				$mdp = $elem['password'];
			
				if($user == $_SESSION['username'] || $mdp == $_SESSION['pwd'] ){
				
					
					
						return "redirect ok";
			
					
				}else if(strpos($uri, 'https://jeunessedeporsel.ch/htdocs/JeunesseDePorsel/FrontEnd/views/jeunessedeporsel.html') !== false){
					
					return "session fermé";
				}
				else{
				
					return "i c i";
				}
			}
		}else{
			return "session fermé";
		}
	}
	
	/**
	 * Méthode de conversion en JSON
	 * cette méthode va transformer une array en un tableau JSON
	 * @return le tableau json d'événement
	 */
	public function getInJSON()
	{
				$listEvent = $this->readLogin();
				
				$result = "[";
				for($i=0;$i<sizeof($listEvent);$i++) 
				{
					if($result =="["){
						$result = $result .$listEvent[$i]->toJSON();
					}else{
						$result = $result.",".$listEvent[$i]->toJSON();
					}
					
				}
				$result = $result. "]";
				
				
				return $result;
			}
	
	}