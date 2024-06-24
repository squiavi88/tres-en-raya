/********************VARIABLES********************/
let maquina = false; // variable booleana para iniciar la IA
let tablero = []; // array para dibujar el tablero
/* variable "turno" actuara como un contador (al llegar a 4 entrara en una condición que cambiara 
 de true a false la variable booleana maquina al pasar esto no genera otro número aleatorio y 
 podremos terminar con la partida en la opción 9 fichas ya que si no hacemos esto generara
  un numero aleatorio el cual ocasionara un error ya que nuestro tablero tiene 9 celdas) */
let turno = 0;
let jugador = "X"; // ficha para el jugador
let x; // variable para dar una posicion a la IA
let y; // variable para dar una posicion a la IA
/* "contadorTurnoEmpate" actuara como contador (una vez llegue a 9 entrara en una condición para
   sumar el empate en ambos jugadores)*/
let contadorTurnoEmpate = 1;
let contadorModoInfinito = 1;// variable que nos ayudara en la opción de 6 fichas
let modo6Fichas = false; // variable booleana para iniciar el modo 6 fichas 
let terminar = true; // variabble para terminar el modo 6 fichas
let jugadorActual = document.getElementById("jugador"); // variable para mostrar el turno de jugador
let modo6FichasIA = false;
let modo9fichas = false;
let maquina6fichas = false;

/*********VARIABLES PARA SUMAR LOS RESULTADOS**********/
let partidasEmpatadasJ1 = 0;
let partidasPerdidasJ1 = 0;
let partidasGanadasJ1 = 0;
let partidasEmpatadasJ2 = 0;
let partidasPerdidasJ2 = 0;
let partidasGanadasJ2 = 0;

/****************** VARIABLES PARA TIEMPO **********************/
let tiempo = document.getElementById("contador");
// la variable temporizador actuara como un contador para nuestra cuenta regresiva
let temporizador = 30;
let bandera = false;
let cuentaAtras = false;
let tiempoFinal = null;
let cronometro = null;
let m = 0; // contador de minutos
let s = 0;// contador de segundos

/*****************ESCOGE MODO DE JUEGO***********************/
function escoger() {
  if (document.getElementById("cb-1").checked && document.getElementById("cb-3").checked) {
    document.getElementById("cb-1").disabled = true;
    document.getElementById("cb-2").disabled = true;
    document.getElementById("cb-3").disabled = true;
    document.getElementById("cb-4").disabled = true;
    document.getElementById("jugar").disabled = true;
    modo6Fichas = true;
    jugar();
  } else if (document.getElementById("cb-1").checked && document.getElementById("cb-4").checked) {
    document.getElementById("cb-1").disabled = true;
    document.getElementById("cb-2").disabled = true;
    document.getElementById("cb-3").disabled = true;
    document.getElementById("cb-4").disabled = true;
    document.getElementById("jugar").disabled = true;
    modo6FichasIA = true;
    maquina6fichas = true;
    jugar();
  } else if (document.getElementById("cb-2").checked && document.getElementById("cb-4").checked) {
    document.getElementById("cb-1").disabled = true;
    document.getElementById("cb-2").disabled = true;
    document.getElementById("cb-3").disabled = true;
    document.getElementById("cb-4").disabled = true;
    document.getElementById("jugar").disabled = true;
    modo9fichas = true;
    maquina = true;
    jugar();
  } else if (document.getElementById("cb-2").checked && document.getElementById("cb-3").checked) {
    document.getElementById("cb-1").disabled = true;
    document.getElementById("cb-2").disabled = true;
    document.getElementById("cb-3").disabled = true;
    document.getElementById("cb-4").disabled = true;
    document.getElementById("jugar").disabled = true;
    modo9fichas = true;
    jugar();
  }
}
/***************AUTOPLAY**************/
function jugar() {
  pintarTablero();
  seleccionaCasilla();
}
/***************TABLERO*****************/
function pintarTablero() {
  for (let i = 0; i < 3; i++) {
    tablero[i] = [];
    for (let j = 0; j < 3; j++) {
      tablero[i][j] = 0;
    }
  }
}

/************CAMBIO JUGADOR***********/
function cambioJugador(jgd) {
  if (jgd == "X") {
    jugador = "O";
  } else {
    jugador = "X";
  }
}

/****************RIVAL***************/
let contadorIA = 1;
function IA() {
  function aleatorio() {
    x = Math.round(Math.random() * 2);
    y = Math.round(Math.random() * 2);
    return [x, y];
  }
  var [x, y] = aleatorio();
  if (contadorIA <= 3) {
    while (tablero[x][y] != 0) {
      var [x, y] = aleatorio();
    }
  }
  if (contadorIA > 3 && contadorIA % 2 == 0) {
    while (tablero[x][y] != jugador) {
      var [x, y] = aleatorio();

    }
  }
  if (contadorIA >= 4 && contadorIA % 2 == 1) {
    while (tablero[x][y] != 0) {
      var [x, y] = aleatorio();
    }
  }
  if (modo6FichasIA) { // solo si la variable es true
    contadorIA++;
  }
  return [x, y];
}
/************PINTAR CASILLA 9 FICHAS***********/
function pintarCasilla(x, y) {
  if (contadorTurnoEmpate <= 9) {
    empezarNuevoConteoAtras();
    let casilla = document.getElementById(x + "" + y);
    casilla.innerHTML = jugador;
    casilla.disabled = true;

    if (jugador == "X") {
      casilla.style.color = "#2732a4";// con esta propiedad cambiamos el color de la ficha
    } else {
      casilla.style.color = "#227c1a"// con esta propiedad cambiamos el color de la ficha
    }

    if (bandera == false) {
      time();
      bandera = true;
    }

    if (cuentaAtras == false) {
      cuenta();
      cuentaAtras = true;
    }

    if (jugador == "O") {
      tablero[x][y] = jugador;
      // cambiaremos la variable jugadorActual que almacena el valor ID de de un elemento del index por X
      jugadorActual.innerHTML = " " + '"X"';
      jugadorActual.style.color = "#2732a4";// cambiaremos el color de la ficha X
      comprobarJuego(jugador, contadorTurnoEmpate);
      cambioJugador(jugador);

    } else if (jugador == "X") {
      tablero[x][y] = jugador;
      // cambiaremos la variable jugadorActual que almacena el valor ID de de un elemento del index por O
      jugadorActual.innerHTML = " " + '"O"';
      jugadorActual.style.color = "#227c1a"; // cambiaremos el color de la ficha O
      comprobarJuego(jugador, contadorTurnoEmpate);
      cambioJugador(jugador);
    }
    contadorTurnoEmpate++;
  }
}

/************PINTAR CASILLA 6 FICHAS****************/
function pintarCasilla6fichas(x, y) {
  if (contadorModoInfinito < 6) {
    empezarNuevoConteoAtras();
  }
  let casilla = document.getElementById(x + "" + y);
  casilla.innerHTML = jugador;
  casilla.disabled = true;
  if (jugador == "X") {
    casilla.style.color = "#2732a4"; // cambiaremos el color de la ficha X
  } else {
    casilla.style.color = "#227c1a"; // cambiaremos el color de la ficha O
  }
  if (bandera == false) {
    time();
    bandera = true;
  }
  if (contadorModoInfinito < 6) {
    if (cuentaAtras == false) {
      cuenta();
      cuentaAtras = true;
    }
  }
  tablero[x][y] = jugador;
  comprobarJuego(jugador);
  cambioJugador(jugador);

  if (contadorModoInfinito < 6) {
    jugadorActual.innerHTML = " " + '"' + jugador + '"';
    if (jugador == "X") {
      jugadorActual.style.color = "#2732a4"; // cambiamos el color de jugador X
    } else {
      jugadorActual.style.color = "#227c1a";// cambiamos el color de jugador O
    }
  }

  if (contadorModoInfinito > 6 && contadorModoInfinito % 2 == 1) {
    document.getElementById(x + "" + y).innerHTML = "";
    tablero[x][y] = 0;
    habilitarCeldas(jugador);
    cambioJugador(jugador);
    bloqueoDiferenteCero();
  }
  if (terminar) {

    if (contadorModoInfinito >= 6 && contadorModoInfinito % 2 == 0) {
      jugadorActual.innerHTML = " " + '"' + jugador + '"';
      if (jugador == "X") {
        jugadorActual.style.color = "#2732a4";// cambiamos el color de jugador X
      } else {
        jugadorActual.style.color = "#227c1a";// cambiamos el color de jugador O
      }
      empezarNuevoConteoAtras();
      if (cuentaAtras == false) {
        cuenta();
        cuentaAtras = true;
      }
      habilitar(jugador); //habilito las fichas bloqueadas anteriormente
      // cambio la ficha para bloquear en la siguiente funcion las celdas donde no hay ficha y las celdas donde hay fichas del rival
      cambioJugador(jugador);
      deshabilitar(jugador);
      cambioJugador(jugador);
    }
  }
  contadorModoInfinito++;
}

function bloqueoDiferenteCero() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (tablero[i][j] != 0) {
        document.getElementById(i + "" + j).disabled = true;
      }
    }
  }
}

function habilitarCeldas(jugador) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (tablero[i][j] == 0) {
        document.getElementById(i + "" + j).disabled = false;
      }
      if (tablero[i][j] == jugador) {
        document.getElementById(i + "" + j).disabled = true;
      }
    }
  }
}

function habilitar(jugador) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (tablero[i][j] == jugador) {
        document.getElementById(i + "" + j).disabled = false;
      }
    }
  }
}

function deshabilitar(jugador) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (tablero[i][j] == 0) {
        document.getElementById(i + "" + j).disabled = true;
      }
      if (tablero[i][j] == jugador) {
        document.getElementById(i + "" + j).disabled = true;
      }
    }
  }
}
let turnoJugador6fichas = 1;
let intercalaturnos = 2;
/**********SELECCIONA CASILLA*********/
function seleccionaCasilla(x, y) {
  if (modo6Fichas) {
    pintarCasilla6fichas(x, y);
  }
  if (modo9fichas) {
    pintarCasilla(x, y);
    if (maquina) {
      var [x, y] = IA();
      pintarCasilla(x, y);
      turno++;
    }
    if (turno == 4) {
      maquina = false;
    }
  }
  if (modo6FichasIA) {
    if (turnoJugador6fichas < 4) {
      pintarCasilla6fichas(x, y);
      if (maquina6fichas) {
        var [x, y] = IA();
        pintarCasilla6fichas(x, y);
      }
    }
    if (turnoJugador6fichas >= 4) {
      if (intercalaturnos % 2 == 0) {
        pintarCasilla6fichas(x, y);
      } else {
        pintarCasilla6fichas(x, y);
        if (terminar) {
          for (let i = 0; i < 2; i++) {
            var [x, y] = IA();
            pintarCasilla6fichas(x, y);
          }
        }
      }
      intercalaturnos++;
    }
    turnoJugador6fichas++;

  }
}

/*********************SUMA RESULTADO******************/
function sumaResultado(jugador) {
  if (jugador == "X") {
    partidasGanadasJ1 = partidasGanadasJ1 + 1;
    partidasPerdidasJ2 = partidasPerdidasJ2 + 1;
    document.getElementById("ganadas-JX").innerHTML = partidasGanadasJ1;
    document.getElementById("perdidas-JO").innerHTML = partidasPerdidasJ2;
    jugadorActual.innerHTML = "";
    document.getElementById("ganador").innerHTML = "GANADOR JUGADOR " + jugador + " !!";
    parartiempo();
    bloquearTablero();
  } else {
    partidasGanadasJ2 = partidasGanadasJ2 + 1;
    partidasPerdidasJ1 = partidasPerdidasJ1 + 1;
    document.getElementById("ganadas-JO").innerHTML = partidasGanadasJ2;
    document.getElementById("perdidas-JX").innerHTML = partidasPerdidasJ1;
    document.getElementById("ganador").innerHTML = "GANADOR JUGADOR " + jugador + " !!"
    parartiempo();
    bloquearTablero();
  }
}
/***************COMPROBAR JUEGO*****************/
function comprobarJuego(jugador, contadorTurnoEmpate) {
  ///////COMPROBAR FILAS////////
  if ((jugador == tablero[0][0] && jugador == tablero[1][0] && jugador == tablero[2][0]) ||
    (jugador == tablero[0][1] && jugador == tablero[1][1] && jugador == tablero[2][1]) ||
    (jugador == tablero[0][2] && jugador == tablero[1][2] && jugador == tablero[2][2])) {
    sumaResultado(jugador);
    //////COMPROBAR COLUMNAS/////
  } else if (
    (jugador == tablero[0][0] && jugador == tablero[0][1] && jugador == tablero[0][2]) ||
    (jugador == tablero[1][0] && jugador == tablero[1][1] && jugador == tablero[1][2]) ||
    (jugador == tablero[2][0] && jugador == tablero[2][1] && jugador == tablero[2][2])) {
    sumaResultado(jugador);
    ////////COMPROBAR DIAGONALES///////
  } else if ((jugador == tablero[0][0] && jugador == tablero[1][1] && jugador == tablero[2][2]) ||
    (jugador == tablero[2][0] && jugador == tablero[1][1] && jugador == tablero[0][2])) {
    sumaResultado(jugador);
  } else if (contadorTurnoEmpate == 9) {
    document.getElementById("ganador").innerHTML = "EMPATARON !!";
    partidasEmpatadasJ1 = partidasEmpatadasJ1 + 1;
    partidasEmpatadasJ2 = partidasEmpatadasJ2 + 1;
    document.getElementById("empatadas-JX").innerHTML = partidasEmpatadasJ1;
    document.getElementById("empatadas-JO").innerHTML = partidasEmpatadasJ2;
    parartiempo();
  }
}
/*************REINICIAR************/
function reiniciar() {
  //////////////VARIABLES//////////////
  jugador = "X"; // ficha del jugador
  contadorTurnoEmpate = 1; //contador para sumar los empates
  contadorModoInfinito = 1;
  turno = 0; // variable para terminar con la IA
  terminar = true; // variable para no entrar al control de errores de la opcion 6 fichas
  tiempo.innerHTML = "00:30"; // restablece el contador regresivo
  document.getElementById("ganador").innerHTML = ""; // limpiamos el jugador ganador
  turnoJugador6fichas = 1;
  intercalaturnos = 2;
  contadorIA = 1;

  ////////////LIMPIAR TABLERO///////////
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      document.getElementById(i + "" + j).innerHTML = "";// limpiamos el tablero
      document.getElementById(+i + "" + j).disabled = false; // habilitamos las celdas o botones
    }
  }
  //////////// OPCION 9 FICHAS J1 VS J2////////////
  if (document.getElementById("cb-2").checked && document.getElementById("cb-3").checked) {
    modo9fichas = true;
  }
  ////////////OPCION 9 FICHAS J1 VS IA///////////
  if (document.getElementById("cb-2").checked && document.getElementById("cb-4").checked) {
    modo9fichas = true;
    maquina = true;  //restablecemos la variable maquina
  }
  ////////////OPCION 6 FICHAS J1 VS J2///////////
  if (document.getElementById("cb-1").checked && document.getElementById("cb-3").checked) {
    modo6Fichas = true;  //restablecemos la opcion de juego 6 fichas
  }
  ////////////OPCION 6 FICHAS J1 VS IA///////////
  if (document.getElementById("cb-1").checked && document.getElementById("cb-4").checked) {
    modo6FichasIA = true;
    maquina6fichas = true;
  }
  pintarTablero(); // pintamos el tablero
  empezarNuevoConteoAtras();// restablecemos las variables para el nuevo conteo regresivo
}

/*************BLOQUEAR TABLERO************/
function bloquearTablero() {
  terminar = false;
  maquina = false;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      document.getElementById(i + "" + j).disabled = true;
    }
  }
}

/***************RESTABLECER VALORES CUENTA REGRESIVA****************
 * ****/
function empezarNuevoConteoAtras() {
  parartiempo();
  cuentaAtras = false;
  temporizador = 30;
}

function parartiempo() {
  clearInterval(tiempoFinal);
}
/*****************CUENTA REGRESIVO********************/
function cuenta() {
  tiempoFinal = setInterval(() => {
    temporizador--;
    console.log(temporizador);

    if (temporizador < 10) {
      tiempo.innerHTML = "00:0" + temporizador;
    } else {
      tiempo.innerHTML = "00:" + temporizador;
    }

    if (temporizador == 0) {
      parartiempo();
      cambioJugador(jugador);
      sumaResultado(jugador);
      bloquearTablero();
    }
  }, 1000);
}
/***************TIEMPO DE JUEGO****************/
function time() {
  cronometro = setInterval(() => {
    s++;
    if (s < 10) {
      segundos.innerHTML = "0" + s;
    } else {
      segundos.innerHTML = s;
    }
    if (s == 60) {
      s = 0;
      m++;
      if (m < 10) {
        minutos.innerHTML = "0" + m;
      } else {
        minutos.innerHTML = m;
      }
    }
  }, 1000);
}
/******************DETENER EL JUEGO***********************/
function detenerJuego() {
  // habilitamos los checkboxes y el botón de jugar
  document.getElementById("cb-1").disabled = false;
  document.getElementById("cb-2").disabled = false;
  document.getElementById("cb-3").disabled = false;
  document.getElementById("cb-4").disabled = false;
  document.getElementById("jugar").disabled = false;
  // Restablecemos las variables para sumar las partidas ganadas, perdidas y empatadas
  partidasEmpatadasJ1 = 0;
  partidasPerdidasJ1 = 0;
  partidasGanadasJ1 = 0;
  partidasEmpatadasJ2 = 0;
  partidasPerdidasJ2 = 0;
  partidasGanadasJ2 = 0;
  document.getElementById("ganadas-JX").innerHTML = "0";
  document.getElementById("perdidas-JO").innerHTML = "0";
  document.getElementById("ganadas-JO").innerHTML = "0";
  document.getElementById("perdidas-JX").innerHTML = "0";
  document.getElementById("empatadas-JX").innerHTML = "0";
  document.getElementById("empatadas-JO").innerHTML = "0";
  //////////////VARIABLES//////////////
  jugador = "X"; // ficha del jugador 
  console.log(jugador);
  contadorTurnoEmpate = 1; //contador para sumar los empates
  contadorModoInfinito = 1;
  turno = 0; // variable para terminar con la IA
  terminar = true; // variable para no entrar al control de errores de la opcion 6 fichas
  tiempo.innerHTML = "00:30"; // restablece el contador regresivo
  document.getElementById("ganador").innerHTML = ""; // limpiamos el jugador ganador
  turnoJugador6fichas = 1;
  intercalaturnos = 2;
  contadorIA = 1;
  ////////////LIMPIAR TABLERO///////////
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      document.getElementById(i + "" + j).innerHTML = "";// limpiamos el tablero
      document.getElementById(+i + "" + j).disabled = false; // habilitamos las celdas o botones
    }
  }
  modo9fichas = false;
  maquina = false;
  modo6FichasIA = false;
  maquina6fichas = false;
  modo6Fichas = false;
  empezarNuevoConteoAtras();
}
