function carregar() {
    preencherTabela()
    preencherSetores()
}

function preencherTabela() {
    document.querySelector('tbody').innerHTML = ""

    const options = {method: 'GET'};

    fetch('http://localhost:5000/produtos', options)
    .then(response => response.json())
    .then(response => {
        response.forEach(r => {
            let tr = document.createElement('tr')
            let nome = document.createElement('td')
            let valor = document.createElement('td')
            let setor = document.createElement('td')
            let remove = document.createElement('td')

            nome.innerHTML = r.nome
            valor.innerHTML = "R$ " +  parseFloat(r.valor).toFixed(2).replace('.', ',')
            setor.innerHTML = r.setor.nome
            remove.innerHTML = '<i class="fa-solid fa-xmark"></i>'

            remove.addEventListener('click', (ev) => {
                deleteProd(r.id)
            })

            tr.id = "s" + r.id

            tr.appendChild(nome)
            tr.appendChild(valor)
            tr.appendChild(setor)
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
        "valor": document.querySelector('#inpVal').value,
        "id_setor": document.querySelector('#inpSetor').value
    }

    if (info.valor.length > 0 && info.nome.length > 0) {
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(info)
          };
          
          fetch('http://localhost:5000/produtos', options)
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

function deleteProd(id) {
    const options = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: `{"id":${id}}`
      };

      console.log(id);
      
      fetch('http://localhost:5000/produtos', options)
        .then(response => response.json())
        .then(response => {
            if (response.id !== null) {
                preencherTabela()
            }
        })
        .catch(err => console.error(err));
}

function preencherSetores() {
    const options = {method: 'GET'};

    fetch('http://localhost:5000/setores', options)
    .then(response => response.json())
    .then(response => {
        response.forEach(r => {
            let option = document.createElement('option')
            option.innerHTML = r.nome
            option.value = r.id

            document.querySelector('select').appendChild(option)
        })
    })
    .catch(err => console.error(err));
}