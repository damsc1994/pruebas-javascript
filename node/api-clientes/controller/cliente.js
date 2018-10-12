'use strict'

var Cliente = require('../model/cliente');
var moment = require('moment');
var mongosPaginate = require('mongoose-pagination');



function prueba(req, res) {
    res.status(200).send({message : 'probando controlador'});
}


/////Añadimos los clientes a nuestra base de datos.
function addCliente(req, res) {
    var params = req.body;
    if (!params.identificacion && !params.nombres && !params.apellidos 
         && !params.email) return res.status(500).send({message: 'TODOS LOS CAMPOS SON OBLIGATORIOS'});

    var cliente = new Cliente();
    cliente.identificacion = params.identificacion;
    cliente.nombres = params.nombres;
    cliente.apellidos = params.apellidos;
    cliente.email = params.email;
    cliente.createdAt = moment().unix();

    cliente.save(cliente, (err, cliente) => {
        if(err) return res.status(500).send({message: 'ERROR AL INTENTAR REGISTRAR CLIENTE'});

        return res.status(200).send({
            cliente
        });
    })
}

///////Listamos los cientes
function getClientes(req, res) {
    var itemPerPage = 5;
    var page = 1;
    var consulta = null;
    if (req.params.page){
        page = req.params.page;
    }

    if (req.params.value) {
        var value = req.params.value;
        consulta = Cliente.find({
            $or: [
                {nombres: new RegExp(value, 'i')},
                {apellidos: new RegExp(value, 'i')},
                {email: new RegExp(value, 'i')},
                {identificacion: new RegExp(value, 'i')}
            ]
        });
    } else {
        consulta = Cliente.find();
    }
    consulta.sort('-createdAt').paginate(page, itemPerPage, (error, clientes, total) => {
        if (error) return res.status(500).send({message: 'ERROR AL INTENTAR REGISTRAR AL CLIENTE'});
        if (clientes.legth <= 0) return res.status(200).send({message: 'NO SE ECNONTRARON CLIENTES'});        
        return res.status(200).send({
            page,
            pages: Math.ceil(total / itemPerPage),
            total,
            clientes
        });
    });
}

///Esta funcion la usamos para eliminar clientes
function deleteCliente(req, res) {
    var clienteId = req.params.id;

    Cliente.findByIdAndRemove(clienteId, (error, cliente) => {
        if (error) return res.status(500).send({message: 'NO SE HA PODIDO ELIMINAR EL CLIENTE'});

        if (!cliente) return res.status(404).send({message: 'NO SE HA ENCONTRADO EL CLIENTE'});

        return res.status(200).send({
            cliente
        });
    })
}


function updateCliente(req, res) {
    var body = req.body;
    var userID = req.params.id;

    Cliente.findByIdAndUpdate(userID, body, (err, cliente) => {
        if (err) return res.status(500).send({message: err});

        if (!cliente) return res.status(404) .send({message: 'NO SE HA ENCINTRADO EL CLIENTE A MODIFICAR'});

        return res.status(200).send({
            cliente
        });
    });

}


module.exports = {
    prueba,
    addCliente,
    getClientes,
    deleteCliente,
    updateCliente
}