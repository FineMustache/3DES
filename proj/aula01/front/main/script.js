const produtos = [
    "X-Burguer",
    "X-Egg",
    "Refrigerante - 2L",
    "X-Frango",
    "X-Bacon",
    "X-Tudo",
    "Refrigerante - Lata"
]

const inpProd = document.querySelector("#inpProd")

function carregar() {
    produtos.forEach(p => {
        let op = document.createElement('option')
        op.value = p
        op.innerHTML = p
        inpProd.appendChild(op)
    })
}