let panierClient = localStorage.getItem("panier");
let tableau = [];

if (panierClient) {
  tableau = JSON.parse(panierClient);
  afficherPanier();
}

function afficherPanier(){
    for(let p of panierClient){
        fetch ("http://localhost:3000/api/products/" + p.id )
    .then(res => res.json())
    .then (data => {

        let para = ""
            para += `
            <article class="cart__item" data-id="${p.id}" data-color="${p.couleur}">
                <div class="cart__item__img">
                  <img src= "${p.imageUrl}" alt="${p.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${p.name}</h2>
                    <p>${p.couleur}</p>
                    <p>${p.price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : ${p.quantite}</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${p.quantite}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
          `
        console.log(para);
        document.getElementById('cart__items').insertAdjacentHTML("beforeend" , para);
    })
    .catch(err => {
        console.log(err);
        console.log("une erreur est survenue")
    })
  
    }
}