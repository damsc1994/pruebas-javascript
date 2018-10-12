'use strict'

var express = require('express');
var clienteController = require('../controller/cliente');
var api = express.Router();


api.get('/clientes/prueba', clienteController.prueba);
api.post('/clientes/add', clienteController.addCliente);
api.get('/clientes/getclientes/:page/:value?', clienteController.getClientes);
api.delete('/cliente/delete/:id', clienteController.deleteCliente);
api.put('/clientes/update/:id', clienteController.updateCliente);

module.exports = api;