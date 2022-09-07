$(window).on("load", function() {
    //prépare ajax
    let ajax = new XMLHttpRequest();
    let methode = "GET";
    let url = "php/getFile.php"
    let asynchronous = true;
    ajax.open(methode, url, asynchronous);

    ajax.send();
    let data;
    ajax.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {


            let data = JSON.parse(this.responseText);
            let files = ` <ul id="listview" data-role="listview" data-view="list" data-select-node="true">
            <ListView ScrollViewer.HorizontalScrollBarVisibility="Auto" ScrollViewer.HorizontalScrollMode="Enabled" >`;
            for (let i = 0; i < data.length; i++) {
                let file = data[i]
                let nom = file['file']
                let ext = "." + file['ext']
                let nudeExt = file['ext']

                if (nom == "" && ext == ".") {
                    files += `    <li id="racine" onclick="selectedFile(this)" data-icon="<span class='mif-keyboard-return'>" data-caption="${/data/}"></li>`
                } else if (nom && ext == ".null") {
                    files += `    <li onclick="selectedFile(this)" ondblclick="enterFolder()" class="folder" type="folder" data-icon="<span class='mif-folder'>" data-caption="${nom}"></li>`
                } else if (nom != ext && ext != ".") {

                    files += `<li 
                    onclick="selectedFile(this)"
                    type="file"
                    id="${nom +""+ext}"
                    data-icon="<span class='mif-document-file-${nudeExt.toLowerCase()}'>"
                    data-caption="${nom}"></li>`
                }

            }
            files += `   </ul>`;
            document.querySelector("#files").innerHTML = files;


        }

    }


})

async function addFile() {
    //prépare ajax
    let formData = new FormData();
    formData.append("file", fileToUpload.files[0]);
    console.log(formData)
    if (formData == null) {

    } {

        let ajax = new XMLHttpRequest();
        let methode = "POST";
        let url = "php/addFile.php"
        let asynchronous = true;
        ajax.open(methode, url, asynchronous);
        let formData = new FormData();
        formData.append("file", fileToUpload.files[0]);
        ajax.send(formData);

        ajax.onreadystatechange = function() {

            if (this.readyState == 4 && this.status == 200) {

                let result = this.responseText;

                if (result == "0") {
                    Swal.fire(
                        'Aîeeee!',
                        `Le fichier existe déjà`,
                        'error'
                    )
                } else if (result == "1") {
                    Swal.fire(
                        'Aîeeee!',
                        `Le fichier est trop grand`,
                        'error'
                    )
                } else if (result == "2") {

                    Swal.fire(
                        'Aîeeee!',
                        `Le fichier existe déjà`,
                        'error'
                    )
                } else if (result == "3") {


                    Swal.fire({
                        title: 'C\'est bon!',
                        text: `Le fichier a bien été enregistré`,
                        icon: 'success'
                    }).then((result) => {
                        location.reload();
                    })


                } else if (result == "4") {


                    Swal.fire(
                        'Erreur',
                        `Il y a eu une erreur!!`,
                        'error'
                    )

                }
            }
        }
    }
}


let selectedFiles = null;


function selectedFile(selectedeNode) {

    let file = selectedeNode;

    selectedFiles = file.id
    let elementClick = document.querySelector("#downloadFile")
    let download = document.querySelector("#download");
    let del = document.querySelector("#delete");


    if (file.type == "file") {
        elementClick.innerHTML = ""
        del.removeAttribute('disabled');
        download.removeAttribute('disabled');
        elementClick.innerHTML += `<a id="downloadfile" href="/data/${selectedFiles}" download></a> <a id="deleteFile" class="/data/${selectedFiles}"   ></a>`


    } else {
        del.disabled = true;
        elementClick.innerHTML = ""
        download.disabled = true;
    }




}

function filePicker() {
    let elementClick = document.querySelector("#fileToUpload");
    elementClick.click();

}

function getSelectedfile() {
    let elementClick = document.querySelector("#fileToUpload");
    let file = elementClick.files[0];

    let pickedFile = document.querySelector("#listview");

    pickedFile.innerHTML += `<li onclick="selectedFile(this)"
    data-icon="<span class='mif-insert-drive-file fg-pink'>"  data-caption="${file.name}" class="node"><label class="checkbox transition-on"><input type="checkbox" data-role="checkbox" data-style="1" data-role-checkbox="true" class=""><span class="check"></span><span class="caption"></span></label><span class="icon"><span class="mif-insert-drive-file fg-pink"></span></span><div class="data"><div class="caption">${file.name}</div></div></li>`


}

function download() {
    let elementClick = document.querySelector("#downloadfile");
    elementClick.click();
}

function deleteFile() {
    let file = document.querySelector("#deleteFile").className;
    console.log(file)
    let ajax = new XMLHttpRequest();
    let methode = "POST";
    let url = "php/deleteFile.php"
    let asynchronous = true;
    ajax.open(methode, url, asynchronous);

    ajax.send(file);

    ajax.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {


            let result = this.responseText;

            if (result == 2) {
                Swal.fire(
                    'C\'est bon!',
                    `Le fichier a bien été supprimmé`,
                    'success'
                ).then((result) => {
                    location.reload();
                })


            } else if (result == 1) {
                Swal.fire(
                    'Aîeeee!',
                    `Le fichier n'a pas pu être supprimmé`,
                    'error'
                )
            }

        }
    }


}

function enterFolder() {
    let test = document.querySelector('.folder');

}

function createFolder() {
    let racine = document.querySelector("#racine").dataset.caption;
    console.log(racine)
    Swal.fire({
        title: 'Inscris le nom du fichier !',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Créer un dossier',

    }).then((result) => {

        if (result.value != null && result.value != "") {

            let fileName = racine + "" + result.value

            let ajax = new XMLHttpRequest();
            let methode = "POST";
            let url = "php/createFolder.php"
            let asynchronous = true;
            ajax.open(methode, url, asynchronous);

            ajax.send(fileName);

            ajax.onreadystatechange = function() {

                if (this.readyState == 4 && this.status == 200) {


                    let result = this.responseText;

                    if (result == 2) {
                        Swal.fire(
                            'C\'est bon!',
                            `Le dossier a bien été créé`,
                            'success'
                        ).then((result) => {
                            location.reload;
                        })


                    } else if (result == 1) {
                        Swal.fire(
                            'Aîeeee!',
                            `Le dossier n'as pas pus être créé`,
                            'error'
                        )
                    } else if (result == 0) {
                        Swal.fire(
                            'Aîeeee!',
                            `Le dossier existe déjà `,
                            'error'
                        )
                    }
                }
            }
        }
    })

}