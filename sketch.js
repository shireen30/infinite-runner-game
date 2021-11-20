var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var obstaclesGroup2

var score=0;

var gameOver, restart;



function preload(){
  trex_running =   loadAnimation("stick1.png","stick3.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("trex_obstacle.png");
  obstacle2 = loadImage("trex_obstacle2.png");
  obstacle3 = loadImage("trex_obstacle3.png");
  obstacle4 = loadImage("trex_obstacle4.png");
  obstacle5 = loadImage("trex_obstacle5.png");
  obstacle6 = loadImage("trex_obstacle6.png");

  obstacle5.scale = 3
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.005;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  obstaclesGroup2 = new Group();
  
  score = 0;

  trex.debug = true;
  //trex.setCollider("rectangle",0,-20,100,200)
}

function draw() {
  spawnObstacles2.debug = true;
  background(25);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && trex.y >= 159) {
      trex.velocityY = -8;
    }
  
    trex.velocityY = trex.velocityY + 0.5
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  

    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
    spawnObstacles2();
  
if(keyDown("down")){
//trex.scale=0.003;
trex.velocityY=10
}

    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
    if(obstaclesGroup2.isTouching(trex)){
      gameState = END;
  }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup2.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup2.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


//OBSTACLE 2



function spawnObstacles2() {
  if(frameCount % 90 === 0) {
    var obstacle22 = createSprite(900,0,10,40);
    obstacle22.debug = true;
   obstacle22.setCollider("rectangle", 0, 0, 25,65)
    obstacle22.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle22.addImage(obstacle5);
              break;
      case 2: obstacle22.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle22.scale = 2;
    obstacle22.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup2.add(obstacle22);
  }
}







function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  obstaclesGroup2.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
 
  
  score = 0;
  
}