<?php 
	include_once('Connexion.php');
	include_once('beans/Inscrit.php');



	/**
	* Class InscritDbManager
	* 
 	* Cette classe représente le manager d'un inscrit
 	* 
 	* @version 1.0
 	* @author PascheK
 	*  
 	*/

    class InscritDbManager
    {
		/**
		 * Méthode de lecture d'un inscrit
		 * cette méthode permet la lecture d'inscrit
		 * @return la liste des inscrits à un event
		 */
        public function readInscrit()
		{
			$fk = $_GET["Fk"];
			$count = 0;
			$liste = array();
			
			$query = connexion::getInstance()->SelectQuery("SELECT * FROM T_Inscrit WHERE Id_event = $fk",null);
			foreach($query as $data){
				$inscrit = new Inscrit($data['PK_ID'], $data['Nom'], $data['Prenom'], $data['nbPlace'], $data['Telephone'], $data['Id_event']);
				$liste[$count++] = $inscrit;
			}
			return $liste;
		}
		/**
		 * Méthode d'ajout d'inscrit
		 * cette méthode permet l'ajout d'inscrit
		 * @return le resultat de la requete
		 */
		public function add()
		{
			parse_str(file_get_contents("php://input"),$vars);
			$nom = $vars['nom'];
			$prenom = $vars['prenom'];
			$place = $vars['place'];
			$num = $vars['telephone'];
			$fk = $vars['fk_event'];
			$action = "";
			try{
				$res = connexion::getInstance()->startTransaction();
				$query = "INSERT INTO T_Inscrit (PK_ID, Nom, Prenom,nbPlace, Telephone,Id_event) values(Null, :nom ,:prenom ,:nbPlace ,:telephone ,:fk)";
				$params = array('nom'=>$nom, 'prenom'=>$prenom, 'nbPlace'=>$place,'telephone'=>$num, 'fk'=>$fk);
				$action = $action . '<br/>' . $query;
				$res = $res &  connexion::getInstance()->addQueryToTransaction($query, $params);
				$action = $action . '<br/>' . "L'inscrit va être ajouté: " . connexion::getInstance()->getLastId('T_Inscrit');

				$query = "UPDATE T_Evenement SET NbPlace=NbPlace-:place  WHERE PK_ID=:fk";
				$params = array('place'=>$place, 'fk'=>$fk);
				$action = $action . '<br/>' . $query;
				$res = $res &  connexion::getInstance()->addQueryToTransaction($query, $params);
				$action = $action . '<br/>' . "L'événement ".$fk." va être modifié: ";
				if ($res)
				{
					// si toutes les requêtes ont fonctionné, on fait un commit;
					connexion::getInstance()->commitTransaction();
					
					$action =  $action . '<br/>ACTION: ' .'commit';
				}
				else{
					// sinon on fait un rollback
					connexion::getInstance()->rollbackTransaction();
					$action =  $action . '<br/>ACTION: ' .'rollback';                
				}   

			}catch (Exception $e) {
				// en cas d'exception (base de données plus accessible,...), on fait un rollback
				connexion::getInstance()->rollbackTransaction();
				$action =  $action . '<br/>ACTION: ' .'rollback';
			}
			return $action;

			
		
		
		}
		/**
		 * Méthode de modification d'inscrit
		 * cette méthode va modifier un inscrit
		 * @return le resultat de la requete
		 */
		public function modify()
		{
			parse_str(file_get_contents("php://input"),$vars);
			$nom = $vars['nom'];
			$prenom = $vars['prenom'];
			$newPlace = $vars['newPlace'];
			$place = $vars['place'];
			$fk = $vars['fk_event'];
			$action = "";

			try{
				$res = connexion::getInstance()->startTransaction();
				$query = "UPDATE T_Inscrit SET nbPlace= :nbPlace WHERE Nom= :Nom AND Prenom= :Prenom AND Id_event= :fk" ;
				$params = array('nbPlace' => $newPlace, 'Nom'=>$nom, 'Prenom'=>$prenom, 'fk'=>$fk);
				$action = $action . '<br/>' . $query;
				$res = $res &  connexion::getInstance()->addQueryToTransaction($query, $params);
				$action = $action . '<br/>' . "L'inscrit va être modifié: " . connexion::getInstance()->getLastId('T_Inscrit');

				$query = "UPDATE T_Evenement SET NbPlace=NbPlace-:place  WHERE PK_ID=:fk";
				$params = array('place'=>$place, 'fk'=>$fk);
				$action = $action . '<br/>' . $query;
				$res = $res &  connexion::getInstance()->addQueryToTransaction($query, $params);
				$action = $action . '<br/>' . "L'événement ".$fk." va être modifié: ";
				if ($res)
				{
					// si toutes les requêtes ont fonctionné, on fait un commit;
					connexion::getInstance()->commitTransaction();
					$action =  $action . '<br/>ACTION: ' .'commit';
					 
				}
				else{
					// sinon on fait un rollback
					connexion::getInstance()->rollbackTransaction();
					$action =  $action . '<br/>ACTION: ' .'rollback';                
				}   

			}catch (Exception $e) {
				// en cas d'exception (base de données plus accessible,...), on fait un rollback
				connexion::getInstance()->rollbackTransaction();
				$action =  $action . '<br/>ACTION: ' .'rollback';
			}
			return $action;

		}

		/**
		 * Méthode d'envoie de mail à un inscrit
		 * cette méthode va envoyer un mail à l'incrit
		 * @return un resultat si le mail est envoyé ou non
		 *  
		 */
		public function confirmationMail()
		{
			parse_str(file_get_contents("php://input"),$vars);
			$nom = $vars['nom'];
			$prenom = $vars['prenom'];
			$place = $vars['newPlace'];
			
			$fk = $vars['fk_event'];

			$from ="info@jeunessedeporsel.ch";
			$to = "info@jeunessedeporsel.ch";
			$subject = "Confirmation de réservation";
			$message="<font face='arial'>Bonjour toi prenom ,
																	 Vous avez réservé place place pour le théatre de la jeunesse de porsel. 
																	 La jeunesse de porsel vous remercie et $ hâte de vous voir</font>";
			$entetes="From: info@jeunessedeporsel.ch";
   		$entetes.="Content-Type: text/html; charset=iso-8859-1";
	 		$result = mail($to, $subject, $message, $entetes);
			echo $result;
			 if($result){
				return "mail envoyé";
			}else{
				return "ntm";
			}
			
		
		}
		/**
		 * Méthode de conversion en JSON
		 * cette méthode va transformer une array en un tableau JSON
		 * @return le tableau json d'événement
		 */
		 public function getInJSON()
		{
			$listInscrit = $this->readInscrit();
			
			$result = "[";
			for($i=0;$i<sizeof($listInscrit);$i++) 
			{
				if($result =="["){
					$result = $result .$listInscrit[$i]->toJSON();
				}else{
					$result = $result.",".$listInscrit[$i]->toJSON();
				}
				
			}
			$result = $result. "]";
			
			
			return $result;
		}



    }
?>