var gameState = "play";

var box, boxImage, boxImage2;
var ground, groundImage, invisibleGround;
var bgImage, bground;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5

var vx = 0;
var g = 0.4;
var vy = 0;

var score;

function preload() {
  boxImage = loadImage("boxRight.png");
  boxImage2 = loadImage("boxLeft.png")
  groundImage = loadImage("groundfloor.png");
  bgImage = loadImage("background.png");

  //cloudImage = loadImage("cloud.png");

  obstacle1 = loadImage("Spike 8.png");
  obstacle2 = loadImage("Spike 4.png");
  obstacle3 = loadImage("Spike 2.png");
  obstacle4 = loadImage("Spike 1.png");
  //obstacle5 = loadImage("Spike 7.png");
}

function setup() {
  createCanvas(windowWidth - 1, windowHeight - 1);

  ground = createSprite(100, -35, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 4;
  ground.scale = 1.2;

  box = createSprite(50, 600, 20, 50);
  box.addImage("box", boxImage);
  box.scale = 1.3;

  /*bground = createSprite(780, 320, 900, 20);
  bground.addImage("bg", bgImage);
  bground.scale = 1.3;
  bground.depth = -11;
  console.log(bground.depth);*/

  invisibleGround = createSprite(200, 1083.5, 3000, 900);
  invisibleGround.visible = false;

  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();

  rectMode(CENTER);
  textSize(40);

  score = 0;

}

function draw() {
  background(bgImage);

  if (gameState === "play") {
    score = score + 1
  }
  text("Score: " + score, 50, 75);


  // MAKE SURE TO MAKE BACKGROUND HIGHER IN MICROSOFT PAINT
  if (box.y < 596) {
    vy += g;
    box.position.y += vy;
  }

  if (keyDown("UP") && box.y > 498) {
    box.y -= 98
    //box.velocityY = 5
  }
  if (keyDown("RIGHT") && box.x < 1505) {
    box.x += 15;
    box.changeImage("box");
  }
  if (keyDown("LEFT") && box.x > 35) {
    box.x -= 15;
    box.addImage("boxLeft", boxImage2);
    box.changeImage("boxLeft");
  }

  ground.x += 5;
  //console.log(box.y);

  if (ground.x > 400) {
    ground.x = 100;
  }

  box.collide(invisibleGround);
  if (gameState == "play") {
    spawnObstacles();
  }

  if (box.isTouching(obstaclesGroup)) {
    gameOver();
    console.log("Game Over: You Lost =( ");
  }

  drawSprites();
}

function spawnObstacles() {
  if (frameCount % 120 === 0 && gameState == "play") {
    var obstacle = createSprite(1300, 615, 10, 40);
    obstacle.velocityX = -5

    //generate random obstacles
    var rand = Math.round(random(1, 4));
    switch (rand) {
      case 1: obstacle.addImage(obstacle1);
        break;
      case 2: obstacle.addImage(obstacle2);
        break;
      case 3: obstacle.addImage(obstacle3);
        break;
      case 4: obstacle.addImage(obstacle4);
        break;
      //case 5: obstacle.addImage(obstacle5);
      //break;
      default: break;
    }

    obstaclesGroup.add(obstacle);
  }
}
function gameOver() {
  console.log("game over");
  gameState = "end";
  ground.velocityX = 0;
}