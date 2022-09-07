<?php 
	session_start();
	include_once('../workers/InscritDbManager.php');
	include_once('../beans/Inscrit.php');
        
    if (isset($_SERVER['REQUEST_METHOD']))
	{
		if ($_SERVER['REQUEST_METHOD'] == 'GET')
		{
			$inscritDb = new inscritDbManager();
			echo $inscritDb->getInJSON();
		}
		if ($_SERVER['REQUEST_METHOD'] == 'POST')
		{
			$inscritDb = new inscritDbManager();
			echo $inscritDb->add();
			echo	$inscritDb->confirmationMail();
		}
		if ($_SERVER['REQUEST_METHOD'] == 'PUT')
		{
			$inscritDb = new inscritDbManager();
			echo $inscritDb->modify();
			echo $inscritDb->confirmationMail();
		}
	}
?> 