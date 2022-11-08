// Récupération de l'orderId dans l'URL de la page
const search = window.location.search
const urlParams = new URLSearchParams(search)
const orderId = urlParams.get("id")
console.log("orderId = " + orderId)

// Intégration de l'orderId dans le HTML
function confirmation () {
    if (orderId != null) {
        let numeroCommande = document.getElementById("orderId")
        numeroCommande.innerText = orderId
    }
}
confirmation ()