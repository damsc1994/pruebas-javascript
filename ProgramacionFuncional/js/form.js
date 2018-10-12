'use strict'

var numero = document.getElementById('numero');
var numeros = [];
var resultSumatoria = 0;

function getNumero(numero, numeros) {
	numeros.push(numero.value);

	return numeros;
}


function enviar() {
	if (numero.value != 0) {
		numeros = getNumero(numero, numeros);
		addTable();
		jquery();
		resultSumatoria = sumatoria(numeros);
		console.log(resultSumatoria);
		
	}

}

var sumatoria = (arr) => (arr.reduce((acumulador, elemento) => acumulador + elemento));




function jquery() {
	$("#lbNumero, #lbSumatoria").remove();
	$('#p-numeros').append(`<label id="lbNumero">Cantidad de numeros: ${numeros.length}<lable> &nbsp; `);	
	$('#p-numeros').append(`<label id="lbSumatoria">Sumatoria de numeros: ${resultSumatoria}<lable>`);
}

function addTable() {
	$('#tbody').append(`
		<tr>
		  <td>${numero.value}</td>
		</tr>
		`);
}

jquery();
