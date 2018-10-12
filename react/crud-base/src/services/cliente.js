import URL from '../static/js/url';

function addClientes(cliente) {
    var clientes = this.getClientes();
    clientes.push(cliente);
    console.log('cliente ',cliente)
    localStorage.setItem('clientes', JSON.stringify(clientes));
}

function getClientes() {
    var recrusoClientes;
    fetch(URL.apiUrl + 'clientes/getClientes/'+ 1)
            .then((response) => {
                return response.json()
            })
            .then((recurso) => {
                console.log(recrusoClientes);
                recrusoClientes = recurso;
    });
    
    return recrusoClientes;
}


function deleteCliente(cliente) {
    
}

export default {
    getClientes,
    deleteCliente,
    addClientes
}

