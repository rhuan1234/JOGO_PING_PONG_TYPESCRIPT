class Desenho{
    public x:number;
    public y:number;
    protected altura:number;
    protected largura:number;
    protected imagem:HTMLImageElement;
    constructor(imagem:string,x:number,y:number,largura:number,altura:number){
    this.x=x;
    this.y=y;
    this.altura=altura;
    this.largura=largura;
    this.imagem = new Image();
    this.imagem.src =imagem;
   
    }
    
    desenhar(contexto:CanvasRenderingContext2D){
    contexto.drawImage(this.imagem,this.x,this.y,this.largura,this.altura);
    }
   }