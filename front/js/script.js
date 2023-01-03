//Creation d'une promesse pour récuperer l'API et l'injecter dans le DOM en HTML


fetch ("http://localhost:3000/api/products") //Lien de l'API, envoie une requete de type Get
    .then(res => res.json())                 // Quand la réponse est positif, on vas dans le 'then'
    .then (data => {                        // utilisation d'une fonction fléchée
        let display = ""
        for (let article of data){  // Une boucle for pour parcourir un tableau, chaque élément du tableau "data" est assigné 
                                    //d'une variable nommée 'article'.

            display += `
            <a href="./product.html?id=${article._id}">
                <article>
                    <img src="${article.imageUrl}" alt="${article.altTxt}">     
                    <h3 class="productName">${article.name}</h3>
                    <p class="productDescription">${article.description}</p>
                </article>
            </a>
          `
        }                                       // on pointe les éléments en leur assignant la variable choisi pour les énumérés
                                                // ici, 'article' et on les pointes avec un '.' suivie de ce que ca doit pointé
        console.log(display);                   // On log la variable pour vérifier si tout fonctionne.         
        document.getElementById('items').insertAdjacentHTML("beforeend" , display);  
    })          // On injecte la variable dans l'HTML sur l'ID 'item', "beforeend" signifie qu'on injecte à l'intérieur de l'element , après son dernier enfant

    .catch(err => {
        console.log(err);                           //Le catch correspond à la reponse négatif de l'API
        console.log("une erreur est survenue")
    })