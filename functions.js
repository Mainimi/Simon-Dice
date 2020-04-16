function iniciarJuego(){
    turnoMaquina();
    turnoJugador();
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

    $cuadros = document.querySelectorAll(".cuadro");
    $cuadros.forEach(
        function(cuadro){
            cuadro.onclick = function(){

            }
        }
    );

}

function generarCuadroAleatorio(){
    $cuadros = document.querySelectorAll(".cuadro");
    let numeroAleatorio = Math.floor(Math.random()*$cuadros.length);
    memoriaMaquina.push($cuadros[numeroAleatorio]);
}

function habilitarEntradaUsuario(){
    $cuadros = document.querySelectorAll(".cuadro");
    $cuadros.forEach(
        function(cuadro,index){
            cuadro.onclick = function(e){
            memoriaJugador.push(e.target);


            e.target.style.opacity = 1;
            e.target.style.border = "black 1.5px solid";
            setTimeout(() => {
            e.target.style.opacity = 0.5;
            e.target.style.border = "0px";
            validar();
            },500);    
            
            }
        }


    );
}


function validar(){
    memoriaJugador.forEach(
        function(elementoMemoria,index){
            if(elementoMemoria !== memoriaMaquina[index]){
                actualizarEstado("HAS PERDIDO :(");
                bloquearEntradaUsuario();
            }else{
                if(memoriaMaquina.length === memoriaJugador.length){
                    setTimeout(() => {
                        iniciarJuego();
                    },1000);
                }
            }

        }
    );

}
function resaltarSecuancia(secuencia){
    secuencia.forEach(
        function(elementoSecuencia,index){
           
        setTimeout(() => {
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

