/*
 * Couche de services HTTP (worker).
 *
 * @author Pasche Killian
 * @version 1.0 / 14-FEV-2022
 */


 
/**
 * Fonction permettant de demander la liste des événements
 * @param {function} Fonction de callback lors du retour avec succès de l'appel.
 * @param {function} Fonction de callback en cas d'erreur.
 */
function getTheatreEvent(successCallback, errorCallback) {
  $.ajax({
    type: "GET",
    dataType: "json",
    url: urls.EVENT,
    success: successCallback,
    error: errorCallback
  });
}
/**
 * Fonction permettant de demander la liste des inscrits
 * @param {function} Fonction de callback lors du retour avec succès de l'appel.
 * @param {function} Fonction de callback en cas d'erreur.
 */
function getInscrit(fk, successCallback, errorCallback) {
  $.ajax({
    type: "GET",
    dataType: "json",
    url: urls.INSCRIT,
    data:"Fk="+fk ,
    success: successCallback,
    error: errorCallback
  });
}

/**
 * Fonction permettant de demander la modification des inscrit
 * @param {function} Fonction de callback lors du retour avec succès de l'appel.
 * @param {function} Fonction de callback en cas d'erreur.
 */
function modifierInscrit(data, successCallback, errorCallback){
  $.ajax({
    type: "PUT",
    dataType: "json",
    data: data,
    url: urls.INSCRIT,
    success: successCallback,
    error: errorCallback
  });
}

/**
 * Fonction permettant de demander l'ajouts des inscrit
 * @param {function} Fonction de callback lors du retour avec succès de l'appel.
 * @param {function} Fonction de callback en cas d'erreur.
 */
function ajouteInscrit(data, successCallback, errorCallback){
  $.ajax({
    type: "POST",
    dataType: "json",
    data: data,
    url: urls.INSCRIT,
    success: successCallback,
    error: errorCallback
  });
}

/**
 * Fonction permettant le login
 * @param {function} Fonction de callback lors du retour avec succès de l'appel.
 * @param {function} Fonction de callback en cas d'erreur.
 */
function login(data, successCallback, errorCallback){
  $.ajax({
    type: "POST",
    data: data,
    url: urls.LOGIN,
    success: successCallback,
    error: errorCallback
  });

}
/**
 * Fonction permettant la déconnexion
 * @param {function} Fonction de callback lors du retour avec succès de l'appel.
 * @param {function} Fonction de callback en cas d'erreur.
 */
function disconect( successCallback, errorCallback){
  $.ajax({
    type: "GET",
    url: urls.LOGIN,
    success: successCallback,
    error: errorCallback
  });

}

/**
 * Fonction permettant la vérification de la session
 * @param {function} Fonction de callback lors du retour avec succès de l'appel.
 * @param {function} Fonction de callback en cas d'erreur.
 */
function checkSession(data,successCallback, errorCallback){
  $.ajax({
    type: "POST",
    data: "action=check&data="+data,
    url: urls.LOGIN,
    success: successCallback,
    error: errorCallback
  });
}

/**
 * Fonction permettant de demander l'ajouts des événements
 * @param {function} Fonction de callback lors du retour avec succès de l'appel.
 * @param {function} Fonction de callback en cas d'erreur.
 */
function ajouteEvent(data, successCallback, errorCallback){
  $.ajax({
    type: "POST",
    dataType: "json",
    data: data,
    url: urls.EVENT,
    success: successCallback,
    error: errorCallback
  });
}

/**
 * Fonction permettant de demander la suppression des événements
 * @param {function} Fonction de callback lors du retour avec succès de l'appel.
 * @param {function} Fonction de callback en cas d'erreur.
 */
function deleteEvent(pk,successCallback, errorCallback){
  $.ajax({
    type: "DELETE",
    dataType: "json",
    data: pk,
    url: urls.EVENT,
    success: successCallback,
    error: errorCallback
  });
}

/**
 * Fonction permettant de demander la modifications des événements
 * @param {function} Fonction de callback lors du retour avec succès de l'appel.
 * @param {function} Fonction de callback en cas d'erreur.
 */
function PUTEvent(formdata, successCallback, errorCallback){
  $.ajax({
    type: "PUT",
    dataType: "json",
    data: formdata,
    url: urls.EVENT,
    success: successCallback,
    error: errorCallback
  });
}