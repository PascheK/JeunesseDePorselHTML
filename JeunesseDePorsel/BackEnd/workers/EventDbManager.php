<?php 
	include_once('Connexion.php');
	include_once('beans/Event.php');

/**
 * Class EventDbManager
 * 
 * Cette classe représente le manager d'événement
 * 
 * @version 1.0
 * @author PascheK
 *  
 */
	class EventDbManager
	{
		/**
		 * Méthode de lecture d'événement
		 * cette méthode permet la lécture d'événement
		 * @return liste d'evenement
		 */
		public function readEvent()
		{
			$count = 0;
			$liste = array();
	
		$query = connexion::getInstance()->SelectQuery("SELECT * FROM T_Evenement",null);
		
			foreach($query as $data){
			
				$event = new Event($data['PK_ID'], $data['Nom'], $data['Date'], $data['Jour'], $data['NbPlace'], $data['TypeEvenement']);
				$liste[$count++] = $event;
			}

			return $liste;
		}
		/**
		 * Méthode d'ajout d'événement
		 * cette méthode permet l'ajout d'événement
		 * @return le dernier evenement ajoutée
		 */
		public function addEvent(){
			parse_str(file_get_contents("php://input"),$vars);
			$nom = $vars['nom'];
			$place = $vars['place'];
			$mois = $vars['mois'];
			$jour = $vars['jour'];
			$type = 2;
			
			$query = "INSERT INTO T_Evenement (`PK_ID`, `Nom`, `Date`, `Jour`, `NbPlace`, `TypeEvenement`) values(NULL, :nom, :date, :jour, :place, :type)";
			$params = array('nom' => $nom, 'date'=>$mois,'jour'=>$jour, 'place'=>$place,'type'=>$type);
			$res = connexion::getInstance()->ExecuteQuery($query, $params);
			return connexion::getInstance()->GetLastId('T_Evenement');
		}


		/**
		 * Méthode de modification d'événement
		 * cette méthode va modifier un événement
		 * @return le resultat de la requete sql
		 */
		public function modifierEvent(){
			//récupère les paramètres donné dans la requette
			parse_str(file_get_contents("php://input"),$vars);
			$pk = $vars['pk'];
			$nom = $vars['nom'];
			$place = $vars['place'];
			$mois = $vars['mois'];
			$jour = $vars['jour'];
			//Prépare la requette SQL
			$query = "UPDATE T_Evenement SET Nom=:nom,Date=:date,Jour=:jour,NbPlace=:place WHERE PK_ID=:pk";
			//remplace les paramètre par les valeurs pour empecher les injections SQL
			$params = array('pk'=>$pk,'nom' => $nom, 'date'=>$mois,'jour'=>$jour, 'place'=>$place);
			//Execute la requette SQL
			$res = connexion::getInstance()->ExecuteQuery($query, $params);
			//retourne le résultat SQL
			return $res;
		}

		/**
		 * Méthode de suppression d'événement
		 * cette méthode va supprimer un événement
		 * @return le resultat de la requete sql
		 */
		public function deleteEvent(){
			parse_str(file_get_contents("php://input"),$vars);
			$pk = $vars['pk'];
 
			$query = "DELETE FROM `T_Evenement` WHERE `PK_ID`=:PK ";
			$params = array('PK' => $pk);
			$res = connexion::getInstance()->ExecuteQuery($query, $params);
			return $res;
		}

		/**
		 * Méthode de conversion en JSON
		 * cette méthode va transformer une array en un tableau JSON
		 * @return le tableau json d'événement
		 */
		public function getInJSON()
		{
			$listEvent = $this->readEvent();
			
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
?>