//Funcion que servira para mostrar u ocultar nuestros elementos
function mostrarOcultarElementos(mostrarResultado){
    const resultado = document.querySelector(".outputResultado");
    const imagen = document.querySelector(".outputImagen");
    const subtitulo = document.querySelector(".outputSubtitulo");
    const texto = document.querySelector(".outputTexto");

    if (mostrarResultado) {
        //Si el parametro es "true" se mostrara el mensaje incriptado
        resultado.style.display = "block";
        imagen.style.display = "none";
        subtitulo.style.display = "none";
        texto.style.display = "none";
    } else {
        //Si el parametro es "false" se mostraran los demas elementos
        resultado.style.display = "none";
        imagen.style.display = "block";
        subtitulo.style.display = "block";
        texto.style.display = "block";
    }
}

//Funcion para obtener el texto ingresado
function obtenerTextoUsuario() {
    const textoUsuario = document.getElementById("textoUsuario").value;
    return textoUsuario;
}

//Funcion para evaluar si hay un mensaje o no, y asi encriptarlo o desencriptarlo
function procesarMensaje(proceso) {
    const textoUsuario = obtenerTextoUsuario();

    if (!validarTexto(textoUsuario)) {
        // Si el texto no cumple con las reglas, mostrar alerta
        document.querySelector(".outputResultado").textContent = "Por favor, solo usar letras minusculas y sin acento"
        mostrarOcultarElementos(true);
    } else if (textoUsuario.trim() === "") {
        // En caso de que no se ingrese ningún mensaje o solo sean espacios
        mostrarOcultarElementos(false);
    } else {
        // En caso de que sí se haya ingresado algún mensaje
        const mensajeProcesado = proceso(textoUsuario);
        document.querySelector(".outputResultado").textContent = mensajeProcesado;
        mostrarOcultarElementos(true);
    }
}

//Funcion que hace el proceso de encriptacion
function encriptar(textoOriginal) {
    let textoNuevo = "";
    for (let letra of textoOriginal) {
        if (letra === "a") {
            textoNuevo += "ai";
        } else if (letra === "e") {
            textoNuevo += "enter";
        } else if (letra === "i") {
            textoNuevo += "imes";
        } else if (letra === "o") {
            textoNuevo += "ober";
        } else if (letra === "u") {
            textoNuevo += "ufat";
        } else {
            textoNuevo += letra;
        }
    }
    return textoNuevo;
}

//Funcion que hace el proceso de desencriptacion 
function desencriptar(textoOriginal) {
    const textoNuevo = textoOriginal
        .replace(/ai/g, "a")
        .replace(/enter/g, "e")
        .replace(/imes/g, "i")
        .replace(/ober/g, "o")
        .replace(/ufat/g, "u");
    
    if (textoNuevo === textoOriginal) {
        return "El texto ya está desencriptado!";
    } else {
        return textoNuevo;
    }
}


function validarTexto(texto) {
    const regex = /^[a-z\s]*$/; // Solo letras minúsculas y espacios
    return regex.test(texto);
}

// Funcion principal que unifica todas nuestras funciones para encriptar el mensaje
function encriptarMensaje() {
    procesarMensaje(encriptar);
}

// Funcion principal que unifica todas nuestras funciones para desencriptar el mensaje
function desencriptarMensaje() {
    procesarMensaje(desencriptar);
}

// Extra! Funcion para copiar el texto al portapapeles
function copiarTexto() {
    const resultado = document.querySelector(".outputResultado").textContent;
    const tempInput = document.createElement("textarea");
    tempInput.value = resultado;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
}
