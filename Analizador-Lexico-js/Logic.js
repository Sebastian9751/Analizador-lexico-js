window.addEventListener("DOMContentLoaded", () => obtenerLexemas());
const lexico = document.getElementById("datos");
let codigo = document.getElementById("codigo");
let cCodigo = document.getElementById("container_codigo");
const sintac = document.getElementById("Sintaxis");
const structure = document.getElementById("111");
let lexemas;
let errores = [];
let tokens = [];
//Obterner el TXT
function leerTxt(e) {
  const archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  const lector = new FileReader();
  lector.onload = function (e) {
    const contenido = e.target.result;
    mostrarContenido(contenido);
    console.log("CODIGO--->  " + contenido);
  };
  lector.readAsText(archivo);
}
//Mostrar el contenido del TXT
function mostrarContenido(contenido) {
  const elemento = document.getElementById("codigo");
  elemento.innerHTML = contenido;
}
document.querySelector("#archivo").addEventListener("change", leerTxt, false);

// Validar inicio, cuerpo y final en el TXT
function validarEstructura(contenido) {
  // Var de validacion
  const inicio = "Sta";
  const main = "Main";
  const final = "End";
  //Quitar los espacios del texto

  const Texto_limpio = contenido.replace(/ |\n|\r/g, "");
  console.log("CADENA LIMPIA ==> ", Texto_limpio.split("\t").join(""));

  // Agregar a un array el texto separado por bloques
  let bloque = dividirBloque(Texto_limpio.split("\t").join(""));
  console.log(`SOY ESTE BLOQUEEEE`, bloque);
  // Recorrer el Array y validar la posicion, de esta forma se determina en dinde debe ir cada palabra  reservada
  bloque.forEach((item) => {
    if (item == inicio && bloque.indexOf(item) == 0) {
      console.log(item, ` CORRCTO TENGO EL INDICE `, bloque.indexOf(item));
      structure.innerHTML += `<h5 class="succes" >Inicio del programa declarado: " ${item} "</h5>`;
    } else if (item == main && bloque.indexOf(item) == 1) {
      console.log(item, ` CORRCTO TENGO EL INDICE `, bloque.indexOf(item));
      structure.innerHTML += `<h5 class="succes" > declaracion encontrada: " ${item} "</h5>`;
      validarDeclaraciones(bloque);
      validarCondicion(bloque);
    } else if (bloque.indexOf(item) >= 2) {
      console.log(item, " ESTO ES EL CUERPO DEL CODIGO ", bloque.indexOf(item));
      if (
        item != "" &&
        bloque.indexOf(item) != bloque.length - 2 &&
        item != final
      ) {
        if (bloque.indexOf(item) > bloque.length - 2) {
          structure.innerHTML += `<h5 class="error" >El bloque " ${item} " se encuentra fuera de la estructura</h5>`;
        } else {
          structure.innerHTML += `<h5 class="succes" >Se reviso: " ${item} "</h5>`;
        }
      }
    } else {
      console.log("DECLARACION  incorrecta en la linea ", bloque.indexOf(item));
      structure.innerHTML += `<h5 class="error" >Declaracion incorrecta no se reconoce: " ${item} "</h5>`;
    }
    if (bloque.indexOf(item) == bloque.length - 2) {
      if (item == final) {
        console.log(item, " ULTIMA INSTRUCCion CORRECTO", bloque.indexOf(item));
        structure.innerHTML += `<h5 class="succes" >Fin del programa declarado: " ${item} "</h5>`;
      } else {
        console.log(
          item,
          "DECLARACION  incorrecta fin del programa no encontrado la linea ",
          bloque.indexOf(item)
        );
        structure.innerHTML += `<h5 class="error" >No se encontro el fin del programa: " ${item} "</h5>`;
      }
    }
    console.log("tamaño del ", bloque.length);
  });
}
// obteniendo la informacion de lexemas.json
const obtenerLexemas = async () => {
  try {
    const rs = await fetch("./lexemas.json");
    const data = await rs.json();
    lexemas = data;
  } catch (error) {
    console.log(error);
  }
};
// buscar palabra en lexemas
function buscar(listaDePalabras) {
  let subTokens = [];
  // recorrer la lista que nos pasan
  listaDePalabras.forEach((palabra) => {
    // combrobar si la palabra se encuentra en lexemas
    lexemas.some((item) => item.nombre == palabra)
      ? lexemas.filter((item) => {
          if (item.nombre == palabra) {
            subTokens.push(item);
          }
        })
      : // combrobar si la palabra noencontrada no es un string vacio
      comprobarPalabraNoEncontrada(palabra) !== undefined
      ? subTokens.push(comprobarPalabraNoEncontrada(palabra))
      : console.log("es un estring vacio");
  });
  tokens.push(subTokens);
  console.log(tokens);
  lexico.innerHTML = ``;
  tokens.forEach((item) => {
    lexico.innerHTML += `
      <tr>
      <td class='LineaLexico' colspan='3'>
      Linea ${tokens.indexOf(item) + 1}
      </td>
      </tr>`;
    item.forEach((item) => {
      lexico.innerHTML += `
      <tr class="TablaLexico">
      <td class="">
          ${item.nombre}
      </td>
      <td class="">
        ${item.tipo}
      </td>
      <td class="">
        ${item.codigo}
      </td>
    </tr>`;
    });
  });
}
// funcion que compara las palabras no encontradas
function comprobarPalabraNoEncontrada(palabra) {
  //   console.log('No se encontro',palabra);
  let temp;
  // comprueba si no es un string vacio y no es un numero
  if (palabra !== "" && isNaN(palabra)) {
    temp = {
      nombre: palabra,
      tipo: "No esta dentro de la sintaxis",
      codigo: "404",
    };
    // comprueba si no es un string vacio y si es un numero
  } else if (palabra !== "" && !isNaN(palabra)) {
    temp = {
      nombre: palabra,
      tipo: "numero",
      codigo: "102",
    };
  }
  return temp;
}
// funcion que divide el texto en bloque de codigo
function dividirBloque(cadenas) {
  let bloques = cadenas.split(";");
  return bloques;
}
// funcion que divide el texto en lineas
function dividirLineas(cadenas) {
  let listDeCadenas = cadenas.split(/\n/g);
  return listDeCadenas;
}
// funcion que divide el texto en palabras y luego las busca en lexemas
function dividirPalabras(cadenas) {
  cadenas.forEach((cadena) => {
    cadena = cadena.replace(";", " ;");
    cadena = cadena.replace("=", " =");
    cadena = cadena.replace("+", " +");
    cadena = cadena.replace(".", " . ");
    cadena = cadena.replace("(", " ( ");
    cadena = cadena.replace(")", " ) ");

    // separamos cada linea por los espacios
    let listaDePalabras = cadena.split(/\s/g);

    // buscar cada parabra
    buscar(listaDePalabras);
  });
}

function validarDeclaraciones(bloques) {
  let response = [];
  let result;
  let i = 0;
  console.log("BLOQUE RECIBIDO PARA VALIDAR LISTO", bloques)
  for (let i = 0; i < bloques.length; i++) {
    const item = bloques[i];
    let result;
    if (item.startsWith("Ent")) {
      if (item.match(/^Ent\s*[^\d]\w+\s*=\s*\d+\s*$/)) {
        result = [
          i + 1,
          showSucces(item)
        ];
      } else {
        result = [
          i + 1,
          showError(item)
        ];
      }
    } else {
      result = [i + 1, "buscando declaraciones"];
    }
    response.push(result);
    console.log("hola__", response);
  }

  response.forEach((item) => {
    structure.innerHTML += `<h5 class="search" >${item[1]}  </h5>`;
  });
}


//validar  IF
function validarCondicion(bloques) {
  let response = [];
  let result;
  let i = 0;
  console.log("BLOQUE RECIBIDO IF", bloques)
  for (let i = 0; i < bloques.length; i++) {
    const item = bloques[i];
    let result;
    if (item.startsWith("if")) {
      if (item.match(/^if\([^)]+\)\{[^}]+\}$/g)) {
        result = [
          i + 1,
          showSucces(item)
        ];
      } else {
        result = [
          i + 1,
          showError(item)
        ];
      }
    } else {
      result = [i + 1, "buscando declaraciones"];
    }
    response.push(result);
  }

  response.forEach((item) => {
    structure.innerHTML += `<h5 class="search" >${item[1]}  </h5>`;
  });
}



//Mensaje succes
const showSucces=(item)=>{
  const result = `<h5 class="var">sentencia declarada correctamente  ${item}</h5>`
return  result
}
//Mensaje error
const showError=(item)=>{
  const result = `<h5 class="error">parace que tienes un error de sintaxix en  "${item}" es incorrecta</h5>`
return  result
}


// agregando la accion al form
cCodigo.addEventListener("submit", (event) => {
  sintac.innerHTML = ``;
  structure.innerHTML = ``;
  event.preventDefault();
  tokens = [];
  dividirPalabras(dividirLineas(codigo.value));
  //validar la estructura del txt
  validarEstructura(codigo.value);
});
cCodigo.addEventListener("reset", (event) => {
  lexico.innerHTML = ``;
  sintac.innerHTML = ``;
  structure.innerHTML = ``;
});
