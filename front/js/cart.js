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

// Variable qui contient tout le formulaire et qui nous permet de ciblé les input grace à leurs name
const form = document.querySelector('.cart__order__form');

const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const adresse = document.getElementById('address');
const ville = document.getElementById('city');
const email = document.getElementById('email');

// ********************* VALIDATION PRENOM *********************

  function validName(firstName){  //"inputName" correspond au "this" dans l'événement d'écoute, qui lui meme correspond a l'input  de l'HTML
    // creation de l'expression réguliere pour validation nom et prenom
    let regExp =  new RegExp(/^[a-zA-Z-]+$/g);
    // On test l'expression réguliere pour le prenom
    let prenom = regExp.test(firstName.value);
    console.log(prenom);
  }

  // ********************* VALIDATION NOM *********************
  function validSecondName(lastName){
    // creation de l'expression réguliere pour validation nom et prenom
    let regExp =  new RegExp(/^[a-zA-Z]+$/g);   
    let nom = regExp.test(lastName.value);
    console.log(nom);
  }
  
  // ********************* VALIDATION ADRESSE *********************
  function validAddress(adresse){
    // creation de l'expression réguliere pour validation nom et prenom
    let regExp =  new RegExp(/^[A-Za-z0-9 \-]*$/g);
    let localisation = regExp.test(adresse.value);
    console.log(localisation);
  }  
  
  // ********************* VALIDATION VILLE *********************
  function validCity(ville){
    // creation de l'expression réguliere pour validation nom et prenom
    let regExp =  new RegExp(/^[A-Za-z \-]*$/g); //Le regex gere les majuscules, minuscules tirets et espaces blanc
    let city = regExp.test(ville.value);
   
    console.log(city);
  }

  // ********************* VALIDATION EMAIL *********************
  function validEmail(email){
    // creation de l'expression réguliere pour validation nom et prenom
    let regExp =  new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    let mail = regExp.test(email.value);
    console.log(mail);
  }

// ***************** ENVOIE DU FORMULAIRE *****************

  form.addEventListener('click', function(){
   const validFirstName = validName(firstName);
   if(validFirstName === false){
    document.getElementById('firstNameErrorMsg').innerHTML= "prenom invalide";
   }else{
    document.getElementById('firstNameErrorMsg').innerHTML= "";
   }
   const validNom = validName(lastName);
   if(validNom === false){
    document.getElementById('lastNameErrorMsg').innerHTML= "nom invalide";
   }else{
    document.getElementById('lastNameErrorMsg').innerHTML= "";
   }
   const validAdresse= validAddress(adresse);
   if(validAdresse === false){
    document.getElementById('addressErrorMsg').innerHTML= "adresse invalide";
   }else{
    document.getElementById('addressErrorMsg').innerHTML= "";
   }
   const vile = validCity(ville);
   if(vile === false){
    document.getElementById('cityErrorMsg').innerHTML= "ville invalide";
   }else{
    document.getElementById('cityErrorMsg').innerHTML= "";
   }

   const mail = validEmail(email);
   if(mail === false){
    document.getElementById('emailErrorMsg').innerHTML= "email invalide";
   }else{
    document.getElementById('emailErrorMsg').innerHTML= "";
   }

   if(validFirstName === false || validNom === false || validAdresse === false || adresse.value === '' || vile === false || mail === false){
    return;
   }

    let tableauForm = { 
      "prenom": firstName.value,
      "nom" : lastName.value,
      "adresse": address.value,
      "ville": city.value,
      "mail": email.value,
    };
  
    let tableauID = [];
  
    for (i of tableau){
      tableauID.push(i.id);
    }
  
    let idForm = {tableauForm, tableauID};
    console.log(idForm);
  
    const methodEnvoi = {
      method : 'POST',
      body : JSON.stringify(idForm),
    } 
    fetch ("http://localhost:3000/api/products/order", methodEnvoi)
    .then((res) => res.json())
    .then (function(tableau){
      localStorage.setItem("orderId",tableau.orderId);
      // window.location.href = "confirmation.html?id="+tableau.orderId;
    })  
    console.log(tableau.orderId);
    console.log("formulaire envoyé")
  // }
});

