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
  }                                               //On veut que quand on ajoute une quantité a un produit deja existant dans le panie                                               // La quantité s'ajoute et le prix se multiplie
}


// Création du regexp 
//on place la valeur des inputs du formulaire dans des variables
  let prenom = document.getElementById('firstName').value;
  let nom = document.getElementById('lastName').value;
  let adresse = document.getElementById('address').value;
  let ville = document.getElementById('city').value;
  let mail = document.getElementById('email').value;

  // Variable qui contient tout le formulaire 
  let form = document.querySelector('.cart__order__form');

  console.log(form.firstName);
  // Ecouter la modification de l'email
  form.firstName.addEventListener("change", function(){
    validName(this)
  });

  function validName(inputName){
    let nameRegExp =  new RegExp('^[a-zA-Z]+$') 
    nameRegExp.test(Nicolas);                   //^ début de la chaine de caractere
  }                                             // ce qui se trouve entre crochet signifie qu'on peut utilisé les lettres en minuscule et majuscule de A a Z 
                                                // + signifie que les lettres peuvent etre utilisé plusieurs fois
                                                //$ fin de la chaine

                                               
  //Bouton pour envoyer le formulaire
  let commander = document.getElementById('order')

  //regex nom prenom, contient minuscule et majuscule uniquement
  //regex adresse contient minuscule majuscule chiffre 1 a 9
  //ville contient majuscule et minuscule uniquement
  //regex mail contient minuscule majuscule chiffre et 1 . et 1 @


