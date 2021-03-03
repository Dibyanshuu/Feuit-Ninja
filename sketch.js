      var PLAY = 1;
      var END = 0;
      var gameState = 1;


      var sword,swordI,swordS;

      var fruitsGroup,fruit1,fruit1I,fruit2,
          fruit2I,fruit3,fruit3I,fruit4,fruit4I;

      var enymysGroup,
          enymy1,enymy1I,enymy2,enymy2I;

      var gameOver,gameOverI,gameOverS;

      var Score = 0;
      
      var position;
       
function preload(){
   
    swordI    = loadImage           ("sword.png");
    fruit1I   = loadImage          ("fruit1.png");
    fruit2I   = loadImage          ("fruit2.png");
    fruit3I   = loadImage          ("fruit3.png");
    fruit4I   = loadImage          ("fruit4.png");
    enemy1I   = loadImage          ("alien1.png");
    enemy2I   = loadImage          ("alien2.png");
    gameOverI = loadImage        ("gameover.png");
    swordS    = loadSound("knifeSwooshSound.mp3");
    gameOverS = loadSound        ("gameover.mp3");
    
}

function setup(){
  
  createCanvas(600, 600);
  fruitGroup = createGroup();
  enemyGroup = createGroup();
}


function draw(){
  
background("skyblue");
  
  text ("Score : " + Score,400,50);
  
  if(gameState==PLAY){
    
  fruit();
  knife();
  enemy();
    
  if (sword.isTouching(fruitGroup)){
    fruitGroup.destroyEach();
    Score = Score + 2;
    swordS.play();
  }
     if (sword.isTouching(enemyGroup)){
       fruitGroup.setVelocityXEach(0);
       enemyGroup.destroyEach();
       enemyGroup.setVelocityXEach(0);
       gameOverS.play();
       gameState=END;
    }
  
}
  
 if(gameState==END) 
 {
   sword.addImage(gameOverI);
   sword.x=200;
   sword.y=200;
 }
  console.log(position);
  drawSprites();
}

function fruit(){
 if (frameCount % 80 === 0){
   var fruit = createSprite(400,Math.round(random(100,400)),20,20);
   fruit.velocityX = -7;
   
   
   position = Math.round(random(1,2))
   if(position == 1){
     fruit.x = 600;
     fruit.velocityX = -(7 + Score/4);
   }
   
   else if(position == 2){
     
     fruit.x = 0;
     fruit.velocityX = (7 + Score/4);
     
   }
   
   
    //generate random obstacles
    var rand = Math.round(random(1,4));
    if(rand == 1) {
      fruit.addImage(fruit1I);
    }
       else if (rand == 2 )  {
      fruit.addImage(fruit2I);
       }
   else if(rand == 3){
      fruit.addImage(fruit3I);
   }
      else if (rand == 4){
        fruit.addImage(fruit4I);
      }
   
    //assign scale and lifetime to the fruit           
    fruit.scale = 0.25;
    fruit.lifetime = 3000;
   //add each fruit to the group
    fruitGroup.add(fruit);
 }
}

function knife(){
  
  sword =createSprite(40,200,20,20);
  sword.x = World.mouseX;
  sword.y = World.mouseY;
  sword.addImage(swordI);
  sword.lifetime = 1;
  sword.scale = 0.5;
  
}


function enemy(){
    if(World.frameCount % 20 === 0){
       
      monster = createSprite(600,200,20,20);
      monster.addAnimation("moving",enemy2I,enemy1I)
      monster.y = Math.round(random(100,300));
      monster.velocityX = -(8 + (Score/10));
      monster.setLifetime = 5000;
      enemyGroup.add(monster);
      
      position = Math.round(random(1,2))
      
   if(position == 1){
     monster.x = 600;
     monster.velocityX = -(8 + Score/10);
   }
   
   else if(position == 2){
     
     monster.x = 0;
     monster.velocityX = (8 + Score/10);
     
   }
    }
    
}







