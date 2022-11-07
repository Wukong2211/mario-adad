var background,backgroundImg;
var ground;
var mario,mario_Running,mario_Stationary;
var lion;
var pillar;
var camera;
var gameState="wait";
var startImg;
var enemyGroup,enemy1,enemy2;
var pillarGroup;
var coin;
var redPotion;
var red;
var gameOver;
var start;
var score;

function preload (){

    mario_Running=loadAnimation("mario1.png","mario2.png");
    backgroundImg= loadImage("background2.png");
    startImg=loadImage("start.png");
      
    gameOverImg=loadImage("game_over.png");
    mario_stationary=loadImage("mario3.png");
    startImg= loadImage("start.png");
    coinImg=loadImage("coin.png");
    potion=loadImage("redPotion.png");
    //restart=loadImage("restart.png");

    enemy1=loadImage("lion.png");
    enemy2=loadImage("tortoise.png");

    pillarImg=loadImage("pillar.png")
    
}

function setup(){
   
    createCanvas(1500,700);
   
    ground = createSprite(100,561,15000,20);
    ground.x=ground.width/2;
    ground.visible=false;

    mario=createSprite(100,561,20,30);
    mario.addAnimation(" mario_Running",mario_Running)
    mario.scale=0.3;
    mario.setCollider("rectangle",0,0,mario.width,mario.height);
    mario.debug = false;

    gameOver=createSprite(700,350,40,80)
    gameOver.addImage(gameOverImg)
    gameOver.scale=1.5
    gameOver.visible=false;

    start=createSprite(700,150,40,80)
    start.addImage(startImg);
    start.scale=1
    start.visible=false;

    score=0
  
     enemyGroup=createGroup();
     potionsGroup=createGroup();
     pillarGroup=createGroup();
     coinGroup=createGroup();

}

function draw(){
  
 // mario.x=camera.position.x;

 if (gameState==="wait"){
  
  start.visible=true;
  enemyGroup.visible=true;
  mario.visible=true;
  gameOver.visible=false;
  backgroundImg.visible=true;
  //mario.potion(100,561,20,30)

 }

    background(backgroundImg);
         
    console.log(gameState)      
            
    if(gameState==="wait" && keyDown("SPACE")) {
     
      gameState="play";
    }

    if(gameState==="play"){
      
    if(keyDown("space")&& mario.y >= 300) {
       mario.velocityY = -20;
                       
    }

    if(mario.isTouching(potionsGroup)){
      potionsGroup.visible=false;
      mario.scale=mario.scale+0.003
    }

    textSize(120)
    text("score:"+ score ,550,350)

      start.visible=false;
      ground.velocityX=-4;
    if (ground.x < 1500){
        ground.x = ground.width/2;
      } 
      
       mario.velocityY = mario.velocityY + 0.8
    
    if(keyDown("RIGHT_ARROW")) {
        mario.velocityX = +8;
       // mario.changeAnimation (mario_Running)
    }

    if(keyDown("LEFT_ARROW")){
        mario.velocityX=-8;
        
    }
   
    mario.collide(ground);
    //mario.collide(enemyGroup);
    mario.collide(pillarGroup);
    //mario.collide(coinGroup);
    //mario.collide(potionsGroup);
    
    spawnEnemy();
    spawnPillar();
    spawnCoin();
    spawnPotion();
    }

    if( gameState==="play" && mario.collide(enemyGroup)){
       gameState="end"
    }

    if(gameState==="end"){
       enemyGroup.visible=false;
       mario.visible=false;
       gameOver.visible=true;
       backgroundImg.visible=false;
    }

   if(gameState==="end"&& keyDown("w")){
      restart();
    }
    
   
       
drawSprites()  
}

function spawnEnemy(){
   if (frameCount % 300 === 0){
       var enemy = createSprite(1600,490 ,10,40);
       enemy.velocityX = -4;
       enemy.scale=0.5
   

      var rand=Math.round(random(1,2))
      switch(rand){

      case 1:enemy.addImage(enemy1);
       
      enemy.setCollider("rectangle",0,0,enemy.width,enemy.height+15)
      enemy.debug=false;
        
      break;

      case 2:enemy.addImage(enemy2);
      enemy.setCollider("rectangle",0,0,enemy.width,enemy.height+15)
      enemy.debug=false;
      break;

        

       

      default: break;
}

      enemy.lifeTime=400;
   
      enemyGroup.add(enemy);
}
}

function spawnPillar(){
  if (frameCount % 400 === 0){
    var pillar = createSprite(2000,440 ,10,40);
    pillar.addImage(pillarImg)
    pillar.velocityX = -4;
    pillar.scale=0.3
    pillar.setCollider("rectangle",0,0,pillar.width-800,pillar.height);
    pillar.debug = false;

  

    pillar.lifeTime=400

    pillarGroup.add(pillar);
}
}

function spawnCoin(){
  if(frameCount % 100===0){
   
    

    var rand=Math.round(random(1,2))
    switch(rand){

    case 1:var coin=createSprite(2000,500,10,30)
    coin.addImage(coinImg);
    coin.velocityX=-4;
    coin.scale=0.2
    coin.setCollider("rectangle",0,0,coin.width-150,coin.height-150)
    coin.debug=false;
    if(mario.isTouching(coinGroup)){
      score=score+1
      coin.lifeTime=0
}

    break;

    case 2:var coin=createSprite(2000,300,10,30)
    coin.addImage(coinImg);
    coin.velocityX=-4;
    coin.scale=0.2
    coin.setCollider("rectangle",0,0,coin.width-150,coin.height-150)
    coin.debug=false;
    break;

    default :break;
  }

    coin.lifeTime=400
    coinGroup.add(coin)
  }
}

 function spawnPotion(){
 if( frameCount % 600===0){
    

     var rand=Math.round(random(1,2))
     switch(rand){

     case 1:var redPotion=createSprite(2100,500,10,30)
     redPotion.addImage(potion);
     redPotion.scale=0.1;
     redPotion.velocityX=-4;
     redPotion.visible=true
     break;


     case 2:var redPotion=createSprite(2100,300,10,30)
     redPotion.addImage(potion);
     redPotion.scale=0.1;
     redPotion.velocityX=-4;
     redPotion.visible=true
     break;

     default:break;



    }


    redPotion.lifeTime=400;
    potionsGroup.add(redPotion);
  }
}

 function restart(){
   gameState="wait"
}








    









    

    




  

                  
