//Problématique
//1- récuper les articles sur l'API
//2- construire l'html (voir l'index.html) avec les articles de l'API
//3- injecter l'HTML avec les articles dans le DOM
//  3-1- pointer l'élément 
//  3-2- injecter sur l'élément pointer


fetch ("http://localhost:3000/api/products") //Lien de l'API, envoie une requete de type Get
    .then(res => res.json())
    .then (data => {
        let display = ""
        for (let article of data){

            display += `
            <a href="./product.html?id=${article._id}">
                <article>
                    <img src="${article.imageUrl}" alt="${article.altTxt}">
                    <h3 class="productName">${article.name}</h3>
                    <p class="productDescription">${article.description}</p>
                </article>
            </a>
          `
        }
        console.log(display);
        document.getElementById('items').insertAdjacentHTML("beforeend" , display);
    })
    .catch(err => {
        console.log(err);
        console.log("une erreur est survenue")
    })
  