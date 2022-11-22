function mostrarContenido(contenido) {
    const elemento = document.getElementById('contenido-archivo');
    elemento.innerHTML = contenido;

}
// validar inicio y final
function validar(contenido, busqueda){
    let texto_limpio = contenido.toLowerCase().replace(/[{}();.,-]/gi, ''); //limpiar el texto
    palabras = texto_limpio.split(" ");
    if(texto_limpio.includes(busqueda)){        //metodo includes
        
        console.log("todo good" )
        
    }else{
        console.log('error no se encontro "', busqueda,'"');
}
    console.log(palabras);
}



// Obtener el txt

function leerArchivo(e) {
const archivo = e.target.files[0];
if (!archivo) {
    return;
}
const lector = new FileReader();
lector.onload = function(e) {
    const contenido = e.target.result;
    mostrarContenido(contenido);

    console.log("CODIGO--->  "+contenido );
    validar(contenido,"sta");
    validar(contenido,"end");
    
};
lector.readAsText(archivo);
}

document.querySelector('#archivo1')
.addEventListener('change', leerArchivo, false);
