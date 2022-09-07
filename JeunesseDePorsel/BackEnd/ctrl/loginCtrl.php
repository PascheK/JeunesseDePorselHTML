<?php 
	session_start();
	include_once('../workers/LoginDbManager.php');
	include_once('../beans/Login.php');
       
	  
    if (isset($_SERVER['REQUEST_METHOD']))
	{
		session_start ();
		if ($_SERVER['REQUEST_METHOD'] == 'POST')
		{
		
			if($_POST['action']=="check"){

				$loginDb = new loginDbManager();
				echo  $loginDb->checkSession();
			}else{
				$loginDb = new loginDbManager();
				echo $loginDb->checkLogin();
			}
		
		}
		if ($_SERVER['REQUEST_METHOD'] == 'GET'){
			$loginDb = new loginDbManager();
			$_SESSION['login'] = "";
			$_SESSION['pwd'] = "";
			
		}
	
	}
