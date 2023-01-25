const produtos = [
    "X-Burguer",
    "X-Egg",
    "Refrigerante - 2L",
    "X-Frango",
    "X-Bacon",
    "X-Tudo",
    "Refrigerante - Lata"
]

const inpCliente = document.querySelector("#inpCliente")
const inpEnd = document.querySelector("#inpEnd")
const inpProd = document.querySelector("#inpProd")

const cardL = document.querySelector("#modeloL")
const cardR = document.querySelector("#modeloR")
const left = document.querySelector('.left')
const right = document.querySelector('.right')

function carregar() {

    preencher()

    produtos.forEach(p => {
        let op = document.createElement('option')
        op.value = p
        op.innerHTML = p
        inpProd.appendChild(op)
    })
}

function generate() {
    if (inpCliente.value.length > 0 && inpEnd.value.length > 0) {
        let curdate = new Date().toLocaleDateString('pt-br')
        let curtime = new Date().toLocaleTimeString('pt-br')
        let ent = Math.ceil(Math.random() * 4)
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: `{"cliente":"${inpCliente.value}","endereco":"${inpEnd.value}","produto":"${inpProd.value}","data":"${curdate}","horaPed":"${curtime.slice(0, curtime.length - 3)}","entregador":${ent}}`
          };
          
          fetch('http://localhost:5000/comida/pedidos', options)
            .then(response => response.json())
            .then(response => {
                if (response.affectedRows !== null) {
                    let holdL = cardL.cloneNode(true)
                    let holdR = cardR.cloneNode(true)

                    left.innerHTML = "<span>Em Execução</span>"
                    right.innerHTML = "<span>Em Entrega</span>"

                    left.appendChild(holdL)
                    right.appendChild(holdR)
                    preencher()
                }
            })
            .catch(err => console.error(err));
    }
}

function preencher() {
    const options = {method: 'GET'};
    fetch('http://localhost:5000/comida/pedidosex/', options)
    .then(response => response.json())
    .then(response => {
        response.forEach(r => {
            console.log(r)
            let card
            let side
            if (r.hora_entrega == "" || r.hora_entrega == null) {
                card = cardL.cloneNode(true)
                side = left
            } else {
                card = cardR.cloneNode(true)
                side = right
            }

            card.querySelector('#id').innerHTML = r.id_pedido
            card.querySelector('#cli').innerHTML = r.cliente
            card.querySelector('#end').innerHTML = r.endereco
            card.querySelector('#data').innerHTML = r.data
            card.querySelector('#horario').innerHTML = r.hora_pedido
            card.querySelector('#prod').innerHTML = r.produto
            card.id = "c" + r.id_pedido

            card.classList.remove('modelo')

            side.appendChild(card)
        })
    })
    .catch(err => console.error(err));
}

function send(card) {
    let curtime = new Date().toLocaleTimeString('pt-br')
    const options = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: `{"id_pedido":${card.id.slice(1)},"hora_entrega":"${curtime.slice(0, curtime.length - 3)}","hora_fim":null}`
      };
      
      fetch('http://localhost:5000/comida/pedidos', options)
        .then(response => response.json())
        .then(response => {
            if (response.affectedRows !== null) {
                let holdL = cardL.cloneNode(true)
                let holdR = cardR.cloneNode(true)

                left.innerHTML = "<span>Em Execução</span>"
                right.innerHTML = "<span>Em Entrega</span>"

                left.appendChild(holdL)
                right.appendChild(holdR)
                preencher()
            }
        })
        .catch(err => console.error(err));
}

function end(card) {
    let curtime = new Date().toLocaleTimeString('pt-br')
    const options = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: `{"id_pedido":${card.id.slice(1)},"hora_fim":"${curtime.slice(0, curtime.length - 3)}"}`
      };
      
      fetch('http://localhost:5000/comida/pedidos', options)
        .then(response => response.json())
        .then(response => {
            if (response.affectedRows !== null) {
                let holdL = cardL.cloneNode(true)
                let holdR = cardR.cloneNode(true)

                left.innerHTML = "<span>Em Execução</span>"
                right.innerHTML = "<span>Em Entrega</span>"

                left.appendChild(holdL)
                right.appendChild(holdR)
                preencher()
            }
        })
        .catch(err => console.error(err));
}