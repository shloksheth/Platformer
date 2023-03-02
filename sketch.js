var PLAY = 1;
var END = 0;
var gameState = PLAY;

var box, boxImage, boxImage2;
var ground, groundImage, invisibleGround;
var bgImage, background;

var vx = 0;
var g = 0.07;
var vy = 0;

function preload() {
  boxImage = loadImage("boxRight.png");
  boxImage2 = loadImage("boxLeft.png")
  groundImage = loadImage("groundfloor.png");
  bgImage = loadImage("bg.jpg");
}

function setup() {

  bground = createSprite(780, 320, 900, 20);
  bground.addImage("bg", bgImage);
  bground.scale = 1.3

  createCanvas(windowWidth - 1, windowHeight - 1);
  ground = createSprite(100, -35, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 4;
  ground.scale = 1.2;

  box = createSprite(50, 596, 20, 50);
  box.addImage("box", boxImage);
  box.scale = 1.4;

  invisibleGround = createSprite(200, 638, 3000, 10);
  invisibleGround.visible = true;

  rectMode(CENTER);
  textSize(15);
  
}

function draw() 
{
  background("white");

  if (box.y<596){
    vy +=g;
    box.position.y+=vy;
  }


  if (keyDown("UP") && box.y >= 536){
    box.y -= 60
  }
  if (keyDown("RIGHT") && box.x<1505 ){
    box.x += 15;
    box.changeImage("box");
  }
  if (keyDown("LEFT") && box.x>35 ){
    box.x -= 15;
    box.addImage("boxLeft", boxImage2);
    box.changeImage("boxLeft");
  }

  ground.x +=5;
  console.log(box.y);

  if (ground.x>400){
    ground.x = 100;
  }

  box.collide(invisibleGround);

  drawSprites();

}