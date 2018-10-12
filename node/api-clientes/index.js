'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var conf = require('./conf/conf');

mongoose.Promise = global.Promise;

mongoose.connect(conf.urlDB, {useNewUrlParser: true} ,() => {
    app.listen(1800, 'localhost', () => {
        console.log("el servidor ha arrancado");
    });
});
