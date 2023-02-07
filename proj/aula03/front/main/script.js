var cart = []

function carregar() {
    carregarSetores()
    carregarProdutos()
    atualizarCart()
}

function atualizarCart() {
    let aux = window.localStorage.getItem('@cart')
    cart = aux !== null ? JSON.parse(aux) : []
    document.querySelector('#cartNum').innerHTML = cart.length
    if (cart.length > 0) {
        document.querySelector('#cartNum').classList.remove('escondido')
    }

    
}

function carregarSetores() {
    const options = {method: 'GET'};

    fetch('http://localhost:5000/setores', options)
    .then(response => response.json())
    .then(response => {
        response.forEach(r => {
            let span = document.createElement('span')
            span.classList.add('setor')
            span.id = "s" + r.id
            span.innerHTML = r.nome
            span.addEventListener('click', (e) => {
                if (e.target.classList.contains('setor-ativo')) {
                    carregarProdutos()
                } else {
                    document.querySelectorAll('.setor-ativo').forEach(t => {
                        t.classList.remove('setor-ativo')
                    })
                    
                    carregarProdutosSetor(e.target.id.slice(1))
                }
                e.target.classList.toggle('setor-ativo')
            })
            document.querySelector('.filter').appendChild(span)
        });
    })
    .catch(err => console.error(err));
}

function carregarProdutos() {
    let modelo = document.querySelector('.modelo').cloneNode(true)
    document.querySelector('.card-container').innerHTML = ""
    document.querySelector('.card-container').appendChild(modelo)

    const options = {method: 'GET'};

    fetch('http://localhost:5000/produtos', options)
    .then(response => response.json())
    .then(response => {
        response.forEach(r => {
            let modelo = document.querySelector('.modelo').cloneNode(true)
            modelo.querySelector('#nome').innerHTML = r.nome
            modelo.id = "p" + r.id
            modelo.querySelector('#valor').innerHTML = "R$ " + (parseFloat(r.valor).toFixed(2).toString().replace('.', ','))
            modelo.querySelector('#prodImg').src = "../assets/" + r.imagem
            modelo.classList.remove('modelo')
            modelo.querySelector('button').addEventListener('click', () => {
                cart.push(r)
                console.log(cart)
                window.localStorage.setItem("@cart", JSON.stringify(cart))
                atualizarCart()
            })

            document.querySelector('.card-container').appendChild(modelo)
        })
    })
    .catch(err => console.error(err));
}

function carregarProdutosSetor(id) {
    let modelo = document.querySelector('.modelo').cloneNode(true)
    document.querySelector('.card-container').innerHTML = ""
    document.querySelector('.card-container').appendChild(modelo)

    const options = {method: 'GET'};

    fetch('http://localhost:5000/setores/' + id, options)
    .then(response => response.json())
    .then(response => {
        response[0].produtos.forEach(r => {
            let modelo = document.querySelector('.modelo').cloneNode(true)
            modelo.querySelector('#nome').innerHTML = r.nome
            modelo.id = "p" + r.id
            modelo.querySelector('#valor').innerHTML = "R$ " + (parseFloat(r.valor).toFixed(2).toString().replace('.', ','))
            modelo.querySelector('#prodImg').src = "../assets/" + r.imagem
            modelo.classList.remove('modelo')
            modelo.querySelector('button').addEventListener('click', () => {
                cart.push(r)
                console.log(cart)
                window.localStorage.setItem("@cart", JSON.stringify(cart))
                atualizarCart()
            })

            document.querySelector('.card-container').appendChild(modelo)
        })
    })
    .catch(err => console.error(err));
}