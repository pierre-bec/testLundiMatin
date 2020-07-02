<?php
////////// PARAMS

// Complétez $url avec l'url cible (l'url de la page que vous voulez télécharger)
$url="https://evaluation-technique.lundimatin.biz/api/clients/".$_GET['id'];

// Tableau contenant les options de téléchargement

$postFields=array();

if (isset($_GET['nom'])) {
    $postFields['nom']=$_GET['nom'];
}
if (isset($_GET['email'])) {
    $postFields['email']=$_GET['email'];
}
if (isset($_GET['tel'])) {
    $postFields['tel']=$_GET['tel'];
}
if (isset($_GET['adresse'])) {
    $postFields['adresse']=$_GET['adresse'];
}
if (isset($_GET['code_postal'])) {
    $postFields['code_postal']=$_GET['code_postal'];
}
if (isset($_GET['ville'])) {
    $postFields['ville']=$_GET['ville'];
}

$options=array(
    CURLOPT_URL            => $url, // Url cible (l'url la page que vous voulez télécharger)
    CURLOPT_RETURNTRANSFER => true, // Retourner le contenu téléchargé dans une chaine (au lieu de l'afficher directement)
    CURLOPT_HEADER         => false, // Ne pas inclure l'entête de réponse du serveur dans la chaine retournée
    CURLOPT_CUSTOMREQUEST  => "PUT", // La requête sera de type PUT
    CURLOPT_POSTFIELDS     => json_encode($postFields) // Le tableau associatif contenant les variables envoyées par POST au serveur
);

// Ajout de l'option CURLOPT_HTTPHEADER au tableau contenant les options de téléchargement
$options[CURLOPT_HTTPHEADER]=array(
    "Accept: application/api.rest-v1+json",
    "Content-Type: application/json",
    "Authorization: Basic  ".$_GET['token'],
);

////////// MAIN

// Création d'un nouvelle ressource cURL
$CURL=curl_init();
// Erreur suffisante pour justifier un die()
if(empty($CURL)){die("ERREUR curl_init : Il semble que cURL ne soit pas disponible.");}

// Configuration des options de téléchargement
curl_setopt_array($CURL,$options);

// Exécution de la requête
$content=curl_exec($CURL);            // Le contenu téléchargé est enregistré dans la variable $content. Libre à vous de l'afficher.

echo $content;
// Si il s'est produit une erreur lors du téléchargement
if(curl_errno($CURL)){
// Le message d'erreur correspondant est affiché
    echo "ERREUR curl_exec : ".curl_error($CURL);
}

// Fermeture de la session cURL
curl_close($CURL);

?>


