// récuperation du localStorage(panier) et stockage dans une variable
let panierClient = localStorage.getItem("panier");
// creation d'une variable contenant un tableau vide
let tableau = [];
//creation d'une variable vide
let para = "";
//Variable avec le prix total, on part de 0
let prixGlobal = 0;
// variable qui cible l'élément HTML qui sert a supprimer
let deleteQuantite = document.querySelectorAll('.deleteItem');

if (panierClient) {
  tableau = JSON.parse(panierClient);
  afficherPanier();
}
// fonction qui retourne un produit selon son ID
async function returnId(id){
  return new Promise((resolve, reject) => {
    fetch (`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then ((data) => { resolve(data)})
    .catch(err => reject("erreur :" + err))
  })
  }
// p designe les éléments du tableau => id, quantité et couleur // produitID => designe le nom, l'image, le prix etc... 
async function afficherPanier(){
  for(let p of tableau){
    let produitID = await returnId(p.id) // fonction qui retourne un produit selon son ID
          para += `
          <article class="cart__item" data-id="${p.id}" data-color="${p.Couleur}">
              <div class="cart__item__img">
                <img src= "${produitID.imageUrl}" alt="${produitID.altTxt}">
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__description">
                  <h2>${produitID.name}</h2>
                  <p>${p.Couleur}</p>
                  <p>${produitID.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${p.Quantite}">
                  </div>
                  <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                  </div>
                </div>
              </div>
            </article>
        `;
      console.log(para);
      prixGlobal += p.Quantite * produitID.price; // prixGlobal(on part de 0) on y ajoute la quantité multiplié par le prix
  }
  document.getElementById('cart__items').innerHTML = para;
  document.getElementById('totalPrice').innerHTML = prixGlobal;

//Code pour supprimer l'article entier du panier
  let deleteProduit = document.querySelectorAll('.deleteItem'); // On cible la class associé au bouton supprimer
  for( let supr of deleteProduit){
    supr.addEventListener('click',()=>{       //fonction flecher pour supprimer le produit au click sur le bouton
      let article = supr.closest("article");
      let dataId = article.getAttribute('data-id');
      let dataCouleur = article.getAttribute('data-color');
      let memeProduit = tableau.filter((x) => !((x.id === dataId) && (x.Couleur === dataCouleur))); // ! signifie "non", on supprime que celui sur lequel on clique
      localStorage.setItem("panier", JSON.stringify(memeProduit));
      window.location.reload();              // <= a l'éxécution de cette fonction la page est rafraichie afin de supprimer les articles de l'affichage
  })
  }

let addQuantite = document.querySelectorAll('.itemQuantity'); // Cible l'élément ainsi que ca valeur
  for( let add of addQuantite){
    add.addEventListener('click',()=>{
      let article = add.closest("article");
      let dataId = article.getAttribute('data-id');
      let dataCouleur = article.getAttribute('data-color');
      for (let local of tableau){
        if((local.id === dataId) && (local.Couleur === dataCouleur)){
          let newQuantite = parseInt(add.value);
            local.Quantite = newQuantite;
            break; 
        } 
    }
      localStorage.setItem("panier", JSON.stringify(tableau));
      window.location.reload();
  })
  }                                        //On veut que quand on ajoute une quantité a un produit deja existant dans le panie                                               // La quantité s'ajoute et le prix se multiplie
}


// **************** *****************************REGEX **********************************************************

// ***************** ENVOIE DU FORMULAIRE *****************

document.querySelector(".cart__order__form").addEventListener('submit', function(e){

  e.preventDefault();
  // S'assurer qu'il y a au moins un produit au panier
  /* if (tableaupanier.length === 0) {
    alert("Votre panier est vide");
    return false;
  } */

  let contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };

  let error = {
    firstName: document.querySelector("#firstNameErrorMsg"),
    lastName: document.querySelector("#lastNameErrorMsg"),
    address: document.querySelector("#addressErrorMsg"),
    city: document.querySelector("#cityErrorMsg"),
    email: document.querySelector("#emailErrorMsg"),
  };

  const regExPrenomNomVille = (value) => {
    return /^[A-Z][A-Za-z\é\è\ê\ \s-]+$/.test(value);
  };

  const regExAdresse = (value) => {
    return /^[a-zA-Z0-9.,-_ ]{5,50}[ ]{0,2}$/.test(value);
  };

  const regExEmail = (value) => {
    return /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(value);
  };

  // Fonctions de contrôle des champs formulaire:
  function firstNameControl() {
    if (regExPrenomNomVille(contact.firstName)) {
      error.firstName.textContent = "";
      return true;
    } else {
      error.firstName.textContent =
        "Champ Prénom de formulaire invalide, ex: Paul";
      return false;
    }
  }

  function lastNameControl() {
    if (regExPrenomNomVille(contact.lastName)) {
      error.lastName.textContent = "";
      return true;
    } else {
      error.lastName.textContent =
        "Champ Nom de formulaire invalide, ex: Jean";
      return false;
    }
  }

  function addressControl() {
    if (regExAdresse(contact.address)) {
      error.address.textContent = "";
      return true;
    } else {
      error.address.textContent =
        "Champ Adresse de formulaire invalide, ex: 20 rue de la gare";
      return false;
    }
  }

  function cityControl() {
    if (regExPrenomNomVille(contact.city)) {
      error.city.textContent = "";
      return true;
    } else {
      error.city.textContent = "Champ Ville de formulaire invalide";
      return false;
    }
  }

  function mailControl() {
    if (regExEmail(contact.email)) {
      error.email.textContent = "";
      return true;
    } else {
      error.email.textContent =
        "Champ Email de formulaire invalide";
      return false;
    }
  }

  if (
    !firstNameControl() ||
    !lastNameControl() ||
    !addressControl() ||
    !cityControl() ||
    !mailControl()
  ) {
    return false;
  }


  // tableau d'id du tableaupanier
  let products = [];
  for (const i of tableau) {
    products.push(i.id);
  }
  const idForm = {contact, products};

  const option ={
    method: "POST",
    body: JSON.stringify(idForm),
    headers: {
      "Content-Type": "application/json",
    },
  }
  fetch("http://localhost:3000/api/products/order", option)
    .then((response) => {
      if (response.status !== 201) {
        alert(" erreur server");
      }
      return response.json();
    })
    .then((valeur) => {
      const Id = valeur.orderId;
      if (!Id) {
        return false;
      }
      location.href = "confirmation.html?id=" + Id;
    })

})

