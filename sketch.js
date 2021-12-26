const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;

let world;
let engine;

var score=0;
var lives=3;

var angle1,button;
var ball,slanting1,slanting2,right_poll,left_poll;;
var pointScorer1,pointScorer2,pointScorer3,pointScorer4,pointScorer5;
var r_line2,r_line2,l_line1,l_line2;
var upper_boundary,paddle;
var i1,render;

function setup() {
  createCanvas(700,windowHeight);

  engine = Engine.create();
  world = engine.world;

  console.log("Press Right Arrow & Left Arrow Key To Move The Paddle");

  ball=new Ball(Math.round(random(width/2-50,width/2+50)),100);
  //  ball=new Ball(150,300);

  
  pointScorer1=new PointScorer(230,200);
  pointScorer2=new PointScorer(width/2,200);
  pointScorer3=new PointScorer(470,200);
  pointScorer4=new PointScorer(290,300);
  pointScorer5=new PointScorer(410,300);
  
  right_poll=Bodies.rectangle(10,height/2,200,height,{isStatic:true});
  World.add(world,right_poll);
  left_poll=Bodies.rectangle(width-10,height/2,200,height,{isStatic:true});
  World.add(world,left_poll);
  
  l_line1=Bodies.rectangle(220,500,20,150,{isStatic:true});
  World.add(world,l_line1);
  l_line2=Bodies.rectangle(150,525,20,200,{isStatic:true});
  World.add(world,l_line2);
  r_line1=Bodies.rectangle(width-220,500,20,150,{isStatic:true});
  World.add(world,r_line1);
  r_line2=Bodies.rectangle(width-150,525,20,200,{isStatic:true});
  World.add(world,r_line2);
  
  upper_boundary=Bodies.rectangle(width/2,10,width,50,{isStatic:true});
  World.add(world,upper_boundary);

  paddle=Bodies.rectangle(width/2,height-100,100,10,{isStatic:true});
  World.add(world,paddle); 
}

function draw() 
{
  background("lightblue");
  Engine.update(engine);

  //drawing right &left poll
  push();
  rectMode(CENTER);
  fill("red")
  rect(right_poll.position.x+10,right_poll.position.y,200,height);
  pop();
  push();
  rectMode(CENTER);
  fill("red")
  rect(left_poll.position.x+10,left_poll.position.y,220,height);
  pop();
  
  //drawing right & left line
  push();
  fill("violet")
  rect(220,450,20,150);
  pop();
  push();
  fill("violet")
  rect(150,450,20,200);
  pop();
  
  push();
  fill("violet")
  rect(width-220,450,20,150);
  pop();
  push();
  fill("violet")
  rect(width-150,450,20,200);
  pop();
  
  //drawing upper boundary
  push();
  rectMode(CENTER);
  fill("red")
  rect(upper_boundary.position.x,upper_boundary.position.y,width,50);
  pop();

  push();
  translate(paddle.position.x,paddle.position.y);
  rectMode(CENTER);
  fill(43, 142, 228);
  rotate();
  rect(0,0,100,10);
  pop();
  
  if(keyIsDown(RIGHT_ARROW) && paddle.position.x<width-160){
   Matter.Body.setPosition(paddle,{x:paddle.position.x+10,y:height-100});
  }
 
  if(keyIsDown(LEFT_ARROW) && paddle.position.x>160){
   Matter.Body.setPosition(paddle,{x:paddle.position.x-10,y:height-100});
  }
  
  if(ball.body.position.y>850){
    ball=new Ball(Math.round(random(width/2-50,width/2+50)),100);
    lives=lives-1;
  }

  if(lives===0){
   Matter.Body.setStatic(ball.body,true);
   gameOver();
  }

  ball.show();
  pointScorer1.show();
  pointScorer2.show();
  pointScorer3.show();
  pointScorer4.show();
  pointScorer5.show();
  
  var collision1=Matter.SAT.collides(pointScorer1.body,ball.body);
  var collision2=Matter.SAT.collides(pointScorer2.body,ball.body);
  var collision3=Matter.SAT.collides(pointScorer3.body,ball.body);
  var collision4=Matter.SAT.collides(pointScorer4.body,ball.body);
  var collision5=Matter.SAT.collides(pointScorer5.body,ball.body);
  var collision6=Matter.SAT.collides(paddle,ball.body);
  var collision7=Matter.SAT.collides(l_line2,ball.body);
  var collision8=Matter.SAT.collides(r_line2,ball.body);
  if(collision1.collided ||
    collision2.collided ||
    collision3.collided ||
    collision4.collided ||
    collision5.collided ||
    collision6.collided ||
    collision7.collided ||
    collision8.collided){
   console.log("Collided");
   Matter.Body.applyForce(ball.body,{x:0,y:0},{x:0.02,y:0});
   score=score+10;  
  }

  push();
  textSize(30);
  fill("yellow");
  text("Score:"+score,width-150,30);
  pop();

  push();
  textSize(30);
  fill("yellow");
  text("Lives:"+lives,10,30);
  pop();

  drawSprites();
}

function gameOver(){
  swal({
  title:"Game Over",
  text:"Your Score is : "+score,
  imageUrl:
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBIREhEPEREREQ8RERERDw8REREPERESGBQZGRgUGBgcIS4lHB4rHxgYJjgmKy8xNTY1GiQ/QDs0Py40NTEBDAwMEA8QGhISGjQhISE0MTExPzQ0NDQ0NDE0NDQ0NjE0MTQ0NDQ0MTE0NDQ/NDExNDU0MTE0MTY0MTQ0NDExNP/AABEIALcBEwMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAAAQIDBAcGBQj/xAA+EAACAgEBBQUECAQEBwAAAAAAAQIDEQQFBhIhMUFRYXGBBxMikRQyQlJigqGxIzNyklOyweEVJENjwsPw/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAECAwQFBv/EAC8RAQACAgAEAwcEAgMAAAAAAAABAgMRBBIhMUGx8BMyUWGBkaEFcdHhIsEUM1L/2gAMAwEAAhEDEQA/AOzAAAAAAAAAAAAAAMVtkYRcpSUYxWZSk1FJd7bPJ7X3wSzDTJSfR2zTcV/Sv9X8mVvetI3LbBw+TNbVI35R9Xqr9RCuPHZONcfvTaiv1PP63fGiGVVGdz71/Dh83z/Q8PqtZbbLjsslOXfJ5x4JdEvBGFHLbiLT7vR7GH9Kx165J5p+0fzP4eh1W+Gplng93Uuzghxy9XLK/Q+XdtnUy66i7yVk4L5LCNPhKSizGb2nvL0KcPhp7tIj6f7TbfKXOUnJ98pOX7mL3jXRteuCszDKZTboikPoV7V1EOUL7kl0UbZpfLJ9DS726yv/AKisX3bIxl+qw/1POOZHGIvMdpVvw+O3vVifpDoGi37Twr6Wu+dTyv7X0+bPTbP2xRqP5VsZSxl1t4mvy9TjSmWja0002mnlNPDT70zevEWjv1efm/ScN/c/xn7x9pd0BzPY2+d1OI3Zvq+83i1Lz7fzfNHvNmbTp1MOOqfFj60XynF90o9h1Uy1v2eLxHB5cHvRuPjHb16h9AAGjlAAAAAAAAAAAAAAAAAAAAAAAADR2ntGvTQ95a8LpGK5ynLuiiNq7Sr0tbts8oQX1py7Ejl+1dp2amx22PPZGC+rCP3V/wDczHLlikaju7+C4GeInmt0rH5+Uevy29t7dt1Uub4ak8wqi+XnLvfj8j5XEYXMKRwzMzO5fS0xVpWK1jUQ2YczZqpyYtLXln3tFpck1jbDNkijQhpH3Ez0bx0PRV6VE26ZYNfZuH/lTt4nV08J8u1nptrVYyeav6mF409Xh781WFzKuZRspKRR16ZlMsrDU4iVMbRNW6rDa0WtnTJWVTlCceji/wBGujXg+R8tWGSNhaJY3pExqXWd2t6a9ViqzFepx9XpGzHVwz2/h/fs9QcErtaaabTTTUk2mmujT7GdO3Q3m+kJae5r6RFfDLkldFdv9a7V29V247sWXm6T3fOcdwHst5Mfu+MfD+vJ60AHQ8oAAAAAAAAAAAAAAAAAAAw6i6NcZWTajCCcpSfRJdTMeC372xzWkg+SxK5rtfVR9OT9V3FMl+Su2/DYJz5YpH1+UPhbf2vLVWubyq45jVX92Pj+J9X/ALHx5zInMwzmeba0z1l9fjxxSsVrGohfjMtcjU4i8LMFWsw9Ds9Lkeh00kkjxum1fCfQhtPHabVtEPM4jBa0vXQuRW3UxweUe1vEwW7VfeXnI5o4K0y3drXJ5PL6mXM2dVrHI+dZPJhe23rcPimkKTZjkxKRRszdcDZGSGyrYGTiLRsMDYUiVZbsJmzp75QlGcJNSTUoyi8OMk8po+dGZmhM0hzXh2jdbbkdZTxPCuhiN0Vy59kku5/umuw+8cS3e2vLSXwujlx+rZBfbrb+Jea6rxSO0U2xnGM4tSjKKlGS6STWU16HoYr80de8PluN4f2OTp7s9vl8Y9eDKADRxgAAAAAAAAAAAAAAANLamtjp6bLpdIRbS6cUukY+raXqcd1N8rJSnJ5lKTlKXfJvLZ7f2ia7EadMn9Zu2a8F8MV5N8X9pz+cjh4i27a+D6P9JwcuLnnvbyj15IsmYkys5FYyOV7UQz8Bhm8F3YYZyCI34rqwn3zMGSMja2oZ3cyHYzDkkI1ELSmY3ItwkOI0bhRso2XkjFIaTtDZGSGwDZkjJDYbJV2mMjNCZr5LwkWhlZvQmdP9nO1ve0y0s38dPxQz1dUn09JZ9JROUwmeg3R2l9H1dFmcQlNVWd3BP4W34J8Mvym+K3LaHmcbj9pitHjHWP3j1r6u2AA7nzYAAAAAAAAAAAAAAFZPCy+i5gcm3x1fvdZdzzGuSqj4KKw18+L5nnpyNnV3OcpzfWcpSfnJ5f7mjOR5dp3My+0wU5KVr8IiFZMo2Q2UcjOXVC/EQ2UySDackZKNhMG2VGeuvJggbmnwWiGV7ahnr0uSl2mwfU08o4MOskjaaxpx+1tzafDshg1po275GpNmUw6q2Y2Qw2VbI0vsZVsNlGyVZlbJZMx5CZMM7S2ISNqt55GlFmzWzSHNd3zYWs+kabT3P606oOX9eMS/VM+ieT9nGo49Ao5z7q22HzxP/wBh6w76zuIl8vlry3tX4TIACVAAAAAAAAAAADU2lPhoul04abX8oNm2aO148Wm1KXV0XJetbIntK1I3aIlxOx4NWcjPazUsZ5dn2lGNyKuRSTIyUbwzQZdmCMi7sCJRJlUyspEcRIzxmZYW4NNTDmWhnZ9OGra7Stuqz2nz/eEOZO2fJDLOzJhlIq5FHIhZZsq2Q2VbJNpbKtkNkNkqTK2RkrkJks5lmgzapNODNqhl6ufJPR1r2Xy/5e+PdepfOuK/8T254b2Xx/g6iXfbBfKH+57k7ae7D57iP+2wACzEAAAAAAAAAAAxX18cJQfSUXF+qwZQBwC3KymsNcmu59qNOxn3N59N7rV6mvolbOUf6ZPij+kkfDsPNtHg+wxX5oi0ePX79WvNleITMeTPTp2ycQ4jHkjINsnEQ2UyRkaNr8RHEVyRklWZX4iHIo2Q2SrtZyI4irZGQja7ZVsrkhslSbJbIyVbIySpNl8kplEyYsnTOZZ6zaqNWs2qi8MbS6/7ManHRzk/t6ibXkoQj+6Z7M+Dudpfc6DSwaw5VqxrtzY3PD/ux6H3jtrGoh8/ltzZLT8wAEswAAAAAAAAAAAABzH2maHhuq1CXw2w4JP8cH2+cZL+08HYjte+OzPpWkshFZsh/FqS6uUU8peLi5L1OKWHJmrq37ve/T83NiiPGvT+GrYjXbNmxGtJHNp6tbIyTkrkjI0na2RxFckZCOZbIyVyQ2Da2SrZGSGyVZlOSMkZIySrtOSMjJVslXaWxkgBSZSi8DGjPBEqTLNWj62xtC9RfTQs5tsjBtdVFv4pei4n6Hzq4nRfZZsriss1sl8Na91U++clmbXlHC/OzWldzpy58nJSbOmwiklFLCSSSXRJdhcA63hAAAAAAAAAAAAAAAABxvfnYv0XUuUVii/isr7oyz8UPRvPlJdx2Q+RvHseOt086JYUvrVTazwWLo/Lqn4NlMleaHTwuf2OTc9p7+vk4NYjWmj6Wt0sqrJVWRcJwk4Ti+qa/wBO3PbyNGcTimH0NbtWSKmaUSjiU015mMFsEEnMjJVssyrQRsyVbJKslGxsABUAARsAwXUSVJkhE2IRKxiZ4RLQztLa0WmlbZCquPFZOShCPfJvC8l4nfNh7MjpNPVp48+CPxS+9N85S9W2eM9mu7nu4/8AELl8c4400X9mt9bPOXRfh/qOiHVjrqNvI4vNz25I7R5/0AA0cYAAAAAAAAAAAAAAAAAAPH777r/S4O+mK+lVxxjp76C+y/xLsfp5chtrabTTTTacWmmmnzTT6M/Rx4vfHc6Oq4tRRiGqx8UOUYX47+6fdLt6PvWWTHvrDv4TiuT/AAv28Pl/Xk4/KJilE3tVp51zcLISjOL4ZwkuGSfc0a0onNp68WazRVmaUCkoldL8zCwXcSjRCdqlWWZXBKuwgnBKiEbVLJEqJdRJ0iZVjEyxiTGJdItEM5smMT2+4e6T1c1qb4taSuXwxa/nzT+qvwp9X29O/E7mbkS1TWp1UZQ0nJwhzjO/y7Yw8er7O865TVGuMYQiowglGMIpRjFJYSSXRG9Me+svP4nidbrSevl69de10sclyS6IsAbPNAAAAAAAAAAAAAAAAAAAAAAAAfB3g3Z0+uj/ABFwXJfBfBLjj4P7y8H6YOVbf3W1OibdkOOnPw31put93F2wfn6NncysoppppNNYafNNFLUizow8TfF07x8PXby+T83ygY5ROzba3C0uozKrOmsf+GlKpvxr6L8rieG2puJrqMuNa1EF9ul8UseMHiWfBZMJxzHg9LHxeO/jqfm8dKBRwNzUUShLgnCUJrrCcZQmvyy5mFxKadPMwOBXgNjBDRGjnYOAlQMmCWkuuPAnSNsaiWUT7mzN1Ndqce701ig/t2r3MMd+Z44l5ZPa7G9mMFiWsu95300ZjDyc3za8lHzL1pM9oYZOIx07z9uvr66c52ds67UzVVFc7bHj4YLPCu+T6RXi2kdS3W9ntVHDdrOG65YcaVzprfjn678+Xg+p7PZ2zqdPBVUVQqgvswWMvvb6t+L5m4bVxxHfq8/Nxdr9K9I/IADRyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMGo00LY8NkIWR7pxjOPyZ8XVbm7OszxaSqOf8Pip/yNEgaie61bTWek6aE/Z3s99K7Y+V03/myUh7Odnrqr5eDtx+yQBHLX4Le3y/8Aqfu2dPuJsyHP6Nxv/uW3TXycsfofa0eydNp/5GnpqffCuEH80sgCIiEZL2mOtpn95b4AJUAAAAAAAAAAAAAAAAAAB//Z",
  imageSize:"200x200",
  confirmButtonText: "Play Again",
  },
  function(isConfirm){
    if(isConfirm){
      location.reload();
      }
    }
  );
}
