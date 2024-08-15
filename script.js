const inputTexto = document.querySelector("#texto");
const resultadoTexto = document.querySelector("#textoResultado");
const botonCodificar = document.querySelector("#encri");
const botonDecodificar = document.querySelector("#desencri");
const botonCopiar = document.querySelector("#copiar");

let timeoutInactividad;
const TIEMPO_INACTIVIDAD = 10000; // 10 segundos

function codificar() {
  let texto = inputTexto.value.toLowerCase();
  let textoCodificado = texto
    .replaceAll("e", "enter")
    .replaceAll("i", "imes")
    .replaceAll("o", "ober")
    .replaceAll("a", "ai")
    .replaceAll("u", "ufat");

  document.getElementById("noResuelto").style.visibility = "hidden";
  document.getElementById("copiar").style.visibility = "visible";

  resultadoTexto.value = textoCodificado;

  inputTexto.value = '';

  // Reinicia el temporizador de inactividad
  reiniciarTemporizadorInactividad();
}

function decodificar() {
  let textoCodificado = inputTexto.value.toLowerCase();
  let texto = textoCodificado
    .replaceAll("enter", "e")
    .replaceAll("imes", "i")
    .replaceAll("ober", "o")
    .replaceAll("ai", "a")
    .replaceAll("ufat", "u");

  document.getElementById("noResuelto").style.visibility = "hidden";
  document.getElementById("copiar").style.visibility = "visible";

  resultadoTexto.value = texto;

  inputTexto.value = '';

  // Reinicia el temporizador de inactividad
  reiniciarTemporizadorInactividad();
}

function copiar() {
  let textoCodificado = resultadoTexto.value;
  navigator.clipboard.writeText(textoCodificado);
}

function mostrarMensajeNoResuelto() {
  document.getElementById("noResuelto").style.visibility = "visible";
  document.getElementById("copiar").style.visibility = "hidden";
  resultadoTexto.value = ''; // Borra el texto codificado o decodificado
  alert('El desencriptador se reinició por inactividad.'); // Muestra el alert solo si la vista se reinició por inactividad
}

function reiniciarTemporizadorInactividad() {
  clearTimeout(timeoutInactividad);
  timeoutInactividad = setTimeout(mostrarMensajeNoResuelto, TIEMPO_INACTIVIDAD);
}

// Configura el temporizador cuando el documento está listo
document.addEventListener('DOMContentLoaded', () => {
  // Configura el temporizador inicial
  reiniciarTemporizadorInactividad();

  // Agrega eventos para reiniciar el temporizador al interactuar con la página
  document.addEventListener('click', reiniciarTemporizadorInactividad);
  document.addEventListener('keypress', reiniciarTemporizadorInactividad);
});

// Configura los botones
botonCodificar.onclick = codificar;
botonDecodificar.onclick = decodificar;
botonCopiar.onclick = copiar;
