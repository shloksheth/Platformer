var PLAY = 1;
var END = 0;
var gameState = PLAY;

var box, boxImage, boxImage2;
var ground, groundImage, invisibleGround;
var bgImage, background;

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
  bgImage = loadImage("bg.jpg");

  //cloudImage = loadImage("cloud.png");

  obstacle1 = loadImage("Spike 8.png");
  obstacle2 = loadImage("Spike 4.png");
  obstacle3 = loadImage("Spike 2.png");
  obstacle4 = loadImage("Spike 1.png");
  //obstacle5 = loadImage("Spike 7.png");
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

  box = createSprite(50, 600, 20, 50);
  box.addImage("box", boxImage);
  box.scale = 1.3;

  invisibleGround = createSprite(200, 1083.5, 3000, 900);
  invisibleGround.visible = false;

  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();

  rectMode(CENTER);
  textSize(15);

  score = 0;

}

function draw() {
  background("white");

  if (gameState === PLAY) {

    if (box.y < 596) {
      vy += g;
      box.position.y += vy;
    }

    score = score + Math.round(frameCount/120);

    var scoreText = text("Score: " + score, 300, 200);

    scoreText.depth += 2;


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
    console.log(box.y);

    if (ground.x > 400) {
      ground.x = 100;
    }

    box.collide(invisibleGround);

    //spawn the clouds
    //spawnClouds();

    //spawn obstacles on the ground
    spawnObstacles();

    if (obstaclesGroup.isTouching(box)) {
      //dieSound.play()
      gameState = END;
    }

    drawSprites();
  }

  else if (gameState === END) {
    console.log("hey")
    //gameOver.visible = true;
    //restart.visible = true;

    ground.velocityX = 0;
    box.velocityY = 0

    //change the trex animation
    //trex.changeAnimation("collided", trex_collided);

    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    //cloudsGroup.setLifetimeEach(-1);

    obstaclesGroup.setVelocityXEach(0);
    //cloudsGroup.setVelocityXEach(0);
  }

}
function spawnObstacles() {
  if (frameCount % 120 === 0) {
    var obstacle = createSprite(1300, 615, 10, 40);
    obstacle.velocityX = -5 //-(6 + score / 100);

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
  }
}