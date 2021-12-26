class Ball
{
 constructor(x,y,r){
  this.r=20;
  this.body=Bodies.circle(x,y,this.r,{isStatic:false});
  World.add(world,this.body);
 }

 show(){
  fill("white");
  ellipse(this.body.position.x,this.body.position.y,this.r+30);
 }
}