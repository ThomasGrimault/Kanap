// Récupération du productId dans l'URL de la page
const search = window.location.search
console.log("search = " + search)
const urlParams = new URLSearchParams(search)
const productId = urlParams.get("id")
console.log("productId = " + productId)

// Récupération des détails du produit dans l'API
fetch("http://localhost:3000/api/products/" + productId)

    .then(res => {
        if (res.ok) {
            return res.json();
        }
        else {
            console.log(error)
        }
    })

    // Affichage des détails du produit
    .then(function ProductDetails(product) {
        console.log(product)
        document.querySelector(".item__img").innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`
        document.getElementById("title").innerText = product.name
        document.getElementById("price").innerText = product.price
        document.getElementById("description").innerText = product.description

    // Affichage dans le menu déroulant des couleurs disponibles pour le produit
    const colorSelect = document.querySelector("select")
        for (let i in product.colors) {
            colorSelect.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`
        }
    })

    .catch((error) => {
        console.log(error)
        })

// Ajout des produits dans le panier

const boutonAjouter = document.getElementById("addToCart")

boutonAjouter.addEventListener("click", function(ajoutPanier) {

    // Récupération des données dans les inputs avec transformation de la valeur quantity en nombre
    const color = document.getElementById("colors")
    const selectedColor = color.value
    console.log("selectedColor = " + selectedColor)
    const selectedQuantity = Number(document.getElementById("quantity").value)
    console.log("selectedQuantity = " + selectedQuantity)

    // Contrôle des choix avant ajout au panier et affichage d'un message d'erreur
    if (selectedColor == "" || selectedQuantity == 0 || selectedQuantity > 100) {
        alert("Couleur ou nombre d'articles non renseignés")
    }
    else {
        // Création de l'objet à ajouter au panier
        const selectedProduct = {
            id: productId,
            quantity: selectedQuantity,
            color: selectedColor
        }
        console.log(selectedProduct)
       
        // Récuparation des données du local storage
        const panier = window.localStorage.getItem("panier")
        console.log("panier = " + panier)

        // Enregistrement du panier sur le local storage s'il n'y a pas encore de panier enregistré
        if (panier === null) {
            const panierJs = [selectedProduct]
            console.log(panierJs)
            const panierJson = JSON.stringify(panierJs)
            window.localStorage.setItem("panier", panierJson)
        }

        // Enregistrement du panier sur le local storage s'il y a déjà un panier enregistré
        else {
            const panierJs = JSON.parse(panier)
            console.log(panierJs)
            const recherchePanier = panierJs.find(element => element.id == selectedProduct.id && element.color == selectedProduct.color)            
            console.log(recherchePanier)

            if (recherchePanier) {
                if (recherchePanier.quantity + selectedProduct.quantity <= 100) {
                    recherchePanier.quantity += selectedProduct.quantity
                    console.log(panierJs)
                }
                else {
                    recherchePanier.quantity = 100
                    console.log(panierJs)
                }
            }
            else{
                panierJs.push(selectedProduct)
                console.log(panierJs)
            }

            const panierJson = JSON.stringify(panierJs)
            window.localStorage.setItem("panier", panierJson)
        }
    }
})