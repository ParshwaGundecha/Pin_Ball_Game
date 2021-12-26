class Rotate
{
 constructor(x,y,w,h,angle1){
  let options={
    isStatic:true
  }
  this.w=w;
  this.h=h;
  this.angle1=angle1;
  this.body=Bodies.rectangle(x,y,w,h,options);
  World.add(world,this.body);
  this.body.position.x=this.body.position.x
 }

 display(){
  var pos=this.body.position;
  var angle1=this.body.angle-56.55;
  
  push();
  translate(pos.x,pos.y);
  // rotate(angle1);
  rectMode(CENTER);
  rect(0,0,this.w,this.h);
  pop();

  if(keyIsDown(RIGHT_ARROW) && pos.x<width/2-50){
    pos.x=pos.x+1
    this.w=this.w+100
  }
  else{pos.x=230}; 
}

display1(){
  var pos=this.body.position;
  var angle1=this.body.angle;

  push();
  translate(pos.x,pos.y);
  // rotate(angle1);
  rectMode(CENTER);
  rect(0,0,this.w,this.h);
  pop();
  
  if(keyIsDown(LEFT_ARROW) && pos.x>width/2+50){
    pos.x=pos.x-1;
    this.body.w=this.body.w+100
  }
  else{pos.x=width-160};
 }
}