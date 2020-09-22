var PLAY=1
var END=0
gameState=PLAY;



var ground, invisibleGround;
var monkey , monkey_running
var banana1 ,bananaImage, obstacle,obstacleImage
var FoodGroup, obstacleGroup
var survivalTime,score=0

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
stop=loadAnimation("sprite_0.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage  = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(600,600) 
  
  ground=createSprite(400,599,900,30)
 
  ground.x=ground.width/2
  console.log(ground.x)
  
  monkey=createSprite(80,470,20,20)
  monkey.addAnimation("moving",monkey_running)
  monkey.scale=0.1
  
   invisibleGround = createSprite(400,599,900,10);
   invisibleGround.visible = false;
  
  foodGroup=new Group()
  obstacleGroup=new Group()
}


function draw() {
  background("green")
  
  
  if(gameState===PLAY){
    
    
   ground.velocityX=-4  
    
 
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
      monkey .velocityY = -12;
       
    }
    
    //add gravity
   monkey.velocityY =monkey.velocityY + 0.8  
   // we are saying monkey collide with ground 
    monkey.collide(invisibleGround) 
     
  //declaring banana function
    banana()
    
  // declaring obstacles function
    obstacles()
     
 // when the monkey touches the banana then the banana will destroy     
    if(monkey.isTouching(foodGroup)){
      
      foodGroup.destroyEach()
    score=score+3
             
       }
  
   
  survivalTime=Math.ceil(frameCount/frameRate())
    
     
    if(monkey.isTouching(obstacleGroup)){
      
      gameState=END
         
       
       } 
    
  
    
     
     
     }
  else if(gameState===END){
    
    
    
      textSize(24) 
  fill("red")
  text("YOU LOSE😥😥😥",200,300)
 
    
      ground.velocityX=0;
  obstacleGroup.setLifetimeEach(-1);
   foodGroup.setLifetimeEach(-1);

   obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);

    monkey.velocityX=0 
    monkey.velocityY=0
          }
 
  
  
  
  
  drawSprites();
   stroke("white")
  textSize(20)
  fill("white")
  text("Score:"+score,130,80)
 
  stroke("black")
  textSize(20)
  fill("black")
  text("survival Time:"+survivalTime,100,50)
 
}
function banana() {
  
  if (frameCount % 80 === 0) {
    banana1  = createSprite(600,100,40,10);
    banana1 .y = Math.round(random(120,200));
    banana1 .addImage(bananaImage);
    banana1 .scale = 0.1;
    banana1 .velocityX = -3;
    
     //assign lifetime to the variable
     banana1.lifetime =200;
    //we are adding banana to foodGroup
    foodGroup.add(banana1)

  }
}
   
function obstacles(){

 if (frameCount % 300 === 0){
   var obstacle = createSprite(600,560,10,40);
   obstacle.velocityX = -6;
   obstacle.addImage(obstacleImage)
 
    
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }









}


  
  

  
 
  
  



























