var path,boy,pathImg,boyImg;
var cashImg,diamondsImg,jwelleryImg,swordImg, endImg;
var cash,diamonds,jwellery,sword
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordG;
var gamestate = "pause"
//extras
var coinImg, bombImg, endLoad;
var coin, bomb, g = 0, end
var coinGroup, bombGroup
var t = 0, tt = 0

/*
S!= GaOv = 150
J= 1000R$ = 10 CA (10 * 200 = 2000)
B = GaOv = 3S-- => (15)
D= 5J (5 * 2000 = 10000) = 5000R$
CO= 1R$ = 40
CA=100R$= 5C (5 * 40 = 200)
ED=POWER=SPEED=(10-20 C)
*/

//Estados do jogo

function preload(){
  pathImg = loadImage("Road.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  //extras
  boyImg = loadAnimation("Jake1.png", "jake4.PNG","Jake2.png","jake3.png");
  coinImg = loadImage("coin.png");
  bombImg = loadImage("bomb.png");
  endImg =loadAnimation("gameOver.png");
boyDeath = loadAnimation("jake4.PNG")
endLoad= loadImage("gameOver.png")
}

function setup(){
  
  createCanvas( windowWidth, windowHeight);
// Movendo plano de fundo
path=createSprite(windowWidth/2, windowHeight);
path.addImage(pathImg);
path.scale = windowWidth/1500
path.depth = 0


//criar menino correndo 
boy = createSprite(windowWidth/2,windowHeight - 175,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.70;
boy.depth = 5
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordG=new Group();
bombGroup=new Group();
coinGroup=new Group();
boy.setCollider("rectangle", 0,0,75,160)
}

function draw() {
  background(0);
edges= createEdgeSprites();
  boy.collide(edges);
  if (gamestate == "pause"){
    boy.x = World.mouseX;
    textSize(20);
  fill(255);
    text("Aperte enter", 200, 200)
    if (keyWentDown("enter")){
      gamestate = "play"
    }
  }
  if(gamestate == "play"){
  boy.x = World.mouseX;
    path.velocityY = 4;
  //código para redefinir plano de fundo
  if(path.y > windowHeight ){
    path.y = windowHeight/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    createCoin();
    createBomb();

    if (coinGroup.isTouching(boy)) {
      coinGroup.destroyEach();
      treasureCollection=treasureCollection+1;
    }
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+100;
    }
    if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+5000;
    }
    if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection+1000;
}
// AÇÂO
    if(bombGroup.isTouching(boy) && g == 0) {
      bombGroup.destroyEach();
      gamestate = "end";
}
if(swordG.isTouching(boy)) {
  swordG.destroyEach();
  g = 100
}
if (g > 0){
  g = g - 0,8
}


  }
  if (gamestate == "end"){
cashG.destroyEach()
diamondsG.destroyEach()
jwelleryG.destroyEach()
swordG.destroyEach()
bombGroup.destroyEach()
coinGroup.destroyEach()
path.velocityY = 0
resete()
  }
  drawSprites();
  textSize(20);
  fill(255);
  text("Tesouro: "+ treasureCollection,150,30);
  }


function createCash() {
  if (World.frameCount % 500 == 0) {
  var cash = createSprite(Math.round(random(50, windowHeight-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = windowHeight/3;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 3000 == 0) {
  var diamonds = createSprite(Math.round(random(50, windowHeight-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = windowHeight/3;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 1600 == 0) {
  var jwellery = createSprite(Math.round(random(50, windowHeight-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = windowHeight/3;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % (300 + tt) == 0) {
  var sword = createSprite(Math.round(random(50, windowHeight-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = windowHeight/3;
  swordG.add(sword);
  tt = tt + 250
  }
}

function createCoin(){
  if (World.frameCount % 300 == 0) {
  var Coin = createSprite(Math.round(random(50, windowHeight-50),40, 10, 10));
  Coin.addImage(coinImg);
  Coin.scale=0.5;
  Coin.velocityY = 3;
  Coin.lifetime = windowHeight/3;
  coinGroup.add(Coin);
  }
}

function createBomb(){
  var t
  if (t * 1 != t){
    t = 450
  }
  if (World.frameCount % t == 0) {
    var Bomb = createSprite(Math.round(random(50, windowHeight-50),40, 10, 10));
    Bomb.addImage(bombImg);
    Bomb.scale=0.1;
    Bomb.velocityY = 3;
    Bomb.lifetime = windowHeight/3;
    bombGroup.add(Bomb);
    t = t - 6
    }
  }
function resete() {
      boy.destroy()
      end = createSprite(windowWidth/2, windowHeight/2)
      end.addImage ("end",endLoad);
      
    }
