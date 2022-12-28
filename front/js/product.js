//Ici on veut que le client choisisse obligatoirement une quantité de 1 minimum et 100 maximum
//le client doit aussi choisir obligatoirement une couleur.
//il doit pouvoir passer ca commence, ca doit ce retrouver dans le localStorage.
//Les couleurs et les quantitées doivent s'accumuler si le produit est le meme.


//associer la page aux données de l'api
let url = new URL(window.location.href);        //La propriété window.location.href retourne l'URL complète de la page en cours.
let id = url.searchParams.get("id");            //L'instruction récupère la valeur du paramètre id dans l'objet URL créé précédemment.
console.log(id);

//Variable qui cible l'emplacement de la class item__img pour insérer l'image
let imageKanape = document.querySelector(".item__img");

//Variable qui cible l'emplacement de l'ID pour insérer le titre
let nomProduit = document.getElementById("title");

//Variable qui cible l'emplacement de l'ID pour insérer le prix
let prixProduit = document.getElementById("price");

//Variable qui cible l'emplacement de l'ID pour insérer la description du produit
let descriptionProduit = document.getElementById("description");

//Variable qui cible l'emplacement de l'ID pour insérer les couleurs aux choix
let couleurProduit = document.getElementById("colors");

//Variable qui cible l'emplacement de l'ID du bouton " AJOUTER AU PANIER " 
let boutonPanier = document.getElementById("addToCart");

//Variable qui cible l'emplacement de l'ID pour gérer la quantité choisi du produit
let quantiteProduit = document.getElementById("quantity");

const produit = "http://localhost:3000/api/products/" + id; // creation d'une constante " produit " comprenant :
                                                            // - un string => qui contient l'adresse url du site de l'accueil
                                                            //- une concatenation et la variable ID qui vas cibler l'id des differentes images

fetch (produit)                     //Promesse, avec entre parenthese la variable contenant url de base + id selon l'objet choisi
    .then(res => res.json())        // retour d'une reponse en format Json dans le " then ", quand tout vas bien
    .then (function(data){ 
        produitKanape(data);
        console.log(data);
    })
    .catch(function(err){
        console.log('Une erreur est détectée');
        console.log(err);
    });

function produitKanape(kanape){
    let baliseImage = document.createElement("img");
    baliseImage.src = kanape.imageUrl;
    baliseImage.alt = kanape.altTxt;
    imageKanape.appendChild(baliseImage);

    nomProduit.textContent = kanape.name;
    prixProduit.textContent = kanape.price;
    descriptionProduit.textContent = kanape.description;
    
    for (let couleurs of kanape.colors){
        let optionValue = document.createElement("option");
        optionValue.textContent = couleurs;
        couleurProduit.appendChild(optionValue);
        console.log(couleurs)
    }
};
//Ecouteur d'évènement, qui s'active au clic que le bouton pour ajouter au panier
boutonPanier.addEventListener('click', afficherProduit)
    console.log(boutonPanier, 'Commande validée');


function afficherProduit(){
    let couleurSelect = couleurProduit.value;
    let quantiteSelect = parseInt(quantiteProduit.value);
    // SI la couleur sélectionner est = a rien ou que le produit est < ou = a 0 OU que la quantité est a plus de 100 afficher le message d'alert
    if((couleurSelect === '') || (quantiteSelect <= 0 || quantiteSelect > 100)){
        alert("Choix d'une couleur ou d'une quantitée");
        return;                     // Met fin à la condition, comme un " Break "
    }

    let panierClient = localStorage.getItem("panier");
    let tableau = [];
    if(panierClient){
        tableau = JSON.parse(panierClient);
    }
    for(let compteur of tableau){
        if(compteur.id === id && compteur.Couleur === couleurSelect){
            compteur.Quantite += quantiteSelect;
            if(compteur.Quantite > 100){
                alert("Vous ne pouvez pas choisir plus de 100 articles");
                return;
            }
            localStorage.setItem("panier", JSON.stringify(tableau));
            return true;
        }
    }

    tableau.push({id : id, Couleur : couleurSelect, Quantite : quantiteSelect });
    localStorage.setItem("panier", JSON.stringify(tableau));

}

boutonPanier.addEventListener('click', event => {
    boutonPanier.innerHTML = " Produit ajouté au panier !";
    });