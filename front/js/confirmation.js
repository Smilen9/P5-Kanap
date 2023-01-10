let url = new URL(window.location.href);        //La propriété window.location.href retourne l'URL complète de la page en cours.
let id = url.searchParams.get("id");            //L'instruction récupère la valeur du paramètre id dans l'objet URL créé précédemment.
console.log(id);
