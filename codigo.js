"use strict";
let jogo;
onload = function () {
    jogo = new Jogo();
};
let botaoplay = document.getElementById("play");
if (botaoplay) {
    botaoplay.addEventListener("click", function () {
        // Oculta a div ao clicar nela
        botaoplay.style.visibility = "hidden";
        jogo.rodar();
    });
}
onkeydown = function (evento) {
    //evento.preventDefault();
    switch (evento.code) {
        case "ArrowUp":
            jogo.controle1.cima = true;
            break;
        case "ArrowDown":
            jogo.controle1.baixo = true;
            break;
        case "KeyW":
            jogo.controle2.cima = true;
            break;
        case "KeyS":
            jogo.controle2.baixo = true;
            break;
        //case "ArrowRight": jogo.controle1.direita=true; break;
        //case "ArrowLeft": jogo.controle1.esquerda=true; break;
        //case "Space": jogo.controle1.bt1=true; break;
        case "AltLeft":
            jogo.controle1.bt2 = true;
            break;
    }
};
onkeyup = function (evento) {
    //evento.preventDefault();
    switch (evento.code) {
        case "ArrowUp":
            jogo.controle1.cima = false;
            break;
        case "ArrowDown":
            jogo.controle1.baixo = false;
            break;
        case "KeyW":
            jogo.controle2.cima = false;
            break;
        case "KeyS":
            jogo.controle2.baixo = false;
            break;
        //case "ArrowRight": jogo.controle1.direita=false; break;
        //case "ArrowLeft": jogo.controle1.esquerda=false; break;
        //case "Space": jogo.controle1.bt1=false; break;
        case "AltLeft":
            jogo.controle1.bt2 = false;
            break;
    }
};
class Controle {
    constructor() {
        this.cima = false;
        this.baixo = false;
        this.direita = false;
        this.esquerda = false;
        this.bt1 = false;
        this.bt2 = false;
    }
}
class Desenho {
    constructor(imagem, x, y, largura, altura) {
        this.x = x;
        this.y = y;
        this.altura = altura;
        this.largura = largura;
        this.imagem = new Image();
        this.imagem.src = imagem;
    }
    desenhar(contexto) {
        contexto.drawImage(this.imagem, this.x, this.y, this.largura, this.altura);
    }
}
class Jogo {
    constructor() {
        this.largura = 922;
        this.altura = 554;
        this.tickTack = 0;
        this.tempoAnterior = 0; //para calcular o deltaT
        this.gameloop = () => {
            const tempoAgora = Date.now();
            const deltaT = tempoAgora - this.tempoAnterior;
            this.tempoAnterior = tempoAgora;
            //atualizar
            this.scored(this.personagens[0]);
            this.atualizar(deltaT);
            //redesenhar
            this.desenhar();
        };
        this.personagens = [];
        this.desenhos = [];
        this.controle1 = new Controle();
        this.controle2 = new Controle();
        const body = document.querySelector("body");
        const canvas = document.createElement("canvas");
        canvas.width = this.largura;
        canvas.height = this.altura;
        canvas.style.backgroundImage = "url('imagens/background.png')";
        canvas.style.backgroundSize = "cover"; // Ajusta a imagem para cobrir o canvas
        canvas.style.backgroundRepeat = "no-repeat"; // Evita repetição da imagem
        body.appendChild(canvas);
        this.contexto = canvas.getContext("2d");
        this.inicializar();
    }
    getRandomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }
    inicializar() {
        const fundo = new Desenho("imagens/background.png", 0, 0, 922, 554);
        this.desenhos.push(fundo);
        const inimigo = new PersonagemComputavel("imagens/bola.png", 436, 227, 50, 50, this.getRandomBetween(-0.3, 0.3), 0.1);
        this.desenhos.push(inimigo);
        this.personagens.push(inimigo);
        const jogador = new PersonagemJogavel("imagens/jogador1.png", 50, 100, 40, 150, this.controle2);
        this.desenhos.push(jogador);
        this.personagens.push(jogador);
        const jogador2 = new PersonagemJogavel("imagens/jogador2.png", 835, 100, 40, 150, this.controle1);
        this.desenhos.push(jogador2);
        this.personagens.push(jogador2);
    }
    rodar() {
        this.tempoAnterior = Date.now();
        this.tickTack = setInterval(this.gameloop, 17); //17
    }
    parar() {
        clearInterval(this.tickTack);
    }
    getPosX(obj) {
        return obj.x;
    }
    get Controle1() {
        return this.controle1;
    }
    scored(bola) {
        if (bola.x < 0) {
            let ponto_azul = parseInt(document.getElementById('right').innerText);
            ponto_azul += 1;
            document.getElementById('right').innerText = (ponto_azul);
            if (ponto_azul == 3) {
                window.location.href = window.location.href;
            }
            bola.x = 436;
            bola.y = 227;
            bola.velX = this.getRandomBetween(-0.3, 0.3);
            bola.velX = this.getRandomBetween(-0.3, 0.3);
            while (bola.velX < 0.1 && bola.velX > -0.1)
                bola.velX = this.getRandomBetween(-0.3, 0.3);
        }
        else if (bola.x > 922) {
            let ponto_vermelho = parseInt(document.getElementById('left').innerText);
            ponto_vermelho += 1;
            document.getElementById('left').innerText = ponto_vermelho;
            if (ponto_vermelho == 3) {
                window.location.href = window.location.href;
            }
            bola.x = 436;
            bola.y = 227;
            bola.velX = this.getRandomBetween(-0.3, 0.3);
            while (bola.velX < 0.1 && bola.velX > -0.1)
                bola.velX = this.getRandomBetween(-0.3, 0.3);
        }
    }
    adicionarDesenho(d) {
        this.desenhos.push(d);
    }
    atualizar(deltaT) {
        for (const d of this.desenhos) {
            if (d instanceof Personagem)
                d.atualizar(deltaT);
        }
        if (this.desenhos[1].estaColidindo(this.desenhos[3]) || this.desenhos[1].estaColidindo(this.desenhos[2])) {
            if (this.personagens[0].velX > 0) {
                this.personagens[0].velX = this.personagens[0].velX * -1 - (0.1);
            }
            else if (this.personagens[0].velX < 0)
                this.personagens[0].velX = this.personagens[0].velX * -1 + (0.1);
            console.log("colidiu");
            setTimeout(() => {
                console.log("Depois de 0.1 segundo");
            }, 200);
        }
        else
            console.log("longe");
    }
    desenhar() {
        this.contexto.clearRect(0, 0, this.largura, this.altura);
        for (const d of this.desenhos)
            d.desenhar(this.contexto);
    }
}
class Personagem extends Desenho {
    constructor() {
        super(...arguments);
        this.velx = 0;
        this.vely = 0;
    }
    set velX(velx) {
        this.velx = velx;
    }
    get velX() {
        return this.velx;
    }
    set velY(vely) {
        this.vely = vely;
    }
    get velY() {
        return this.vely;
    }
    atualizar(deltaT) {
        this.x = this.x + this.velx * deltaT;
        this.y = this.y + this.vely * deltaT;
    }
    estaColidindo(p) {
        if (p.x <= this.x + this.largura && this.x <= p.x + p.largura)
            if (p.y <= this.y + this.altura && this.y <= p.y + p.altura)
                return true;
        return false;
    }
}
class PersonagemComputavel extends Personagem {
    constructor(imagem, x, y, largura, altura, velinicialy, velinicialx) {
        super(imagem, x, y, largura, altura);
        this.velY = velinicialy;
        this.velX = velinicialx;
    }
    atualizar(deltaT) {
        if (this.y > 554 - this.altura)
            this.velY *= -1;
        if (this.y < 0)
            this.velY *= -1;
        super.atualizar(deltaT);
    }
    getVelY() {
        return this.velY;
    }
    getVelX() {
        return this.velX;
    }
}
class PersonagemJogavel extends Personagem {
    constructor(imagem, x, y, largura, altura, controle) {
        super(imagem, x, y, largura, altura);
        this.controle = controle;
    }
    atualizar(deltaT) {
        this.velX = 0;
        this.velY = 0;
        if (this.controle.cima && this.y > 0)
            this.velY = -0.3;
        else
            this.velY = 0;
        if (this.controle.baixo && this.y < 554 - this.altura)
            this.velY = 0.3;
        if (this.controle.direita)
            this.velX = 0.3;
        if (this.controle.esquerda)
            this.velX = -0.3;
        if (this.controle.bt1) {
            // const pedra=new PersonagemComputavel("imagens/pedra.png",this.x,this.y,30,30,1);
            //jogo.adicionarDesenho(pedra);
        }
        super.atualizar(deltaT);
    }
}
