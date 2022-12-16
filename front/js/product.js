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

fetch (produit) //Promesse, avec entre parenthese la variable contenant url de base + id selon l'objet choisi
    .then(res => res.json()) // retour d'une reponse en format Json dans le " then ", quand tout vas bien
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

boutonPanier.addEventListener('click', () => {
    console.log(boutonPanier, 'Commande validée');

    let Kanape = {"id" : id,
    "quantiteProduit" : quantiteProduit.value,  
    "couleurProduit" : couleurProduit.value,}

    const localKanap = JSON.parse(localStorage.getItem("panier"));
    
    if((Kanape.couleurProduit === "") || (Kanape.quantiteProduit <= 0 || Kanape.quantiteProduit > 100)){
        console.log("est ce que ca fonctionne ?");
    }else{
        
        if(localKanap){
            console.log("oui");
            for(let addPanier = 0 ;  addPanier < localKanap.length ; addPanier++){
                console.log('panier non trouvé')
                if(localKanap[addPanier].id === Kanape.id && localKanap[addPanier].couleurProduit === Kanape.couleurProduit){
                    // localKanap[addPanier].quantiteProduit += Kanape.quantiteProduit;
                    // localStorage.setItem("panier",JSON.stringify(localKanap));
                    console.log("Produit trouvé");

                }
            }
        }else{
            localStorage.setItem("panier" , JSON.stringify(Kanape));
        }
    }
});


