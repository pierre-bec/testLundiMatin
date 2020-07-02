let auth = {


    newAuth: function () {
        let url = "/testLundiMatin/src/php/auth.php";
        let requete = new XMLHttpRequest();
        requete.open("GET", url, true);
        requete.addEventListener("load", function () {
            auth.callbackAuth(requete);
        });
        requete.send(null);
    },
    callbackAuth: function (requete) {
        console.log(requete);
        let dataAuth = JSON.parse(requete.responseText);
        this.token = dataAuth.datas.token;
        auth.getAllClients();
    },

    getAllClients: function () {
        let token = ":" + this.token;
        let url = "/testLundiMatin/src/php/getClients.php?token=" + btoa(token);
        let requete = new XMLHttpRequest();
        requete.open("GET", url, true);
        requete.addEventListener("load", function () {
            auth.callbackGetClients(requete);
        });
        requete.send(null);
    },

    callbackGetClients: function (requete) {
        let dataClients = JSON.parse(requete.responseText);
        this.listeClients = dataClients.datas;
        afficherClients(this.listeClients);
    },

    getClient: function (id) {
        let token = ":" + this.token;
        let url = "/testLundiMatin/src/php/getClient.php?token=" + btoa(token) + "&id=" + id.id;
        let requete = new XMLHttpRequest();
        requete.open("GET", url, true);
        requete.addEventListener("load", function () {
            auth.callbackGetClient(requete);
        });
        requete.send(null);
    },

    callbackGetClient: function (requete) {
        let dataClient = JSON.parse(requete.responseText);
    },

    editClient: function (id, param) {
        let token = ":" + this.token;
        let url = "/testLundiMatin/src/php/editClient.php?token=" + btoa(token) + "&id=" + id;
        if (param['nom'] != null) {
            url += "&nom=" + param['nom'];
        }
        if (param['email'] != null) {
            url += "&email=" + param['email'];
        }
        if (param['tel'] != null) {
            url += "&tel=" + param['tel'];
        }
        if (param['adresse'] != null) {
            url += "&adresse=" + param['adresse'];
        }
        if (param['code_postal'] != null) {
            url += "&code_postal=" + param['code_postal'];
        }
        if (param['ville'] != null) {
            url += "&ville=" + param['ville'];
        }
        console.log(url);
        let requete = new XMLHttpRequest();
        requete.open("GET", url, true);
        requete.addEventListener("load", function () {
            auth.callbackEditClient(requete);
        });
        requete.send(null);
    },

    callbackEditClient: function (requete) {
        let dataClient = JSON.parse(requete.responseText);
        console.log(dataClient);
    },

    searchClient: function (nom) {
        this.listeClients = [];

        let token = ":" + this.token;
        let url = "/testLundiMatin/src/php/searchClient.php?token=" + btoa(token) + "&nom=" + nom;
        let requete = new XMLHttpRequest();
        requete.open("GET", url, true);
        requete.addEventListener("load", function () {
            auth.callbackSearch(requete);
        });
        requete.send(null);
    },

    callbackSearch: function (requete) {
        let dataClients = JSON.parse(requete.responseText);
        this.listeClients = dataClients.datas;
        afficherClients(this.listeClients);
    },
};

auth.newAuth();
document.getElementById("searchbtn").addEventListener("click", function (ev) {
    auth.searchClient(document.getElementById("searchbar").value);
});
document.getElementById('cancel').addEventListener("click", clickCancel);
document.getElementById("edit").addEventListener("click", clickBtnEdit);
document.getElementById('save').addEventListener("click", clickSave);

function afficherClients(clients) {
    viderTableau();
    for (let i = 0; i < clients.length; i++) {
        if (clients[i] != null) {
            let section = document.createElement("section");
            let divN = document.createElement('div');
            divN.classList.add('column');
            divN.innerHTML = clients[i].nom;
            let divA = document.createElement('div');
            divA.classList.add('column');
            divA.innerHTML = clients[i].adresse;
            let divV = document.createElement('div');
            divV.classList.add('column');
            divV.innerHTML = clients[i].ville;
            let divT = document.createElement('div');
            divT.classList.add('column');
            divT.innerHTML = clients[i].tel;
            let btnDetails = document.createElement("a");
            btnDetails.classList.add('waves-effect');
            btnDetails.classList.add('waves-light');
            btnDetails.classList.add('btn-small');
            btnDetails.innerHTML = "Voir";
            btnDetails.value = i;
            btnDetails.addEventListener("click", function () {
                clickBtnDetails(i);
            });
            let icon = document.createElement("i");
            icon.classList.add('material-icons');
            icon.classList.add('left');
            icon.innerHTML = "search";
            btnDetails.appendChild(icon);
            divT.appendChild(btnDetails);
            section.appendChild(divN);
            section.appendChild(divA);
            section.appendChild(divV);
            section.appendChild(divT);
            document.getElementById("tableauClients").appendChild(section);
        }

    }
}

function viderTableau() {
    let tableau = document.getElementById("tableauClients");
    while (tableau.children.length > 1) {
        tableau.removeChild(tableau.children[1]);
    }
}

function clickBtnDetails(i) {
    document.getElementById("recherche").style.display = "none";
    document.getElementById('tableau').style.display = "none";
    document.getElementById('banniere').style.display = "none";
    document.getElementById('banniere-edit').style.display = "block";
    document.getElementById('nomClient').innerHTML = auth.listeClients[i].nom;
    document.getElementById('nomCli').innerHTML = auth.listeClients[i].nom;
    document.getElementById('telCli').innerHTML = auth.listeClients[i].tel;
    document.getElementById('emailCli').innerHTML = auth.listeClients[i].email;
    document.getElementById('adresseCli').innerHTML = auth.listeClients[i].adresse;
    document.getElementById('codePostalCli').innerHTML = auth.listeClients[i].code_postal;
    document.getElementById('villeCli').innerHTML = auth.listeClients[i].ville;
    document.getElementById("edit").value=i;
    document.getElementById('nomCli').style.display="flex";
    document.getElementById('telCli').style.display="flex";
    document.getElementById('emailCli').style.display="flex";
    document.getElementById('adresseCli').style.display="flex";
    document.getElementById('codePostalCli').style.display="flex";
    document.getElementById('villeCli').style.display="flex";

}

function clickBtnEdit() {
    document.getElementById('nomCli').style.display="none";
    document.getElementById('telCli').style.display="none";
    document.getElementById('emailCli').style.display="none";
    document.getElementById('adresseCli').style.display="none";
    document.getElementById('codePostalCli').style.display="none";
    document.getElementById('villeCli').style.display="none";
    document.getElementById("btn-cancel-save").style.display="flex";
    document.getElementById("nom").style.display="flex";
    console.log(document.getElementById("edit").value);
    console.log(auth.listeClients[document.getElementById("edit").value].nom);
    document.getElementById("nomI").value=auth.listeClients[document.getElementById("edit").value].nom;
    document.getElementById("tel").style.display="flex";
    document.getElementById("telI").value=auth.listeClients[document.getElementById("edit").value].tel;
    document.getElementById("email").style.display="flex";
    document.getElementById("emailI").value=auth.listeClients[document.getElementById("edit").value].email;
    document.getElementById("adresse").style.display="flex";
    document.getElementById("adresseI").value=auth.listeClients[document.getElementById("edit").value].adresse;
    document.getElementById("codePostal").style.display="flex";
    document.getElementById("codePostalI").value=auth.listeClients[document.getElementById("edit").value].code_postal;
    document.getElementById("ville").style.display="flex";
    document.getElementById("villeI").value=auth.listeClients[document.getElementById("edit").value].ville;
}

function clickCancel() {
    document.getElementById("recherche").style.display = "block";
    document.getElementById('tableau').style.display = "block";
    document.getElementById('banniere').style.display = "block";
    document.getElementById('banniere-edit').style.display = "none";
    document.getElementById("btn-cancel-save").style.display="none";
    document.getElementById("nom").style.display="none";
    document.getElementById("tel").style.display="none";
    document.getElementById("email").style.display="none";
    document.getElementById("adresse").style.display="none";
    document.getElementById("codePostal").style.display="none";
    document.getElementById("ville").style.display="none";
}

function clickSave() {
    let param=[];
    param['nom'] = document.getElementById("nomI").value;
    param['tel'] = document.getElementById("telI").value;
    param['email'] = document.getElementById("emailI").value;
    param['adresse'] = document.getElementById("adresseI").value;
    param['codePostal'] = document.getElementById("codePostalI").value;
    param['ville'] = document.getElementById("villeI").value;
    console.log(auth.listeClients[document.getElementById("edit").value].id);
    auth.editClient(auth.listeClients[document.getElementById("edit").value].id,param);
    clickCancel();
    auth.newAuth();
}






