<?php
/**
 * Class Event
 * 
 * Cette classe représente un événement
 * 
 * @version 1.0
 * @author PascheK
 *  
 */

 class Event
 {

    //pk d'événement
    private $pk_event;
    //nom d'événement
    private $nom;
    //date d'événement
    private $date;
    //jour d'événement
    private $jour;
    //nombre de place d'événement 
    private $nbPlace;
    //type d'événement
    private $typeEvent;

    /**
     * Constructeur d'un événement
     */
    public function __construct($pk_event, $nom, $date, $jour, $nbPlace, $typeEvent)
    {
        $this->pk_event = $pk_event;
        $this->nom = $nom;
        $this->date = $date;
        $this->jour = $jour;
        $this->nbPlace = $nbPlace;
        $this->typeEvent =$typeEvent;
      
    }   

    /**
     * Get the value of pk_event
     */ 
    public function getPk_event()
    {
        return $this->pk_event;
    }

    /**
     * Get the value of nom
     */ 
    public function getNom()
    {
        return $this->nom;
    }

    /**
     * Get the value of date
     */ 
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Get the value of jour
     */ 
    public function getJour()
    {
        return $this->jour;
    }

    /**
     * Get the value of nbPlace
     */ 
    public function getNbPlace()
    {
        return $this->nbPlace;
    }

    /**
     * Get the value of typeEvent
     */ 
    public function getTypeEvent()
    {
        return $this->typeEvent;
    }
 
    
    /**
     * Méthode de conversion en JSON
     */
    public function toJSON()
    {
        $result = array();
        $result["pk"] = $this->getPk_event();
        $result["nom"] = $this->getNom();
        $result["date"]=$this->getDate();
        $result["jour"]=$this->getJour();
        $result["nbPlace"]=$this->getNbPlace();
        $result["typeEvent"]=$this->getTypeEvent();
        return json_encode($result);
    }

 }
    
?>