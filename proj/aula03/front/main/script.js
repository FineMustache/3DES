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
    let modelo = document.querySelector('.cartItem').cloneNode(true)
    let tot = document.querySelector('.cartTotal').cloneNode(true)
    let conf = document.querySelector('.cartConfirm').cloneNode(true)
    document.querySelector('.cartList').innerHTML = ""
    document.querySelector('.cartList').appendChild(modelo)
    document.querySelector('.cartList').appendChild(tot)
    document.querySelector('.cartList').appendChild(conf)
    if (cart.length > 0) {
        let soma = 0
        document.querySelector('#cartNum').classList.remove('escondido')
        document.querySelector('.cartTotal').classList.remove('escondido')
        cart.forEach(i => {
            soma += i.valor * i.qtde
            let model = document.querySelector('.cartItem').cloneNode(true)
            model.querySelector('#nome').innerHTML = i.nome
            model.querySelector('#valor').innerHTML = "R$ " + (parseFloat(i.valor).toFixed(2).toString().replace('.', ','))
            model.querySelector('.inpQtde').value = i.qtde
            model.id = "c" + i.id
            model.classList.remove('escondido')
            model.querySelector('img').src = '../assets/' + i.imagem

            model.querySelector('.inpQtde').addEventListener('change', (ev) => {
                i.qtde = ev.target.value
                window.localStorage.setItem('@cart', JSON.stringify(cart))
                atualizarCart()
            })

            model.querySelector('.fa-solid').addEventListener('click', (ev) => {
                const index = cart.findIndex(r => r.id === i.id)
                let cartClone = cart
                let a = cartClone.splice(index, 1)
                window.localStorage.setItem('@cart', JSON.stringify(cartClone))
                atualizarCart()
            })

            document.querySelector('.cartList').insertBefore(model, document.querySelector('.cartTotal'))
        })
        document.querySelector('#valorTotal').innerHTML = "R$ " + (parseFloat(soma).toFixed(2).toString().replace('.', ','))
    } else {
        document.querySelector('.cartTotal').classList.add('escondido')
        // document.querySelector('.cartConfirm').classList.add('escondido')
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
                const i = cart.findIndex(e => e.id === r.id);
                if (i > -1) {
                    cart[i].qtde ++
                } else {
                    r.qtde = 1
                    cart.push(r)
                }
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
                const i = cart.findIndex(e => e.id === r.id);
                if (i > -1) {
                    cart[i].qtde ++
                } else {
                    r.qtde = 1
                    cart.push(r)
                }
                console.log(cart)
                window.localStorage.setItem("@cart", JSON.stringify(cart))
                atualizarCart()
            })

            document.querySelector('.card-container').appendChild(modelo)
        })
    })
    .catch(err => console.error(err));
}

function toggleCart() {
    document.querySelector('.cartList').classList.toggle('escondido')
}