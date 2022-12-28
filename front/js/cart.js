let panierClient = localStorage.getItem("panier");
let tableau = [];
let para = "";
let prixGlobal = 0;
let deleteQuantite = document.querySelectorAll('.deleteItem');

if (panierClient) {
  tableau = JSON.parse(panierClient);
  afficherPanier();
}
async function returnId(id){
  return new Promise((resolve, reject) => {
    fetch (`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then ((data) => { resolve(data)})
    .catch(err => reject("erreur :" + err))
  })
  }

async function afficherPanier(){
  for(let p of tableau){
    let produitID = await returnId(p.id)
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
      prixGlobal += p.Quantite * produitID.price;
  }
  document.getElementById('cart__items').innerHTML = para;
  document.getElementById('totalPrice').innerHTML = prixGlobal;
  let deleteProduit = document.querySelectorAll('.deleteItem');
  for( let supr of deleteProduit){
    supr.addEventListener('click',()=>{
      let article = supr.closest("article");
      let dataId = article.getAttribute('data-id');
      let dataCouleur = article.getAttribute('data-color');
      let memeProduit = tableau.filter((x) => !((x.id===dataId) && (x.Couleur===dataCouleur)));
      localStorage.setItem("panier", JSON.stringify(memeProduit));
      window.location.reload();
  })
  }

  //Fonction ajouter quantité dans le panier
}



