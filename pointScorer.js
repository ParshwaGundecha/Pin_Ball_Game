class PointScorer
{
 constructor(x,y){
  this.r=35;
  this.body=Bodies.circle(x,y,this.r,{isStatic:true});
  World.add(world,this.body);
 }

 show(){
  fill("yellow");
  ellipse(this.body.position.x,this.body.position.y,this.r+25);
 }
}