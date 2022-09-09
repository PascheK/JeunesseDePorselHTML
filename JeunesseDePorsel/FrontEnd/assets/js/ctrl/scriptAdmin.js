

$(document).ready(function () {
  $.getScript("../assets/js/config.js", function () {
    console.log("config.js chargé !");
    $.getScript("../assets/js/services/servicesHttp.js", function () {
      console.log("servicesHttp.js chargé !");
      checkSession(window.location.href, sessionOK, errorCallback);
      getTheatreEvent(chargetTab, errorCallback);
    });
  })
 
  $(document).on("click", "#addEvent", function () {
    addEvent();
  });
  //appelle la méthode de modification
  $(document).on("click", "#modiferEvent", function () {
    modifierEvent();
  });
  $(document).on("click", "#deleteEvent", function () {
    delEvent();
  });
  $(document).on("click", "#unlogButton", function () {
    disconect(disconectSucces, errorCallback);
  });
  $(document).on("click", "#print", function () {
    printTest();
  });
  $(document).on("click", ".tabulator-cell", function() {
    getInscritFromTable();
    })
});

/**
 * 
 * Variable
 * 
 */

 var table;


/**
 *
 * Gestion d'événement
 *
 */

function addEvent() {
  Swal.fire({
    title: "Ajouter un événement !",
    html: `<p>Nom</p>
        <input type="text" id="nom" class="swal2-input" placeholder="LA QUARANTAINE">
        <p>Mois</p>
        <input type="text" id="mois" class="swal2-input" placeholder="Janvier = jan">
        <p>Jour</p>
        <input type="number" id="jour" class="swal2-input" min="1" max="31">
        <p>Place</p>
        <input type="number" id="place" class="swal2-input" min="1" max="500">
    
    `,
    confirmButtonText: "Ajouter",
    focusConfirm: false,
    preConfirm: () => {
      const nom = Swal.getPopup().querySelector("#nom").value;
      const place = Swal.getPopup().querySelector("#place").value;
      const mois = Swal.getPopup().querySelector("#mois").value;
      const jour = Swal.getPopup().querySelector("#jour").value;
      let verifnom = nom.indexOf("<");
      let verifmois = mois.indexOf("<");
      if (verifnom == -1 && verifmois == -1) {
        if (
          !nom ||
          !mois ||
          parseInt(jour) < 1 ||
          parseInt(jour) > 32 ||
          !jour ||
          parseInt(place) < 1 ||
          parseInt(place) > 501 ||
          !place
        ) {
          Swal.showValidationMessage(
            `Veuillez entrer des informations correctes!`
          );
        }
      } else {
        Swal.showValidationMessage(`Les chevrons ne sont pas permis!`);
      }
      return { nom: nom, place: place, mois: mois, jour: jour };
    },
  }).then((result) => {
    if (!result.isDismissed) {
      if (result != null) {
        let formdata = {
          nom: result.value.nom,
          place: result.value.place,
          mois: result.value.mois,
          jour: result.value.jour,
        };

        ajouteEvent(formdata, addEventSucces, errorCallback);
      }
    }
  });
}

/**
 * Modification d'événement
 * Cette méthode va modifier un événement choisis dans le tableau est le changer dans la base de données
 */
function modifierEvent() {
  //récupère la ligne selectionner dans le tableau d'événement
  let selectedrow = document.querySelector(".tabulator-selected");
  if (selectedrow == null) {
    //affiche pop-up si aucune ligne séléctionner
    errorRow();
  } else {
    //crée une array avec tout les éléments de la ligne séléctionner
    let formdata = {
      pk: selectedrow.childNodes[0].textContent,
      nom: selectedrow.childNodes[1].textContent,
      place: selectedrow.childNodes[2].textContent,
      mois: selectedrow.childNodes[3].textContent,
      jour: selectedrow.childNodes[4].textContent,
    };

    // affiche la pop-up
    Swal.fire({
      title: "Modifier un événement !",
      html: `<p>Nom</p>
        <input type="text" id="nom" class="swal2-input" value="${formdata.nom}">
        <p>Mois</p>
        <input type="text" id="mois" class="swal2-input" value="${
          formdata.mois
        }">
        <p>Jour</p>
        <input type="number" id="jour" class="swal2-input" min="1" max="31" value="${parseInt(
          formdata.jour
        )}">
        <p>Place</p>
        <input type="number" id="place" class="swal2-input" min="1" max="500" value="${parseInt(
          formdata.place
        )}">
       
    `,
      confirmButtonText: "Modifier",
      focusConfirm: false,
      preConfirm: () => {
        //récupère toute les modification.
        const nom = Swal.getPopup().querySelector("#nom").value;
        const place = Swal.getPopup().querySelector("#place").value;
        const mois = Swal.getPopup().querySelector("#mois").value;
        const jour = Swal.getPopup().querySelector("#jour").value;
        let verifnom = nom.indexOf("<");
        let verifmois = mois.indexOf("<");

        //test si il y a des chevrons ou non
        if (verifnom == -1 && verifmois == -1) {
          //test si les valeurs sont vide ou incorecte
          if (
            !nom ||
            !mois ||
            parseInt(jour) < 1 ||
            parseInt(jour) > 32 ||
            !jour ||
            parseInt(place) < 1 ||
            parseInt(place) > 501 ||
            !place
          ) {
            //affiche message d'erreur
            Swal.showValidationMessage(
              `Veuillez entrer des informations correctes!`
            );
          }
        } else {
          //affiche message d'erreur
          Swal.showValidationMessage(`Les chevrons ne sont pas permis!`);
        }
        //retourn les valeur si aucune erreur
        return { nom: nom, place: place, mois: mois, jour: jour };
      },
    }).then((result) => {
      //Test si le resultat n'est pas une annulation
      if (!result.isDismissed) {
        if (result != null) {
          //change l'array avec les nouvelle valeurs
          formdata.nom = result.value.nom;
          formdata.place = result.value.place;
          formdata.mois = result.value.mois;
          formdata.jour = result.value.jour;
          //appelle le php
          PUTEvent(formdata, modifierSucces, errorCallback);
        }
      }
    });
  }
}

/**
 * Suppresion d'événements
 */
function delEvent() {
  let selectedrow = document.querySelector(".tabulator-selected");
  if (selectedrow == null) {
    errorRow();
  } else {
    selectedrow = selectedrow.childNodes[0].textContent;
    let formdata = {
      pk: selectedrow,
    };
    deleteEvent(formdata, deleteSucces, errorCallback);
  }
}

/**
 *
 *  POP-UP
 *
 */

//Si il y eu une erreur
function errorCallback(error) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Quelque chose n'as pas fonctionné: " + error,
  });
}
function addEventSucces(result) {
  Swal.fire({
    icon: "success",
    title: "Wooo!",
    text: "l'événement à bien été crée! ",
  }).then((result) => {
    document.location.reload(true);
  });
}

//Si la modification est un sucess
function modifierSucces() {
  Swal.fire({
    icon: "success",
    title: "Wooo!",
    text: "l'événement à bien été modifié! ",
  }).then((result) => {
    document.location.reload(true);
  });
}

function deleteSucces() {
  Swal.fire({
    icon: "success",
    title: "Wooo!",
    text: "l'événement à bien été supprimé! ",
  }).then((result) => {
    document.location.reload(true);
  });
}
function errorRow() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "selectionner une ligne",
  });
}

function sessionOK(result) {
  let redirect = "" + result;
  if (redirect === "session fermé") {
    window.location.href = "https://jeunessedeporsel.ch/FrontEnd/views/";
  }
}

function disconectSucces() {
  Swal.fire({
    icon: "success",
    title: "Youpi!",
    text: "Déconnexion réussite !",
  }).then((result) => {
    document.location.reload(true);
  });
}

/**
 *
 * TAB
 *
 */

 
function chargetTab(data) {
  var tableData = [];
  data.forEach((element) => {
    tableData.push({
      id: element.pk,
      nom: element.nom,
      place: element.nbPlace,
      mois: element.date,
      jour: element.jour,
    });
  });

  /**Tab1
   var table2 = new Tabulator("#inscrit", {
     data: tableData,
     printHeader:"<h1>"+tableData.nom+"<h1>",
     layout: "fitColumns", 
     selectable: 1,
     responsiveLayout: "hide", //hide columns that dont fit on the table
     tooltips: true, //show tool tips on cells
     addRowPos: "top", //when adding a new row, add it to the top of the table
     history: true, //allow undo and redo actions on the table
     pagination: "local", //paginate the data
     paginationSize: 7, //allow 7 rows per page of data
     paginationCounter: "rows", //display count of paginated rows in footer
     movableColumns: true, //allow column order to be changed
     resizableRows: true, //allow row order to be changed
     printFooter:"<h2>Jeunesse de Porsel<h2>",
   
     initialSort: [
       //set the initial sort order of the data
       { column: "ID", dir: "asc" },
     ],
     columns: [
       //define the table columns
       { title: "ID", field: "id", editor: false },
       {
         title: "Nom",
         field: "nom",
         editor: false,
       },
       {
         title: "place",
         field: "place",
         editor: false,
       },
       {
         title: "mois",
         field: "mois",
         editor: false,
       },
       {
         title: "jour",
         field: "jour",
         editor: false,
       },
     ],
   });
  */

  var table = new Tabulator("#eventTab", {
    data: tableData,

    printHeader: "<h1>" + tableData.nom + "<h1>",
    layout: "fitColumns",
    selectable: 1,
    responsiveLayout: "hide", //hide columns that dont fit on the table
    tooltips: true, //show tool tips on cells
    addRowPos: "top", //when adding a new row, add it to the top of the table
    history: true, //allow undo and redo actions on the table
    pagination: "local", //paginate the data
    paginationSize: 7, //allow 7 rows per page of data
    paginationCounter: "rows", //display count of paginated rows in footer
    movableColumns: true, //allow column order to be changed
    resizableRows: true, //allow row order to be changed
    printFooter: "<h2>Jeunesse de Porsel<h2>",
    initialSort: [
      //set the initial sort order of the data
      { column: "ID", dir: "asc" },
    ],
    columns: [
      //define the table columns
      { title: "ID", field: "id", editor: false },
      {
        title: "Nom",
        field: "nom",
        editor: false,
      },
      {
        title: "place",
        field: "place",
        editor: false,
      },
      {
        title: "mois",
        field: "mois",
        editor: false,
      },
      {
        title: "jour",
        field: "jour",
        editor: false,
      },
    ],
  });
}

function getInscritFromTable() {
  let selectedrow = document.querySelector(".tabulator-selected");
  if (selectedrow == null) {
    errorRow();
  } else {
    selectedrow = selectedrow.childNodes[0].textContent;
    let formdata = {
      pk: selectedrow,
    };
    getInscrit(formdata.pk, printTable, errorCallback);
  }
}

function printTable(data) {
  let selectedrow = document.querySelector(".tabulator-selected");
  if (selectedrow == null) {
    errorRow();
  } else {
 
    nomRow = selectedrow.childNodes[2].textContent;
    moisRow = selectedrow.childNodes[6].textContent;
    jourRow = selectedrow.childNodes[8].textContent;
    let formdata = {
      nom: nomRow,
      mois: moisRow,
      jour: jourRow,
    };
 
     table = new Tabulator("#inscritTable", {
      data: data,
      layout: "fitColumns",
      printAsHtml: true,
      printHeader: `<h1>${formdata.nom} le ${formdata.jour} ${formdata.mois}<h1>`,
      printFooter: `<h2>Jeunesse de porsel<h2><br><img style="width: 100px;
 
    
      background-size: cover;" src="../images/logo.png">`,
      columns: [
        { title: "Nom", field: "nom", width: 200, editor: "input" },
        { title: "Prenom", field: "prenom" },
        { title: "Place", field: "nbPlace" },
        { title: "Numero de téléphone", field: "telephone" },
      ],
    });
   
  
  }
}

function printTest(){
  table.print();
}
 
/**
 *
 * AUTRE
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
