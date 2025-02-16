class PersonagemComputavel extends Personagem{
    constructor(imagem:string,x:number,y:number,largura:number,altura:number,velinicialy:number, velinicialx: number){
    super(imagem,x,y,largura,altura);
    this.velY=velinicialy;
    this.velX=velinicialx;
    }
    atualizar(deltaT: number): void {
    if(this.y>554 - this.altura)
    this.velY*=-1;
    if(this.y<0)
    this.velY*=-1;
    super.atualizar(deltaT);
    }
    getVelY(): number{
        return this.velY
    }
    getVelX(): number{
        return this.velX
    }
   }