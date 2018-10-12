'use strict'

page('/', inicio);
page('/inicio', inicio);
page('/contatos', contatos);
page('*', inicio);
page();


function inicio(){
    document.querySelector('h1').textContent = 'INICIO';
    console.log("hola mundo");
}

function contatos() {
    document.querySelector('h1').textContent = 'CONTATOS';
    console.log('Contactos')
}

