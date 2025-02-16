class Jogo{
    private contexto:CanvasRenderingContext2D;
    private largura=922;
    private altura=554;
    private tickTack=0;
    private tempoAnterior=0; //para calcular o deltaT
    public controle1: Controle;
    public controle2: Controle;
    public desenhos:Desenho[];
    public personagens:Personagem[];
    constructor(){
    this.personagens=[]
    this.desenhos=[];
    this.controle1=new Controle();
    this.controle2= new Controle();
    const body=document.querySelector("body")!;
    const canvas=document.createElement("canvas");
    canvas.width=this.largura;
    canvas.height=this.altura;
    canvas.style.backgroundImage="url('imagens/background.png')";
    canvas.style.backgroundSize = "cover"; // Ajusta a imagem para cobrir o canvas
    canvas.style.backgroundRepeat = "no-repeat"; // Evita repetição da imagem
    body.appendChild(canvas);
    this.contexto=canvas.getContext("2d")!;
    this.inicializar();
    }
    getRandomBetween(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
    inicializar(){
    const fundo=new Desenho("imagens/background.png",0,0,922,554);
    this.desenhos.push(fundo);

    const inimigo=new PersonagemComputavel("imagens/bola.png",436,227,50,50,this.getRandomBetween(-0.3, 0.3), 0.1 );
    this.desenhos.push(inimigo);
    this.personagens.push(inimigo);

    const jogador=new
   PersonagemJogavel("imagens/jogador1.png",50,100,40,150,this.controle2);
    this.desenhos.push(jogador);
    this.personagens.push(jogador);

    const jogador2=new
   PersonagemJogavel("imagens/jogador2.png",835,100,40,150,this.controle1);
    this.desenhos.push(jogador2);
    this.personagens.push(jogador2);
    }
    rodar(){
    this.tempoAnterior=Date.now();
    this.tickTack=setInterval(this.gameloop,17);//17
    }
    parar(){
    clearInterval(this.tickTack);
    }
    getPosX(obj: PersonagemJogavel): number {
        return obj.x;
    }
    
    gameloop=()=>{
    const tempoAgora=Date.now();
    const deltaT=tempoAgora-this.tempoAnterior;
    this.tempoAnterior=tempoAgora;
    
    //atualizar
    this.scored(this.personagens[0])
    this.atualizar(deltaT);
    //redesenhar
    this.desenhar();
 }
 get Controle1() {
 return this.controle1
 }

scored(bola: Personagem): void{
    if(bola.x<0){  
        let ponto_azul = parseInt(document.getElementById('right').innerText)
        ponto_azul += 1
        document.getElementById('right').innerText = (ponto_azul)
        if (ponto_azul==3){
            window.location.href = window.location.href;
        }
        bola.x = 436
        bola.y = 227
        bola.velX = this.getRandomBetween(-0.3, 0.3)
        bola.velX = this.getRandomBetween(-0.3, 0.3)
        while (bola.velX < 0.1 && bola.velX > -0.1)
            bola.velX = this.getRandomBetween(-0.3, 0.3)
    }
    else if(bola.x > 922){
        let ponto_vermelho = parseInt(document.getElementById('left').innerText)
        ponto_vermelho += 1
        document.getElementById('left').innerText = ponto_vermelho
        if (ponto_vermelho==3){
            window.location.href = window.location.href;
        }
        bola.x = 436
        bola.y = 227
        bola.velX = this.getRandomBetween(-0.3, 0.3)
        while (bola.velX < 0.1 && bola.velX > -0.1)
            bola.velX = this.getRandomBetween(-0.3, 0.3)
    }
}

 adicionarDesenho(d:Desenho){
 this.desenhos.push(d);
 }
 atualizar(deltaT:number){

 for(const d of this.desenhos)
 {
 if(d instanceof Personagem)
 (<Personagem>d).atualizar(deltaT);
 }
 if((this.desenhos[1] as Personagem).estaColidindo(this.desenhos[3] as Personagem) || (this.desenhos[1] as Personagem).estaColidindo(this.desenhos[2] as Personagem)){

if (this.personagens[0].velX > 0){
    this.personagens[0].velX = this.personagens[0].velX * -1 -(0.1)
}
else if (this.personagens[0].velX < 0)
    this.personagens[0].velX = this.personagens[0].velX * -1 + (0.1)

 console.log("colidiu");
 setTimeout(() => {
    console.log("Depois de 0.1 segundo");
}, 200);
}
 
 else
 console.log("longe");
 }

 desenhar(){
 this.contexto.clearRect(0,0,this.largura,this.altura);
 for(const d of this.desenhos)
 d.desenhar(this.contexto);
 }
}