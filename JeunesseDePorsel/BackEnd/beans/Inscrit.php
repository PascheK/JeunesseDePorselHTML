<?php
/**
 * Class Inscrit
 * 
 * Cette classe représente un inscrit
 * 
 * @version 1.0
 * @author PascheK
 *  
 */

class Inscrit
{
    private $pk_inscrit;
    private $nom;
    private $prenom;
    private $nbPlace;
    private $telephone;
    private $fk_event; 

    /**
     * Constructeur d'un inscrit
     */
    public function __construct($pk_inscrit, $nom, $prenom, $nbPlace, $telephone, $fk_event)
    {
        $this->pk_inscrit = $pk_inscrit;
        $this->nom = $nom;
        $this->prenom = $prenom;
        $this->nbPlace = $nbPlace;
        $this->telephone = $telephone;
        $this->fk_event =$fk_event;
      
    }   

    


    /**
     * Get the value of pk_inscrit
     */ 
    public function getPk_inscrit()
    {
        return $this->pk_inscrit;
    }

    /**
     * Get the value of nom
     */ 
    public function getNom()
    {
        return $this->nom;
    }

    /**
     * Get the value of prenom
     */ 
    public function getPrenom()
    {
        return $this->prenom;
    }

    /**
     * Get the value of nbPlace
     */ 
    public function getNbPlace()
    {
        return $this->nbPlace;
    }

    /**
     * Get the value of telephone
     */ 
    public function getTelephone()
    {
        return $this->telephone;
    }

    /**
     * Get the value of fk_event
     */ 
    public function getFk_event()
    {
        return $this->fk_event;
    }

    /**
     * Méthode de conversion en JSON
     */
    public function toJSON()
    {
        $result = array();
        $result["pk"] = $this->getPk_inscrit();
        $result["nom"] = $this->getNom();
        $result["prenom"]=$this->getPrenom();
        $result["nbPlace"]=$this->getNbPlace();
        $result["telephone"]=$this->getTelephone();
        $result["fk"]=$this->getFk_event();
        return json_encode($result);
    }


}

?>