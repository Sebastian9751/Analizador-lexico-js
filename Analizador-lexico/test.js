// cantidad de veces que se repite una frase

function concidencias(frase, busqueda){

    let texto_limpio = frase.toLowerCase().replace(/[.,-]/gi, ' '); //limpiar el texto
    resultado = 0;

    if(texto_limpio.includes(busqueda)){        //metodo includes
        palabras = texto_limpio.split(" ");         //colocar en el array
        let mapa = {};

        for (const palabra of palabras) {
            if(mapa[palabra]){
                mapa[palabra]++;
            }else{
                mapa[palabra]=1;
            }
        }

        resultado = mapa[busqueda];


    }else{
        resultado = 0;
    }
    console.log(palabras);
    return resultado;

}
console.log("Numero de concidencias: ", concidencias( "hola .de MediaRecorder,hola.hola...hola", "hola")

);

//// MULTIPLICACION SIN SIMBOLO

const multiply=(a, b)=>{
    let resultado=0;
    const positivo = Math.abs(b)== b;
    for(i=0; i< Math.abs(b); i++){
        resultado= positivo ? resultado + a : resultado -a ;
    }
    return resultado;
}

const a = multiply(50, 50);

console.log(a);


/// obtener numero mayor en un arrgelo iterando solo una vez

const getbgg = (arr) => arr.reduce((acc, el) => acc > el ? acc : el);
const b = getbgg([50, -2000, 0, 1, 540]);

console.log(b);

/// Funcion que descarte los ceros,null, undefine

const clean =(arr) => arr.reduce((acc, el)=> {
if(el){
    acc.push(el);
}
return acc;
},[]);

const c = clean([1, undefined, 0, 2, null, 3]);

console.log(c);

// Aplanar arrelgos
const arr =[[1,2], [[3,4]], [1, []]];
const flatten = arr => arr.reduce((acc, el) => acc.concat(el), []);
const d = flatten(arr);
console.log(d);

// Palindromo

const isPalindrome = (palabra) =>{
    palabra =palabra.replace(/\s/g, ''); //remplazar loes espacios

    const lowered = palabra.toLowerCase();
    const split = lowered.split('');
    const reverse = split.reverse(); // dar vuelta a los caracteres
    const join = reverse.join(''); // juntr el string
    return lowered == join;
}

const e = isPalindrome('ala');

console.log(e);