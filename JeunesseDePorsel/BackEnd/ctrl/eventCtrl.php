<?php 
	session_start();
	include_once('../workers/EventDbManager.php');
	include_once('../beans/Event.php');
        
    if (isset($_SERVER['REQUEST_METHOD']))
	{
		if ($_SERVER['REQUEST_METHOD'] == 'GET')
		{
			$eventDb = new eventDbManager();
			echo $eventDb->getInJSON();
		}
		if ($_SERVER['REQUEST_METHOD'] == 'POST')
		{
			if(isset($_SESSION['login'])){
			$eventDb = new eventDbManager();
			echo $eventDb->addEvent();
			}
			else{
			http_response_code(401);
			}
		}
		//modification d'événement
		if ($_SERVER['REQUEST_METHOD'] == 'PUT')
		{
			if(isset($_SESSION['login'])){
				$eventDb = new eventDbManager();
				echo $eventDb->modifierEvent();
			}
			else{
				http_response_code(401);
			}
		}
		if ($_SERVER['REQUEST_METHOD'] == 'DELETE')
		{
			if(isset($_SESSION['login'])){
			$eventDb = new eventDbManager();
			echo $eventDb->deleteEvent();
			}
			else{
			http_response_code(401);
		}
		}
	}
