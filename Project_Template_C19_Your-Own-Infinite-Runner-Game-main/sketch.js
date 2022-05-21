var bird, birdImg
var pipe_aImg, pipe_a_smallImg, pipe_bImg, pipe_b_smallImg
var pipe_a, pipe_a_small, pipe_b, pipe_b_small
var ground, ground_Img, back_ground, back_groundImg
var pipe_group 
var score
var restart, restartImg
var dieSound
var text

var gameState = "serve"

function preload(){
 birdImg = loadAnimation("bird1.png", "bird2.png","bird3.png")

 restartImg = loadImage("restart.png")

 ground_Img = loadImage("ground.png")
 back_groundImg = loadImage("images.png")

 pipe_aImg = loadImage("pipe_a.png")
 pipe_a_smallImg = loadImage("pipe_a_small.png")
 pipe_bImg = loadImage("pipe_b.png")
 pipe_b_smallImg = loadImage("pipe_b_small.png"  )

 dieSound = loadSound("die.mp3")

}

function setup() {

 createCanvas(1000,600);

 back_ground = createSprite(500,200,)
 back_ground.addImage("back_ground",back_groundImg)
 back_ground.scale = 5

 bird = createSprite(150,250,50,50);
 bird.addAnimation("bird1",birdImg);
 bird.scale = 0.3
 bird.debug = false

 ground = createSprite(700,590);
 ground.addImage("ground1",ground_Img);
 ground.scale = 4

 restart = createSprite(500,300)
 restart.addImage("restart1",restartImg)
 
 pipe_group = createGroup()

 score = 0

}

function draw(){  
 background(0);

 drawSprites();

   textSize(30)
   textFont("Impact")
   fill("yellow")
   stroke("blue")
   strokeWeight(3)
   text("Score:" + score, 50, 50)

 if (gameState === "serve" ){
   restart.visible = false
 
   textSize(50)
   textFont("Impact")
   fill("blue")
   stroke("yellow")
   strokeWeight(3)
   text("ENTER TO PLAY", 350, 200)

  }

 if (keyDown("enter")){
     gameState = "play"
     
  }  
    
 if (gameState === "play"){ 
     restart.visible = false

     bird.velocityY = 10 
     ground.velocityX = -3

     score = score + Math.round(getFrameRate()/60);

     if (ground.x < 400 ){
        ground.x = 600
     }
   
     spawnPipes()

     if (keyDown("space")){
       bird.velocityY =bird.velocityY - 15
      }

     if (pipe_group.isTouching(bird) || ground.isTouching(bird) || bird.y<0 ){
      gameState = "end"
       dieSound.play()
     }
   
   }

 else if(gameState === "end" ){ 
       textSize(90)
       textFont("Impact")
       fill("BLACK")
       stroke("red")
       strokeWeight(3)
       text("GAME OVER", 300, 200)

       restart.visible = true
       bird.visible = false
     
       ground.velocityX = 0
       pipe_group.setVelocityXEach(0)
       bird.velocityY = 0

       pipe_group.destroyEach()
       pipe_group.setLifetimeEach(-1)

   }

 if(mousePressedOver(restart)) {
      reset();
 }
 
}

function reset(){
 gameState = "play"
 score = 0
 window.location.reload()

}

function spawnPipes() {
   if(frameCount % 225  === 0 ){
     pipe_b_small = createSprite(1000,30,80,40)
     pipe_b_small.addImage("pipebsmall", pipe_b_smallImg)
     pipe_b_small.velocityX = -3
     pipe_b_small.lifetime = 500
     pipe_b_small.debug = false
     pipe_b_small.setCollider("rectangle", 0, 0, 100, 190)
     pipe_group.add(pipe_b_small)
      
    } 

 if (frameCount % 225 === 0 ){
     pipe_a = createSprite(1000,380,70,60)  
     pipe_a.addImage("pipea", pipe_aImg)    
     pipe_a.velocityX = -3
     pipe_a.scale = 1.5
     pipe_a.lifetime = 500
     pipe_a.debug = false
     pipe_a.setCollider("rectangle", 0, 0, 70, 170 )
   
     ground.depth = pipe_a.depth
     ground.depth +=10
     pipe_group.add(pipe_a)
   }

  if(frameCount % 375 === 0 ){
     pipe_a_small = createSprite(1000,500,70,90)
     pipe_a_small.addImage("pipeasmall", pipe_a_smallImg)
     pipe_a_small.velocityX = -3
     pipe_a_small.lifetime = 500
     pipe_a_small.debug = false
     pipe_a_small.setCollider("rectangle", 0 ,0, 100, 190)

     ground.depth = pipe_a_small.depth
     ground.depth +=10
     pipe_group.add(pipe_a_small)
   }

   if(frameCount % 375 === 0 ){
      pipe_b = createSprite(1000,150,70,60)
      pipe_b.addImage("pipeb", pipe_bImg)
      pipe_b.velocityX = -3
      pipe_b.scale = 1.5
      pipe_b.lifetime = 500
      pipe_b.debug = false
      pipe_b.setCollider("rectangle", 0, 0, 70, 170)
      pipe_group.add(pipe_b,)
   }
   

}
