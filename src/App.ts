let jogo: Jogo;
onload = function () {
 jogo = new Jogo();
 
}
let botaoplay = document.getElementById("play")
    if (botaoplay) {
        botaoplay.addEventListener("click", function() {
            // Oculta a div ao clicar nela
            botaoplay.style.visibility = "hidden"
            jogo.rodar();
        });
    }


onkeydown = function (evento) {
 //evento.preventDefault();
 switch (evento.code) {
 case "ArrowUp": jogo.controle1.cima=true; break;
 case "ArrowDown": jogo.controle1.baixo=true; break;
 case "KeyW": jogo.controle2.cima=true; break;
case "KeyS": jogo.controle2.baixo=true; break;
 //case "ArrowRight": jogo.controle1.direita=true; break;
 //case "ArrowLeft": jogo.controle1.esquerda=true; break;
 //case "Space": jogo.controle1.bt1=true; break;
 case "AltLeft": jogo.controle1.bt2=true; break;
 }
}
onkeyup=function (evento) {
 //evento.preventDefault();
 switch (evento.code) {
 case "ArrowUp": jogo.controle1.cima=false; break;
 case "ArrowDown": jogo.controle1.baixo=false; break;
 case "KeyW": jogo.controle2.cima=false; break;
 case "KeyS": jogo.controle2.baixo=false; break;
 //case "ArrowRight": jogo.controle1.direita=false; break;
 //case "ArrowLeft": jogo.controle1.esquerda=false; break;
 //case "Space": jogo.controle1.bt1=false; break;
 case "AltLeft": jogo.controle1.bt2=false; break;
 }
}

