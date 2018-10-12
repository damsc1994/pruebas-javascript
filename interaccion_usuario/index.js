'use strict'
var express = require('express');
var app = express();




app.use(express.static('public'))

app.listen(1800, 'localhost', () => {
    console.log('Corriendo servidor..');
});