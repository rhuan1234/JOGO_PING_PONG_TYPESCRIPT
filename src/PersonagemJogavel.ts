class PersonagemJogavel extends Personagem{
    private controle:Controle;
    constructor(imagem:string,x:number,y:number,largura:number,altura:number,controle:Controle){
    super(imagem,x,y,largura,altura);
    this.controle=controle;
    }
    atualizar(deltaT: number): void {
    this.velX=0;
    this.velY=0;
    if(this.controle.cima && this.y > 0)
    this.velY=-0.3;
    else
    this.velY=0
    if(this.controle.baixo && this.y < 554 - this.altura)
    this.velY=0.3;
    if(this.controle.direita)
    this.velX=0.3;
    if(this.controle.esquerda)
    this.velX=-0.3;
    if(this.controle.bt1){
   // const pedra=new PersonagemComputavel("imagens/pedra.png",this.x,this.y,30,30,1);
    //jogo.adicionarDesenho(pedra);
    }
    
    super.atualizar(deltaT);
    }
   }