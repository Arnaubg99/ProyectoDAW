document.addEventListener('DOMContentLoaded', () => {
const CUADRICULA = document.querySelector('.cuadricula') //afecta a todo lo que sea .cuadricula
let cuadrados = Array.from(document.querySelectorAll('.cuadricula div')) //crea un array con los 200 divs
const ANCHO = 10; //ancho de la cuadricula
const BOTONSTART = document.getElementById('boton_start');
const MARCADORPUNTOS = document.getElementById('puntuacion');
let temporizador;
let puntuacion = 0;
let bajar = true;

swal("Reco-loco","Justo al salir del almacén, las puertas del camión que lleva la mercancía se han abierto y se han caído todas las cajas. Tu objetivo es colocar 200 cajas, si no llegas has perdido. Pulsa s o flecha abajo para bajar las piezas, a/flecha derecha y d/flecha izquierda para mover las piezas y w/flecha arriba para rotarlas. Buena suerte.");

//piezas de tetris
const PIEZA_J = [
    [1, ANCHO + 1, ANCHO * 2 + 1, 2],
    [ANCHO, ANCHO + 1, ANCHO + 2, ANCHO * 2 + 2],
    [1, ANCHO + 1, ANCHO * 2 + 1, ANCHO * 2],
    [ANCHO, ANCHO * 2, ANCHO * 2 + 1, ANCHO * 2 + 2]
]

const PIEZA_L = [
    [1, ANCHO + 1, ANCHO * 2 + 1, ANCHO * 2 + 2],
    [ANCHO * 2, ANCHO, ANCHO + 1, ANCHO + 2],
    [0, 1, ANCHO + 1, ANCHO * 2 + 1],
    [ANCHO * 2, ANCHO * 2 + 1, ANCHO * 2 + 2, ANCHO + 2]
]

const PIEZA_S = [
    [ANCHO + 1, ANCHO + 2, ANCHO * 2, ANCHO * 2 + 1],
    [0, ANCHO, ANCHO + 1, ANCHO * 2 + 1],
    [ANCHO + 1, ANCHO + 2, ANCHO * 2, ANCHO * 2 + 1],
    [0, ANCHO, ANCHO + 1, ANCHO * 2 + 1]
]

const PIEZA_Z = [
    [ANCHO, ANCHO + 1, ANCHO * 2 + 1, ANCHO * 2 + 2],
    [1, ANCHO + 1, ANCHO, ANCHO * 2],
    [ANCHO, ANCHO + 1, ANCHO * 2 + 1, ANCHO * 2 + 2],
    [1, ANCHO + 1, ANCHO, ANCHO * 2]
]

const PIEZA_T = [
    [ANCHO, ANCHO + 1, 1, ANCHO + 2],
    [1, ANCHO + 1, ANCHO * 2 + 1, ANCHO + 2],
    [ANCHO, ANCHO + 1, ANCHO + 2, ANCHO * 2 + 1],
    [ANCHO, 1, ANCHO + 1, ANCHO * 2 + 1]
]

const PIEZA_O = [
    [0, 1, ANCHO, ANCHO + 1],
    [0, 1, ANCHO, ANCHO + 1],
    [0, 1, ANCHO, ANCHO + 1],
    [0, 1, ANCHO, ANCHO + 1]
]

const PIEZA_I = [
    [1, ANCHO + 1, ANCHO * 2 + 1, ANCHO * 3 + 1],
    [ANCHO, ANCHO + 1, ANCHO + 2, ANCHO + 3],
    [1, ANCHO + 1, ANCHO * 2 + 1, ANCHO * 3 + 1],
    [ANCHO, ANCHO + 1, ANCHO + 2, ANCHO + 3]
]

const PIEZAS = [PIEZA_J, PIEZA_L, PIEZA_Z, PIEZA_S, PIEZA_T, PIEZA_O, PIEZA_I];

let random = Math.floor(Math.random()*PIEZAS.length) //math floor para redondear numeros y math random para escoger una pieza aleatoria
let posicionActual = 4;
let rotacionActual = 0;
let actual = PIEZAS[random][rotacionActual];

//dibuja las piezas
function dibujarPieza() { 
    actual.forEach(index => {
        cuadrados[posicionActual + index].classList.add('pieza')
    })
}

//borra las piezas
function borrarPieza() { 
    actual.forEach(index => {
        cuadrados[posicionActual + index].classList.remove('pieza')
    })
}

//control de las piezas con keycodes
function control(evento){ 
    if(evento.keyCode == 37 || evento.keyCode == 65) { //flecha de izquierda o a
        izquierda();
    }
    else if(evento.keyCode == 38 || evento.keyCode == 87) { //flecha de arriba o w
        girar();
    }
    else if(evento.keyCode == 39 || evento.keyCode == 68) { //flecha de derecha o d
        derecha();
    }
    else if(evento.keyCode == 40 || evento.keyCode == 83) { //flecha de derecha o s
        bajarPieza();
    }
}
document.addEventListener('keydown', control)

//bajar piezas
function bajarPieza() {
    if(bajar == true) {
        borrarPieza();
        posicionActual += ANCHO;
        dibujarPieza();
        pararPiezas();
        finalJuego();
    }
}

//parar piezas cuando llegan abajo
function pararPiezas() {
    if(actual.some(index => cuadrados[posicionActual + index + ANCHO].classList.contains('posicionFinal'))) { //some sirve para que si alguno de los items del array es true se pase como true
        actual.forEach(index => cuadrados[posicionActual + index].classList.add('posicionFinal'))
        random = Math.floor(Math.random()*PIEZAS.length);
        actual = PIEZAS[random][rotacionActual];
        posicionActual = 4;
        dibujarPieza();
        añadirPuntuacion()
    }
}

//mover a la izquierda
function izquierda() {
    borrarPieza();
    const BORDE_IZQ = actual.some(index => (posicionActual + index) % ANCHO === 0); //Si alguna de las partes de la pieza al hacer la division entre WIDTH, que es el ancho de la cuadricula, su resto es igual a 0, significa que está en el borde

    if(!BORDE_IZQ) {
        posicionActual -=1;
    }

    if(actual.some(index => cuadrados[posicionActual + index].classList.contains('posicionFinal'))) { //si alguna de las partes de la pieza está dentro de posicionFinal la pieza se mueve a la derecha, como si no se hubiera movido
        posicionActual +=1;
    }

    dibujarPieza()
}

//mover a la derecha
function derecha() {
    borrarPieza();
    const BORDE_DER = actual.some(index => (posicionActual + index) % ANCHO === ANCHO -1);

    if(!BORDE_DER) {
        posicionActual +=1;
    }

    if(actual.some(index => cuadrados[posicionActual + index].classList.contains('posicionFinal'))) { //si alguna de las partes de la pieza está dentro de posicionFinal la pieza se mueve a la izquierda, como si no se hubiera movido
        posicionActual -=1;
    }

    dibujarPieza();
}

//girar
function girar() {

    const BORDE_IZQ = actual.some(index => (posicionActual + index) % ANCHO === 0);
    const BORDE_DER = actual.some(index => (posicionActual + index) % ANCHO === ANCHO -1);
    if(!BORDE_IZQ && !BORDE_DER) {
        borrarPieza();
        rotacionActual++;
        if(rotacionActual === actual.length) { //si la rotacion actual es igual al tamaño del array significa que ha llegado al final, por eso le damos valor 0, para que empiece de nuevo
            rotacionActual = 0;
        }
        actual = PIEZAS[random][rotacionActual];
        dibujarPieza();
    }
}

BOTONSTART.addEventListener('click', () => {
    if (temporizador) { //si temporizador no es null vamos a pausar el juego
        clearInterval(temporizador);
        temporizador = null;
    } else {
        dibujarPieza();
        if(puntuacion < 50){
            temporizador = setInterval(bajarPieza, 600);
        } else if(puntuacion => 30 && puntuacion < 70){
            temporizador = setInterval(bajarPieza, 500);
        } else if(puntuacion => 70 && puntuacion < 100) {
            temporizador = setInterval(bajarPieza, 300);
        } else {
            temporizador = setInterval(bajarPieza, 100);
        }


    }
})

//puntuacion
function añadirPuntuacion() {
    for (let i = 0; i < 199; i +=ANCHO) {
        const FILA = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7,i+8, i+9];

        if (FILA.every(index => cuadrados[index].classList.contains('posicionFinal'))) { //Si todos los cuadrados de las filas contienen posicion final 
            puntuacion +=10;
            function ver() {
                imagen.style.backgroundImage = "url('images/puntos.jpg')";
            }
            function quitar() {
                imagen.style.backgroundImage = "url('images/Captura3.jpg')";
            }
            ver();
            setTimeout(quitar, 1000);

            MARCADORPUNTOS.innerHTML = puntuacion; //se suman los 10 al marcador del archivo html
            FILA.forEach(index => {
                cuadrados[index].classList.remove('posicionFinal'); // se borra la fila completada
                cuadrados[index].classList.remove('pieza'); //borra la fila que pasaría a estar arriba
            })

            const CUADRADOS_BORRADOS = cuadrados.splice(i, ANCHO); // para sacar la fila
            cuadrados = CUADRADOS_BORRADOS.concat(cuadrados); //junta todos los cuadrados
            cuadrados.forEach(index => CUADRICULA.appendChild(index)); 
        }
        
    }
}

function finalJuego() {
    if(actual.some(index => cuadrados[posicionActual + index].classList.contains('posicionFinal')) || puntuacion == 200) { //si una nueva pieza contiene otra pieza
        clearInterval(temporizador);
        bajar = false;

        let imagen = document.getElementById("imagen");

        if(puntuacion == 200) {
            imagen.style.backgroundImage = "url('images/finalbueno.jpg')";
            swal("¡¡Enhorabuena!!","Has ganado.");
        } else {
            imagen.style.backgroundImage = "url('images/finalmalo.jpg')";
            swal("Has perdido...","Inténtalo de nuevo.");
        }

    }
}


})
