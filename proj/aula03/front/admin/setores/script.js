function carregar() {
    preencherTabela()
}

function preencherTabela() {
    document.querySelector('tbody').innerHTML = ""

    const options = {method: 'GET'};

    fetch('http://localhost:5000/setores', options)
    .then(response => response.json())
    .then(response => {
        response.forEach(r => {
            let tr = document.createElement('tr')
            let nome = document.createElement('td')
            let comi = document.createElement('td')
            let qtdeF = document.createElement('td')
            let qtdeP = document.createElement('td')
            let remove = document.createElement('td')

            nome.innerHTML = r.nome
            comi.innerHTML = r.comissao
            qtdeF.innerHTML = r.funcionarios.length
            qtdeP.innerHTML = r.produtos.length
            remove.innerHTML = '<i class="fa-solid fa-xmark"></i>'

            remove.addEventListener('click', (ev) => {
                deleteSetor(r.id)
            })

            tr.id = "s" + r.id

            tr.appendChild(nome)
            tr.appendChild(comi)
            tr.appendChild(qtdeF)
            tr.appendChild(qtdeP)
            tr.appendChild(remove)

            document.querySelector('tbody').appendChild(tr)
        })
    })
    .catch(err => console.error(err));
}

function toggleModal(){
    document.querySelector('.modal').classList.toggle('escondido')
    document.body.style.overflow = 'hidden'
}

function create() {
    const info = {
        "nome": document.querySelector('#inpNome').value,
        "comissao": document.querySelector('#inpComi').value
    }

    if (info.comissao.length > 0 && info.nome.length > 0) {
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(info)
          };
          
          fetch('http://localhost:5000/setores', options)
            .then(response => response.json())
            .then(response => {
                if (response.id !== null) {
                    preencherTabela()
                    toggleModal()
                } else {
                    console.log(response)
                }
            })
            .catch(err => console.error(err));
    }

    
}

function deleteSetor(id) {
    const options = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: `{"id":${id}}`
      };
      
      fetch('http://localhost:5000/setores', options)
        .then(response => response.json())
        .then(response => {
            if (response.id !== null) {
                preencherTabela()
            }
        })
        .catch(err => console.error(err));
}