abstract class Personagem extends Desenho{
    public velx=0;
    public vely=0;
   
    set velX(velx:number){
    this.velx=velx;
    }
    get velX(){
    return this.velx;
    }
    set velY(vely:number){
    this.vely=vely;
    }
    get velY(){
    return this.vely;
    }
    atualizar(deltaT:number){
    this.x=this.x+this.velx*deltaT;
    this.y=this.y+this.vely*deltaT;
    }
    estaColidindo(p:Personagem):boolean{
    if(p.x <= this.x+this.largura && this.x <= p.x+p.largura)
    if(p.y <= this.y+this.altura && this.y <= p.y+p.altura)
    return true;
    return false;
    }
}