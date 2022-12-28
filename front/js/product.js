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

fetch (produit)                                             //Promesse, avec entre parenthese la variable contenant url de base + id selon l'objet choisi
    .then(res => res.json())                                // retour d'une reponse en format Json dans le " then ", quand tout vas bien
    .then (function(data){ 
        produitKanape(data);
        console.log(data);
    })
    .catch(function(err){
        console.log('Une erreur est détectée');
        console.log(err);
    });

    //Function qui permet d'afficher dans le HTML les différentes information de l'image
function produitKanape(kanape){//pourquoi passer un parametre?
    let baliseImage = document.createElement("img");
    baliseImage.src = kanape.imageUrl;
    baliseImage.alt = kanape.altTxt;
    imageKanape.appendChild(baliseImage);
//La variable "nomProduit" contient l'id "title", on y met le parametre "kanape" avec le ciblage "." vers le name
    nomProduit.textContent = kanape.name;
//Idem que pour le nom du produit mais avec le prix
    prixProduit.textContent = kanape.price;
//Idem avec la description
    descriptionProduit.textContent = kanape.description;

// on fait une boucle for pour parcourir les couleurs qui sont dans un tableau
    for (let couleurs of kanape.colors){
        let optionValue = document.createElement("option");
        optionValue.textContent = couleurs;
// dans le html les options sont les enfants de la balise select avec l'id colors(variable couleurProduit)
        couleurProduit.appendChild(optionValue);
        console.log(couleurs)
    }
};
//Ecouteur d'évènement, qui permet d'activé la fonction "afficherProduit", au clic sur le bouton
boutonPanier.addEventListener('click', afficherProduit)
    console.log(boutonPanier, 'Commande validée');


function afficherProduit(){
//couleurSelect est une variable qui contient les valeurs
    let couleurSelect = couleurProduit.value;
    let quantiteSelect = parseInt(quantiteProduit.value);
// SI la couleur sélectionner est strictement = à rien ou que le produit est < ou = a 0 OU que la quantité est a plus de 100 afficher le message d'alert
    if((couleurSelect === '') || (quantiteSelect <= 0 || quantiteSelect > 100)){
        alert("Choix d'une couleur ou d'une quantitée");
        return;                    // Met fin à la condition, comme un " Break "
    }
// Creation d'une variable pour y mettre le localStorage (le panier)
    let panierClient = localStorage.getItem("panier");
// On créer un tableau vide dans lequel on y met la variable contenant le panir en parsé, 
    let tableau = [];
    if(panierClient){
        tableau = JSON.parse(panierClient); // On parse le localStorage dans la variable pour transformer la chaine de caractere en objet
    }
// "compteur" est la variable qui correspond au élément itérable du chapeau
    for(let compteur of tableau){
    //Si deux éléments on le meme id ou la meme couleur alors ajouter (+=) la quantité au produit
        if(compteur.id === id && compteur.Couleur === couleurSelect){
            compteur.Quantite += quantiteSelect;
    // Il faut que la quantité ne soit pas supérieur a 100.
            if(compteur.Quantite > 100){
                alert("Vous ne pouvez pas choisir plus de 100 articles");
                return;
            }
            localStorage.setItem("panier", JSON.stringify(tableau)); // Stringify pour retransformer l'objet en chaine de caractere
            return true;
        }
    }

    tableau.push({id : id, Couleur : couleurSelect, Quantite : quantiteSelect });
    localStorage.setItem("panier", JSON.stringify(tableau));

}

boutonPanier.addEventListener('click', event => {
    boutonPanier.innerHTML = " Produit ajouté au panier !";
    });