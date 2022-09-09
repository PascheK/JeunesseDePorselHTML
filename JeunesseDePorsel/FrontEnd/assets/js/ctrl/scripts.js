let eventSelect = null;
/**
 * Méthode "start" appelée après le chargement complet de la page
 */
$(document).ready(function () {
  $.getScript("../assets/js/config.js", function () {
    console.log("config.js chargé !");
    $.getScript("../assets/js/services/servicesHttp.js", function () {
      console.log("servicesHttp.js chargé !");
      checkSession(window.location.href, succes,errorPopUp);
      chargerEvent();
      
    });
  })
 
  $(document).on("click", ".reserve", function () {
    getInscrit(this.id, getListInscritSucces, errorPopUp);
    eventSelect = this;
  });
  $(document).on("click", "#loginButton", function(){
    loginPopup();
  })
});

function succes(result){
  let redirect = ""+result;
  if(redirect === "redirect ok"){
    window.location.href = "https://jeunessedeporsel.ch/FrontEnd/views/jeunessedeporsel.html";
  }
}


function chargerEvent(){
  getTheatreEvent(chargerEventSucces, errorPopUp);
}

/**
 * Charger event
 */
function chargerEventSucces(data) {
  for (let i = 0; i < data.length; i++) {
    let id = data[i].pk;
    let idEvent = data[i].typeEvent;
    let nom = data[i].nom;
    let date = data[i].date;
    let jour = data[i].jour;
    let nbPlace = data[i].nbPlace;
    let d1 = `{
                "id": "${id}",
                "place": "${nbPlace}"}`;
    
    let calandareDay;
    if (nbPlace == 0) {
      nbPlace = "-";
    }

    if (idEvent == 1) {
      if (jour == 16) {
        calandareDay = `<div class="eventday">  <div class="day">
                <p id="month">${date}</p>
                <p id="day">${jour} </p>
                </div>
                <div class="element">
                    <p>${nom}</p>
                    <p class="place" id=${nbPlace}>Nombre de place restante : ${nbPlace}</p>
                    <div class="under">
                        <div class="heure">
                        <img id="image" src="../assets/images/hours.png">
                            <p>15:00</p>
                        </div>
                        <div class="download">
                        
                  
                        <a id="${id}" data-nbPlace="${nbPlace}" class="reserve">Réserver</a>
                        </div>
                    </div>
                </div>
            </div>`;
      } else {
        calandareDay = `<div class="eventday">  <div class="day">
        <p id="month">${date}</p>
        <p id="day">${jour} </p>
        </div>
        <div class="element">
            <p>${nom}</p>
            <p class="place" id=${nbPlace}>Nombre de places restantes : ${nbPlace}</p>
            <div class="under">
                <div class="heure">
                <img id="image" src="../assets/images/hours.png">
                    <p>20:15</p>
                </div>
                <div class="download">
                
          
                <a  id="${id}" data-nbPlace="${nbPlace}" class="reserve">Réserver</a>
                </div>
            </div>
        </div>
    </div>`;
      }
      document.querySelector("#theatreCalendrier").innerHTML += calandareDay;
    } else {
      if (idEvent == 2) {
        calandareDay = `<div class="eventday">  <div class="day">
                <p id="month">${date}</p>
                <p id="day">${jour} </p>
                </div>
                <div class="element">
                    <p>${nom}</p>
                    <p class="place" id=${nbPlace}>Nombre de places restantes : ${nbPlace}</p>
                    <div class="under">
                        <div class="heure">
                        <img id="image" src="../assets/images/hours.png">
                            <p>20:15</p>
                        </div>
                        <div class="download">
                        
                  
                        <a  id="${id}" data-nbPlace="${nbPlace}" class="reserve">Réserver</a>
                        </div>
                    </div>
                </div>
            </div>`;
      } else if (idEvent == 3) {
        calandareDay = `<div class="eventday">  <div class="day">
                <p id="month">${date}</p>
                <p id="day">${jour} </p>
                </div>
                <div class="element">
                    <p>${nom}</p>
                    <p class="place" id=${nbPlace}>Nombre de places restantes : ${nbPlace}</p>
                    <div class="under">
                        <div class="heure">
                            <img id="image" src="../assets/images/hours.png">
                            <p>20:15</p>
                        </div>
                        <div class="download">
                        
                  
                        <a href="download/La_nuit_du_coyote.pdf" download class="downloadFile">Télécharger</a>
                        </div>
                    </div>
                </div>
            </div>`;
      }
      document.querySelector("#event").innerHTML += calandareDay;
    }
  }
}




/**
 * Inscriptions
 */
function getListInscritSucces(data) {
 
  let id = eventSelect.id;
  let placeDispo = eventSelect.dataset.nbplace;
  Swal.fire({
    title: "Réservation ! ",
    html:
      `<p>Nom</p>
        <input type="text" id="nom" class="swal2-input" placeholder="Pasche">
        <p>Prénom</p>
        <input type="text" id="prenom" class="swal2-input" placeholder="Killian">
        <p>Numéro de téléphone</p>
    <input type="tel" id="telephone" class="swal2-input" placeholder="076 310 35 60" pattern="[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}">
    <p>Veuillez choisir un nombre de places entre 1 et ` +
      placeDispo +
      `</p>
    <input type="number" id="place" class="swal2-input" min="1" max="` +
      placeDispo +
      `">`,
    confirmButtonText: "S'inscrire",
    focusConfirm: false,
    preConfirm: () => {
      const nom = Swal.getPopup().querySelector("#nom").value;
      const telephone = Swal.getPopup().querySelector("#telephone").value;
      const place = Swal.getPopup().querySelector("#place").value;
      const prenom = Swal.getPopup().querySelector("#prenom").value;
      if (
        !nom ||
        !prenom ||
        !telephone ||
        parseInt(place) < 1 ||
        parseInt(place) > placeDispo ||
        !place
      ) {
        Swal.showValidationMessage(
          `Veuillez entrer des informations correctes!`
        );
      }
      return { nom: nom, prenom: prenom, telephone: telephone, place: place };
    },
  }).then((result) => {
    if (!result.isDismissed) {
      if (result != null) {
        let formdata = {
          nom: result.value.nom,
          prenom: result.value.prenom,
          telephone: result.value.telephone,
          place: result.value.place,
          newPlace: 0,
          fk_event: id,
        };
        let nomPrenomInscrit = result.value.prenom + "" + result.value.nom;
        let exist = false;
        data.forEach((element) => {
          let nomprenom = element.prenom + "" + element.nom;
          if (nomprenom == nomPrenomInscrit) {
          
            element.nbPlace;
            formdata.newPlace =
              parseInt(element.nbPlace) + parseInt(formdata.place);
            modifierInscrit(formdata, errorPopUp, modifierSucces);
            exist = true;
          }
        });

        if (!exist) {
         
          ajouteInscrit(formdata, errorPopUp, inscriptionSucces);
        }
      }
    }
  });
}


 

 

 

/**
 * Login
 */
function loginPopup(){
  Swal.fire({
    title: "Login",
    html:
      `<p>Nom d'utilisateur</p>
        <input type="text" id="username" class="swal2-input" placeholder="Username">
        <p>Mot de passe</p>
        <input type="password" id="pass" class="swal2-input" placeholder="password">
        `,
    confirmButtonText: "Connexion",
    focusConfirm: false,
    preConfirm: () => {
      const user = Swal.getPopup().querySelector("#username").value;
      const pass = Swal.getPopup().querySelector("#pass").value;
     
      if (
        !user ||
        !pass 
      ) {
        Swal.showValidationMessage(
          `Veuillez entrer des informations correctes!`
        );
      }
      return { user: user, pass: pass};
    },
  }).then((result) => {
    if (!result.isDismissed) {
      if (result != null) {
        let formdata = {
          user: result.value.user,
          pass: result.value.pass,
         
        };
        login(formdata, loginOK, errorPopUp);

      
      }
    }
  });
}

 
 
/**
 * 
 * POP-UP
 * 
 */

 function  errorPopUp(request, status, error) {
 
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Quelque chose n\'as pas fonctionné: '+error,

  })
}

 function inscriptionSucces(request, status, error) {
  
  Swal.fire({
    icon: 'success',
    title: 'Succès',
    text: 'Un email vous sera envoyé',
    
  }).then((result) => {
    
      document.location.reload(true)
   
    
  })
}

function modifierSucces(request, status, error) {
  
  Swal.fire({
    icon: 'success',
    title: 'Succès',
    text: 'Un email vous sera envoyé',
    
  }).then((result) => {
    
      document.location.reload(true)
   
    
  })
}


 function loginOK(result) {
 
  if(result =="faux"){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Le login ou le mot de passe est faux!',
  
    })
  }else{
    Swal.fire({
      icon: 'success',
      title: 'Youpi!',
      text: 'Redirection à la page en cours!',
  
    }).then((result) => {
      
      document.location.reload(true)
   
    
  })}
    
}


/**
 * 
 * AUTRES
 * 
 */
$(window).on("load", function () {
  $(".loading").fadeOut(1000);
  $(".content").fadeIn(1000);
});

$(window).scroll(function () {
  if (this.scrollY > 20) {
    $(".navbar").addClass("sticky");
    $(".goTop").fadeIn();
  } else {
    $(".navbar").removeClass("sticky");
    $(".goTop").fadeOut();
  }
});

function toggle() {
  $(this).toggleClass("active");
  $(".navbar-menu").toggleClass("active");
}

function btnTop() {
  scroll(0, 0);
}
