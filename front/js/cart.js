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
  let form = document.querySelector('.cart__order__form');


// *********** CREATION D'EVENEMENT D'ECOUTE AVEC DES FONCTION CALLBACK*************
  // Ecouter la modification du prenom au "changement" quand l'input n'as plus le focus
  form.firstName.addEventListener("change", function(){
    validName(this)          // le (this) en parametre cible dans l'HTML l'input avec le name "firstName"
  });

  // Ecouter la modification sur l'input du nom
  form.lastName.addEventListener("change", function(){
    validSecondName(this)                           
  });

  // Ecouter la modification sur l'input de l'adresse
  form.address.addEventListener("change", function(){
    validAddress(this)                          
  });

  // Ecouter la modification sur l'input de la ville
  form.city.addEventListener("change", function(){
    validCity(this)                           
  });

  // Ecouter la modification sur l'input de l'email
  form.email.addEventListener("change", function(){
    validEmail(this)                          
  });
  // *********************** FIN DES ECOUTES**************************************************

// ********************* VALIDATION PRENOM *********************
  function validName(inputName){  //"inputName" correspond au "this" dans l'événement d'écoute, qui lui meme correspond a l'input  de l'HTML
    // creation de l'expression réguliere pour validation nom et prenom
    let regExp =  new RegExp(/^[a-zA-Z-]+$/g);
    
    // On test l'expression réguliere pour le prenom
    let prenom = regExp.test(inputName.value);
    // récupération de la balise <p> apres l'input pour afficher le message
    let p = inputName.nextElementSibling;
//SI prenom est true, prenom validé, SINON, prenom incorrect
    if(prenom){
      p.innerHTML = 'prenom valide'
    }else{
      p.innerHTML = 'prenom incorrect'
    }
    console.log(prenom);
  }


  // ********************* VALIDATION NOM *********************
  function validSecondName(inputLastName){
    // creation de l'expression réguliere pour validation nom et prenom
    let regExp =  new RegExp(/^[a-zA-Z]+$/g);
     
    let nom = regExp.test(inputLastName.value);
    // récupération de la balise <p> apres l'input pour afficher le message
    let p = inputLastName.nextElementSibling;
    if(nom){
      p.innerHTML = 'nom valide'
    }else{
      p.innerHTML = 'nom incorrect'
    }
    console.log(nom);
  }
  
  // ********************* VALIDATION ADRESSE *********************
  function validAddress(inputAdress){
    // creation de l'expression réguliere pour validation nom et prenom
    let regExp =  new RegExp(/^[A-Za-z0-9 \-]*$/g);
    
    let adresse = regExp.test(inputAdress.value);
    // récupération de la balise <p> apres l'input pour afficher le message
    let p = inputAdress.nextElementSibling;
    if(adresse){
      p.innerHTML = 'adresse valide'
    }else{
      p.innerHTML = 'adresse incorrect'
    }
    console.log(adresse);
  }  
  
  // ********************* VALIDATION VILLE *********************
  function validCity(inputCity){
    // creation de l'expression réguliere pour validation nom et prenom
    let regExp =  new RegExp(/^[A-Za-z \-]*$/g); //Le regex gere les majuscules, minuscules tirets et espaces blanc
    
    let ville = regExp.test(inputCity.value);
    // récupération de la balise <p> apres l'input pour afficher le message
    let p = inputCity.nextElementSibling;
    if(ville){
      p.innerHTML = 'ville valide'
    }else{
      p.innerHTML = 'ville incorrect'
    }
    console.log(ville);
  }

  // ********************* VALIDATION EMAIL *********************
  function validEmail(inputEmail){
    // creation de l'expression réguliere pour validation nom et prenom
    let regExp =  new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    
    let email = regExp.test(inputEmail.value);
    // récupération de la balise <p> apres l'input pour afficher le message
    let p = inputEmail.nextElementSibling;

    if(email){ 
      p.innerHTML = 'email valide'
    }else{
      p.innerHTML = 'email incorrect'
    }
    console.log(email);
  }

// ***************** ENVOIE DU FORMULAIRE *****************

form.addEventListener('submit', function(e){
  if (form === "false"){  //Si dans le formulaire il y a un " false " alors, 
    e.preventDefault(); //On stop l'envoie du formulaire
  } else{             // Sinon on envoie  le formulaire.
    form.submit();
    console.log("formulaire envoyé")
  }
})