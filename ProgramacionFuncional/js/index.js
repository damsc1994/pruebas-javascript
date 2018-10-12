'use strict'


var arrayA = [1, 2, 10, 22, 33, 4, 4 ,2, 33];
var arrayB = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


var result_array = (a, b) => a.filter(value => b.indexOf(value) > -1).sort();
var result = result_array(arrayA, arrayB);
console.log('resultado '+ result);
console.log(result.map(value => Math.pow(value, 2)));



class Person {
    constructor(name, lastname) {
        this._name = name;
        this._lastname = lastname;
    }

    getFullName() {
        return `${this._name} ${this._lastname}`;
    }
}
const person = new Person('John', 'Doe');
console.log(person.getFullName());
var result_person = person => [person._name, person._lastname].join(' ');

console.log(`persona2-----> ${result_person(person)}`);

const person_dos = Object.freeze({
	name: 'Damaso',
	last_name: 'Salgado Cassiani'
});


console.log(person_dos.name);
console.log(arrayA.reduce((acumulado, elemento) => acumulado + elemento));


/////ARRAY.MAP()//////
const array_result_map = (array) => (array.map(elemt => (elemt % 2 == 0) ? elemt * 2 : elemt * 3));
console.log('Resul map', array_result_map(arrayB));


////ARRAY UNIQUE/////
const arra_unique = (array) => (array.filter((elemt, index, arr) => arr.indexOf(elemt) === index));
console.log('Unique arr', arra_unique(arrayA));


////ARRAY REDUCE/////
const array_reduce = (array) => (array.reduce((acumulador, elemento) => acumulador + elemento));
console.log('Sum Reduce arr', array_reduce(arrayA));



////RECURSIVIDAD/////
function sum(nums) {
	if ( nums.length == 0) {
		return 0
	} else {
		const [primer, ...resto] = nums;
		return primer + sum(resto);
	}
}

console.log('Sum recursividad ', sum(arrayA));



/////COMPOSICION/////

const text = `En un lugar de la Mancha, de cuyo nombre no quiero 
acordarme, no ha mucho tiempo que vivía un hidalgo de 
los de lanza en astillero, adarga antigua, rocín flaco y 
galgo corredor. Una olla de algo más vaca que carnero, 
salpicón las más noches, duelos y quebrantos los sábados, 
lentejas los viernes, algún palomino de añadidura los domingos, 
consumían las tres partes de su hacienda.`;

const arr_palabras =  (text) => text.split(' ');
const numero_palabras = (arr) => arr.length;

console.log("El numero de palabras es ", numero_palabras(arr_palabras(text)));


const parties = ['PSOE', 'Cs', 'Others', 'PP', 'UP'];
const percent = [22.66, 13.05, 10.76, 10, 21.1];

/*const getPartyWinner = R.compose(
    R.head,
    R.pluck(1),
    R.reverse,
    R.sortBy(R.prop(0)),
    R.zip
);*/
const debug = R.tap(console.log);
const getPartyWinner = R.pipe(
    R.zip,
    debug,
    R.sortBy(R.prop(0)),
    R.reverse,
    R.pluck(1),
    R.head
);

const partyWinner = getPartyWinner(percent, parties);
console.log('Eleciones con randam ganador: ', partyWinner);



////Combinadores/////

const identity = function (fn, logger) {
    return function (...args) {
        logger(args);
        const result = fn.apply(this, args);
        logger(result);
        return result;
    }
};


const exp = function (num) {
    return num * num;
};

const expLog = identity(exp, console.log);

console.log('combinadores ', expLog);

///////////////////////////
const fork = function(fnJoin, fn1, fn2) {
    return function(val) {
        return fnJoin(fn1(val), fn2(val));
    }
}
const getAvarage = fork(R.divide, R.sum, R.length);
console.log(getAvarage([5, 7, 10]));



////Funtores////

class Wrapper {
    constructor(value) {
        this._value = value;
    }

    map(fn) {
        return fn(this._value);
    }

    sMap(fn) {
        return new Wrapper(fn(this._value));
    }

    toString() {
       return `Wrapper [${this._value}]`; 
    }
}


Wrapper.prototype.fmap = function (fn) {
    return wp(fn(this._value));

}

const wp = (value) => new Wrapper(value);
const stringWrapper = wp('Hola a todos');

const mayuscula = (dato) => dato.toUpperCase();
console.log('Validador ', stringWrapper.map(mayuscula));

const numberWrap = wp(8);
const sum5 = num => num + 5;

console.log('Suma con funtores ', numberWrap.sMap(sum5));


////Moneda////
class Moneda {
   // un constructor
   constructor(value) {
      this._value = value;
   }
   
   // una 'unit function'
   static of(a) {
       return new Moneda(a);
   } 

   // una 'bind function' (funtor)
   maps(f) {
       return Moneda.of(f(this._value));
   }

   // una 'join function'
   join() {
       if (!(this._value instanceof Moneda)) {
           return this._value;
       }
       return this._value.join();
    }
 }

const mon = (dato) => new Moneda(dato);
const numeros = mon(3);
console.log('Moneda ', numeros.maps((value) => value + 2 ).join());

/////////Moneda maybe////////////
class Maybe {
    static just(value) {
        return new Just(value);
    }

    static nothing() {
       return new Nothing();
    }

    get isJust() {
        return false;
    }

    get isNothing() {
        return false;
    }  

    static of(value) {
        return Maybe.just(value);
    }

    static fromNullable(value) {
       return value !== null && value !== undefined ? Maybe.just(value) : Maybe.nothing();
    }
}

class Just extends Maybe {
    constructor(value) {
        super();
        this._value = value;
    }
    
    get value() {
        return this._value;
    }

    get isJust() {
        return true;
    }
    
    map(f) {
        return Maybe.fromNullable(f(this._value) || null);
    }

    getOrElse() {
        return this._value;   
    }
}


class Nothing extends Maybe {
    get value() {
        throw new TypeError('No se puede extraer el valor de Nothing');
        //return null;
    }

    get isNothing() {
        return true;
    }
    
    map() {
        return this;
    }

    getOrElse(other) {
        return other;   
    }
}


const suma_maybe = (num1, num2) => num1 + num2;

console.log('Suma moneda maybe ', Maybe.fromNullable(22).map((dato) => dato + 2).value);

/////Mondea Either////

class Either {
    constructor(value) { 
        this._value = value; 
    }
    static right(value) {
        return new Right(value);
    }

    static left(value) {
       return new Left(value);
    }

    static of(value) {
        return Either.right(value);
    }

    static fromNullable(value) {
       return value !== null && value !== undefined ? Either.right(value) : Either.left(value);
    }
}

class Right extends Either {
    get value() {
        return this._value;
    }
    
    map(f) {
        return Either.fromNullable(f(this._value) || null);
    }

    orElse() {
        return this;
    }
    getOrElseThrow() {
        return this._value;   
    }
}

class Left extends Either {
    get value() {
        throw new TypeError('Can´t extract the value of the Left');
    }
    
    map() {
        return this;
    }
 
     orElse(f) { 
         return f(this._value); 
     }

     getOrElseThrow(a) { 
          return new Error(a); 
     } 
}


const sum_either = (dato) => dato + 2;

console.log('Suma either ', Either.fromNullable(5).map(sum_either).getOrElseThrow(sum_either));

///////////Moneda IO///////


//////Memoizacion/////



 $(document).ready(function(){
    $('.collapsible').collapsible();
 });