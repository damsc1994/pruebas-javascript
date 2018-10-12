'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var clienteSchema = Schema({
    identificacion: String,
    nombres: String,
    apellidos: String,
    email: String,
    createdAt: String
});

module.exports = mongoose.model('Cliente', clienteSchema);