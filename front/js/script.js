// Récupération des données produits
fetch("http://localhost:3000/api/products")

    .then(res => {
        if (res.ok) {
            return res.json();
        }
        else {
            console.log(error)
        }
    })

// Intégration des cartes produits dans le HTML
    .then(products => {
        for (let product of products) {
            document.getElementById("items").innerHTML +=
            `<a href="./product.html?id=${product._id}">
            <article>
            <img src=${product.imageUrl} alt=${product.altTxt}>
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
            </article>
            </a>`;
        }
    })
        
    .catch((error) => {
        console.log(error);
    })




