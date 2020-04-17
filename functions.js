function nuevoJuego(){
    document.querySelector("#sonidoInicio").play();
    $botonInicio.disabled = true;
    setTimeout(() => {
        nuevoTurno();
    }, 2000);
    
}

function nuevoTurno(){
    actulizarRonda();
    turnoMaquina();
    turnoJugador();
}

function actulizarRonda(){
    document.querySelector("#numeroRonda").textContent++;

}

function turnoMaquina(){
    bloquearEntradaUsuario()
    actualizarEstado("TURNO DE SIMON");
    generarCuadroAleatorio();
    resaltarSecuancia(memoriaMaquina);

}

function turnoJugador(){
    memoriaJugador=[];
    setTimeout(() => {
        actualizarEstado("TU TURNO");
        habilitarEntradaUsuario();
    }, memoriaMaquina.length*1000);
    
}

function actualizarEstado(estado){
    document.querySelector("#estado").textContent = estado;
}

function bloquearEntradaUsuario(){

    let $cuadros = document.querySelectorAll(".cuadro");
    $cuadros.forEach(
        function(cuadro){
            cuadro.onclick = function(){

            }
        }
    );

}

function generarCuadroAleatorio(){
    let $cuadros = document.querySelectorAll(".cuadro");
    let numeroAleatorio = Math.floor(Math.random()*$cuadros.length);
    memoriaMaquina.push($cuadros[numeroAleatorio]);
  
}

function habilitarEntradaUsuario(){
    let $cuadros = document.querySelectorAll(".cuadro");
    $cuadros.forEach(
        function(cuadro,index){
            cuadro.onclick = function(e){
            memoriaJugador.push(e.target);
            validar(memoriaJugador);

            document.querySelector("#sonidoJugador").play();
            e.target.style.opacity = 1;
            e.target.style.border = "black 1.5px solid";

            setTimeout(() => {
            e.target.style.opacity = 0.5;
            e.target.style.border = "0px";
            
            },300);   

            
            }
        }


    );
}


function validar(secuencia){
    let numeroDeExitos = 0;
    secuencia.forEach(
        function(elementoMemoria,index){
            if(elementoMemoria !== memoriaMaquina[index]){
                document.querySelector("#sonidoGameover").play();
                actualizarEstado("HAS PERDIDO :(");
                bloquearEntradaUsuario();
                guardarPuntaje(memoriaMaquina.length);
                estadoZero();
                
            }
            if(elementoMemoria === memoriaMaquina[index]){numeroDeExitos++;}

        }
    );
 
   if(numeroDeExitos === memoriaMaquina.length && numeroDeExitos){
       document.querySelector("#sonidoSiguienteRonda").play()
        bloquearEntradaUsuario()
        setTimeout(() => {
        nuevoTurno();
        }, 1000);
       
   }

}

function estadoZero(){
    document.querySelector("#numeroRonda").textContent = 0;
    memoriaMaquina = [];
    memoriaJugador = [];
    setTimeout(() => {
        actualizarEstado("PULSA COMENZAR A JUGAR ^-^")
        $botonInicio.disabled = false;
    }, 2000);

}
function resaltarSecuancia(secuencia){
    secuencia.forEach(
        function(elementoSecuencia,index){
        
        setTimeout(() => {
        document.querySelector("#sonidoSimon").play();
        elementoSecuencia.style.opacity = 1;
        elementoSecuencia.style.border = "black 1.5px solid";
        }, index*1000);
        setTimeout(() => {
        elementoSecuencia.style.opacity = 0.5;
        elementoSecuencia.style.border = "0px";
        }, (index+0.5)*1000);    
    }
    
    );
    
}

function guardarPuntaje(puntaje){
    let puntajeReal=puntaje-1;
    document.querySelector("#mensajeNombreUsuario").textContent = `Has obtenido una puntuacion de ${puntajeReal}, cual es tu nombre?`;
    document.querySelector("#nombreUsuario").classList.remove("d-none");
    document.querySelector("#botonNombreUsuario").classList.remove("d-none");
    document.querySelector("#botonNombreUsuario").onclick = function(){
        const $panelPuntaje = document.querySelector("#mensajeNombreUsuario");
        const $nombresJugadores = document.querySelectorAll(".h5");
        const $nombreUsuario = document.querySelector("#nombreUsuario").value;
        const $puntajes = document.querySelectorAll(".puntajes");
        for(i=0;i<$puntajes.length;i++){
            if(puntajeReal >= Number($puntajes[i].textContent)){
                $nombresJugadores[i].textContent = `${i+1} ~ ${$nombreUsuario} : `;
                $puntajes[i].textContent = puntajeReal;
                document.querySelector("#nombreUsuario").classList.add("d-none");
                document.querySelector("#botonNombreUsuario").classList.add("d-none");
                $panelPuntaje.textContent = "TERMINA TU PARTIDA PARA PODER REGISTRARLA";
                break;
            }
        }
        
    }
}
