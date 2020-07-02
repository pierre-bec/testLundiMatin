<?php
////////// PARAMS

// Complétez $url avec l'url cible (l'url de la page que vous voulez télécharger)
$url="https://evaluation-technique.lundimatin.biz/api/clients?fields=nom,adresse,ville,tel,email,code_postal";

// Tableau contenant les options de téléchargement
$options=array(
    CURLOPT_URL            => $url, // Url cible (l'url la page que vous voulez télécharger)
    CURLOPT_RETURNTRANSFER => true, // Retourner le contenu téléchargé dans une chaine (au lieu de l'afficher directement)
    CURLOPT_HEADER         => false, // Ne pas inclure l'entête de réponse du serveur dans la chaine retournée
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