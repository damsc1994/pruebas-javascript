
page('/', inicio);
page('/inicio', inicio);
page('/camara', camara);
page('*', inicio);
page();


function inicio(){
    document.querySelector('h1').textContent = 'INICIO';
    console.log("hola mundo");
}

function camara() {
    document.querySelector('h1').textContent = 'CAMARA';
    console.log('Camara')
}

