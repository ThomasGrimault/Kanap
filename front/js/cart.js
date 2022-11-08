// Récuparation du panier sur le local storage
const panier = window.localStorage.getItem("panier")
console.log("Panier JSON = " + panier)
let panierJs = JSON.parse(panier)
console.log(panierJs)

// Création des variables quantité totale et prix total
let quantiteTotale = 0
let prixTotal = 0

// Récupérataion de toutes les données des produits
fetch("http://localhost:3000/api/products")

    .then(res => {
        if (res.ok) {
            return res.json();
        }
        else {
            console.log(error)
        }
    })

    // Intégration du panier dans le HTML et affichage du nombre total d'articles et du prix total
    .then(function(products) {
        if (panierJs != null) {
            for (let article of panierJs) {
                const product = products.find(element => element._id == article.id)
                console.log(product, article)
                document.getElementById("cart__items").innerHTML +=
                `<article class="cart__item" data-id=${article.id} data-color=${article.color}>
                <div class="cart__item__img">
                  <img src=${product.imageUrl} alt=${product.altTxt}>
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>${article.color}</p>
                    <p>${product.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${article.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
                </article>`
                
                // Mise à jour du nombre total d'articles et du prix total
                quantiteTotale += article.quantity
                prixTotal += article.quantity * product.price
            }

            // Affichage du nombre total d'articles et du prix total
            document.getElementById("totalQuantity").innerText = quantiteTotale
            document.getElementById("totalPrice").innerText = prixTotal
        }
    })

    // Modification de la quantité d'une ligne du panier
    .then(function () {
        let quantite = document.querySelectorAll(".itemQuantity")
        console.log(quantite)
                
        for (let i=0; i < quantite.length; i++) {     
            quantite[i].addEventListener("change", function () {
                const nouvelleQuantite = Number(quantite[i].value)
                console.log(nouvelleQuantite)

                // Extraction de l'article à modifier
                const articleModifie = quantite[i].closest("article")
                console.log(articleModifie)

                // Récupération des data-id et data-color de l'article à supprimer
                const dataId = articleModifie.dataset.id
                console.log(dataId)
                const dataColor = articleModifie.dataset.color
                console.log(dataColor)

                // Recherche de l'arcticle à modifier dans le panierJs
                const recherche = panierJs.find(element => element.id == dataId && element.color == dataColor)
                console.log(recherche)

                // Modification de l'article dans le panierJs
                recherche.quantity = nouvelleQuantite
                console.log(panierJs)

                // Mise à jour du panier dans le local storage
                const panierJson = JSON.stringify(panierJs)
                window.localStorage.setItem("panier", panierJson)

                // Rechargement de la page avec le panier mis à jour
                location.reload()
            })
        }
    })    
  
    // Suppression d'une ligne du panier
    .then(function () {
        const boutonSupprimer = document.querySelectorAll(".deleteItem")
        
        for (let i=0; i < boutonSupprimer.length; i++) {
            boutonSupprimer[i].addEventListener("click", function () {
            
                // Extraction de l'arcticle à supprimer
                const articleSupprime = boutonSupprimer[i].closest("article")
                console.log(articleSupprime)
                
                // Récupération des data-id et data-color de l'article à supprimer
                const dataId = articleSupprime.dataset.id
                console.log(dataId)
                const dataColor = articleSupprime.dataset.color
                console.log(dataColor)
                
                // Recherche de l'arcticle à supprimer dans le panierJs
                const recherche = panierJs.findIndex(element => element.id == dataId && element.color == dataColor)
                console.log(recherche)

                // Suppression de l'article dans le panierJs
                panierJs.splice(recherche, 1)

                // Mise à jour du panier dans le local storage
                const panierJson = JSON.stringify(panierJs)
                window.localStorage.setItem("panier", panierJson)

                // Rechargement de la page avec le panier mis à jour
                location.reload()
            })   
        }
    })          

    .then (function() {
        // Création des regex pour le formulaire
        const caracteresAlphabetiques = /[A-Za-zçàéèêëîïôöùûü\-' ]/g
        const caracteresAlphanumeriques = /[\wçàéèêëîïôùû\-' ]/g
        const caracteresEmail = /^(?:[\w\.-])+(?:@{1})+(?:[\w\.-])+(?:\.{1})+(?:[a-zA-Z\.]{2,6})$/g

        const prenom = document.getElementById("firstName")
        const nom = document.getElementById("lastName")
        const adresse = document.getElementById("address")
        const ville = document.getElementById("city")
        const email = document.getElementById("email")
        
        // Contrôle des données renseignées dans le formulaire
        prenom.addEventListener("input", function() {
            let testPrenom = caracteresAlphabetiques.test(prenom.value)
            console.log(testPrenom)
            if (!testPrenom) {
                document.getElementById("firstNameErrorMsg").innerText = "Caractère(s) non autorisé(s)"
            }
            else {
                document.getElementById("firstNameErrorMsg").innerText = ""
            }
        })
        
        nom.addEventListener("input", function() {
            let testNom = caracteresAlphabetiques.test(nom.value)
            console.log(testNom)
            if (!testNom) {
                document.getElementById("lastNameErrorMsg").innerText = "Caractère(s) non autorisé(s)"
            }
            else {
                document.getElementById("lastNameErrorMsg").innerText = ""
            }
        })  
        
        adresse.addEventListener("input", function() {
            let testAdresse = caracteresAlphabetiques.test(adresse.value)
            console.log(testAdresse)
            if (!testAdresse) {
                document.getElementById("addressErrorMsg").innerText = "Caractère(s) non autorisé(s)"
            }
            else {
                document.getElementById("addressErrorMsg").innerText = ""
            }
        })
        
        city.addEventListener("input", function() {
            let testVille = caracteresAlphabetiques.test(adresse.value)
            console.log(testVille)
            if (!testVille) {
                document.getElementById("cityErrorMsg").innerText = "Caractère(s) non autorisé(s)"
            }
            else {
                document.getElementById("cityErrorMsg").innerText = ""
            }
        })
         
        email.addEventListener("input", function() {
            let testEmail = caracteresAlphabetiques.test(email.value)
            console.log(testEmail)
            if (!testEmail) {
                document.getElementById("emailErrorMsg").innerText = "Adresse email non conforme"
            }
            else {
                document.getElementById("emailErrorMsg").innerText = ""
            }
        })

        // Création et envoi du formulaire de commande
        
        const boutonCommander = document.getElementById("order")
        
        boutonCommander.addEventListener("click", function(e) {
            e.preventDefault()
            
            let testPrenom = caracteresAlphabetiques.test(prenom.value)
            let testNom = caracteresAlphabetiques.test(nom.value)
            let testAdresse = caracteresAlphabetiques.test(adresse.value)
            let testVille = caracteresAlphabetiques.test(adresse.value)
            let testEmail = caracteresAlphabetiques.test(email.value)

            // Si le formulaire est incomplet ou le panier vide 
            if (panierJs == null || panierJs == "") {
                alert("Nous ne pouvons valider votre commande car votre panier ne contient aucun article.")
            }

            if (prenom.value == "" || nom.value == "" || adresse.value == "" || ville.value == "" || email.value == "" || !testPrenom || !testNom || !testAdresse || !testVille || !testEmail) {
                alert("Nous ne pouvons valider votre commande car le formulaire est incomplet ou contient des caractères non autorisés.")
            }
              
            // Si le formulaire est complet et le panier contient au moins un article
            if (prenom.value != "" && nom.value != "" && adresse.value != "" && ville.value != "" && email.value != "" && testPrenom && testNom && testAdresse && testVille && testEmail && panierJs != null) {
                
                // Création du tableau reprenant la liste des ID des articles
                let products = []
                for (let article of panierJs) {
                    products.push(article.id)
                }

                // Création de la commande complète à envoyer à l'API
                const commande = {
                    contact : {
                        firstName: prenom.value,
                        lastName: nom.value,
                        address: adresse.value,
                        city: ville.value,
                        email: email.value
                    },
                   products: products
                }
                console.log(commande)

                // envoi de la commande
                fetch("http://localhost:3000/api/products/order", {
                    method: "POST",
                    headers: {
                      "Accept": "application/json",
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify(commande)
                })

                // Récupération du numéro de commande
                .then(res => {
                    if (res.ok) {
                    return res.json()
                    }
                    else {
                        console.log(error)
                    }
                })

                // Suppression du panier dans le local storage et ouverture de la page confirmation
                .then (function(res) {
                    window.localStorage.clear()
                    const orderId = res.orderId
                    document.location.href = `./confirmation.html?id=${orderId}`
                })
            }               
        })
    })