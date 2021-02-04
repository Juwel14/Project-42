var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana, bananaimage, obstacle, obstacleimage;
var gameover, gameoverimage;

var END = 0;
var PLAY = 1;
var gameState = PLAY;
var score = 0;

function preload()
{
  backImage = loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  bananaimage = loadImage("banana.png");
  obstacleimage = loadImage("stone.png");
  gameoverimage = loadImage("gameOver.png");
}

function setup() 
{
  createCanvas(800, 400);
  
  backgr = createSprite(0, 0, 800, 400);
  backgr.addImage(backImage);
  backgr.scale = 1.5;
  backgr.x = backgr.width/2;
  backgr.velocityX = -4;
  
  player = createSprite(100, 340, 20, 50);
  player.addAnimation("Running", player_running);
  player.scale = 0.1;

  ground = createSprite(400, 350, 800, 10);
  ground.x = ground.width/2;
  ground.visible = false;

  bananaGroup = createGroup();
  obstacleGroup = createGroup();

  score = 0;
}

function draw() 
{ 
  background(0);

  if(gameState === PLAY)
  {
    player.visible = true;

    if(backgr.x < 100)
    {
      backgr.x = backgr.width/2;
    }
  
    if(keyDown("space")) 
    {
      player.velocityY = -13;
    }

    for (var i = 0; i < bananaGroup.length; i++) 
    {
      if (bananaGroup.get(i).isTouching(player)) 
      {
        bananaGroup.get(i).destroy();
        score = score + 2;
        player.scale += + 0.01;   
      }   
    }

    spawnFood();

    spawnObstacles();

    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    if (obstacleGroup.isTouching(player))
    {
      gameState = END;
    }
  } 

  if (gameState === END) 
  {
    backgr.velocityX = 0;
    player.visible = false;

    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    
    gameover = createSprite(350, 200, 10, 10);
    gameover.addImage(gameoverimage);
  }

  drawSprites();

  stroke("black");
  fill("blue");
  textSize(30);
  text("Player Score : "+ score , 300 , 50);
}

function spawnFood()
{
  if (frameCount % 80 === 0)
  {
    banana = createSprite(600, Math.round(random(120,200)), 40, 40);
    banana.addImage(bananaimage);
    banana.scale = 0.05;
    banana.velocityX = -4;
    banana.lifetime = 150;
    player.depth = banana.depth = 1;
    bananaGroup.add(banana);
  }
}

function spawnObstacles()
{
  if (frameCount % 200 === 0)
  {
    obstacle = createSprite(600, 320, 10, 10);
    obstacle.addImage(obstacleimage);
    obstacle.scale = 0.13;
    obstacle.velocityX = -5;
    obstacle.lifetime = 120;
    obstacleGroup.add(obstacle);
  }
}