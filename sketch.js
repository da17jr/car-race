var backgroundy,backgroundimg;
var enemycar1,enemycar1img;
var enemycar2,enemycar2img;
var car,carimg;
var enemycars;
var score = 0;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var edges;
var bound,boundv2;



function preload(){
  backgroundimg = loadImage('road.png');
  enemycar1img = loadImage('car1.png');
  enemycar2img = loadImage('car2.png');
  carimg = loadImage('car3.png')
 
}
function setup() {
  createCanvas(580,700);
  backgroundy=createSprite(200,200,400,1328);
  backgroundy.velocityY = 5;
  backgroundy.addImage("back",backgroundimg);
  backgroundy.depth = 1;
  car = createSprite(200,660,10,10);
  car.rotation = -90;
  car.addImage("drive",carimg);
  car.scale = 0.03;
  enemycars = createGroup();
  bound = createSprite(400,350,10,700);
  boundv2 = createSprite(0,350,10,700);
  edges = createEdgeSprites();



}

function draw() {
  background("white");  
  if(gamestate === PLAY){
  if(backgroundy.y > 400 ){
    backgroundy.y = backgroundy.height/40
  }
  if(keyDown("left")){
    car.x = car.x - 5;
  }
  if(keyDown("right")){
    car.x = car.x + 5
  }
  if(car.isTouching(enemycars)){
    gamestate = END;
  }
  if(car.isTouching(bound)){
    gamestate = END
  }
  if(car.isTouching(boundv2)){
    gamestate = END;
  }
  
  car.debug = true;
  car.setCollider("circle",0,0,1000)
  


  score = Math.round(frameCount/5);


  spawnEnemyCar();
  
}
if(gamestate === END){
  backgroundy.velocityY = 0;
  enemycars.setVelocityYEach(0);
  frameCount = 0;
  score = 0;
  text("YOU LOST PLEASE TRY AGAIN ",420,350)
}
textSize(15);
textStyle("bold");
text("YOUR SCORE IS: " + score,420,30)
drawSprites();
}
function spawnEnemyCar(){
  if(frameCount % 60 === 0){
    enemycar1 = createSprite(random(20,180),-50,10,10);
    enemycar1.addImage("carimg",enemycar1img)
    enemycar1.velocityY = 5;
    enemycar1.rotation = 90;
    enemycar1.scale = 0.03;
    enemycar1.debug = true;
    enemycars.add(enemycar1);
    enemycar1.setCollider("circle",0,0,1000)
    enemycar1.depth = car.depth;
  }
  if(frameCount % 100 === 0){
    enemycar2 = createSprite(random(220,380),-50,10,10);
    enemycar2.addImage("carimg",enemycar2img);
    enemycar2.velocityY = 5;
    enemycar2.rotation = 90;
    enemycar2.scale = 0.09;
    enemycars.add(enemycar2)
    enemycar2.depth = car.depth;
  }
}