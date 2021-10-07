var bg, bgImg;
var player, defaultPAnim, playerAnim, shooter_shooting;
var lives, lives_1, lives_2, lives_3;
var zombie, zombieAnim, ry;
var lives__ = 3;

function preload() {
  // Images
  lives_1 = loadImage("assets/heart_1.png");
  lives_2 = loadImage("assets/heart_2.png");
  lives_3 = loadImage("assets/heart_3.png");
  bgImg = loadImage("assets/bg.jpeg");

  // Animations
  shooter_shooting = loadAnimation("assets/shooter_3.png");
  defaultPAnim = loadAnimation("assets/shooter_2.png");
  playerAnim = loadAnimation("assets/shooter_1.png", "assets/shooter_2.png");
  zombieAnim = loadAnimation("assets/zombie_1.png", "assets/zombie_2.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //adding the background image
  // bg = createSprite(displayWidth / 2 - 20, displayHeight / 2 - 40, 20, 20);
  // bg.addImage(bgImg);
  // bg.scale = 1.1;

  lives = createSprite(120, 50, 50, 50);
  lives.addImage(lives_3);
  lives.scale = 0.25;

  Zombie();

  //creating the player sprite
  player = createSprite(displayWidth - 1150, displayHeight - 300, 50, 50);
  player.addAnimation("PAnim", defaultPAnim);
  player.scale = 0.3;
  player.setCollider("rectangle", 0, 0, 300, 300);
  // console.log(ry);
}

function draw() {
  background(bgImg);
  if (frameCount < 160 && frameCount > 20) {
    fill("aliceblue");
    textSize(34);
    text("Game Started!", width / 2 - 100, 50);
  }
  // Adding all the functionality to the zombie
  if (zombie.isTouching(player)) {
    zombie.destroy();
    Zombie();
    if (lives__ == 3) {
      lives.addImage(lives_2);
      lives__ = 2;
    } else if (lives__ == 2) {
      lives.addImage(lives_1);
      lives__ = 1;
    } else if (lives__ == 1) {
      lives.destroy();
      lives__ = 0;
    }
  }
  if (zombie.x < 0) {
    zombie.destroy();
    Zombie();
  }
  if (lives__ == 0) {
    player.destroy();
    zombie.destroy();
    fill("orangered");
    textSize(80);
    stroke("orangered");
    strokeWeight(3);
    text("GAME OVER!!", width / 2 - 260, height / 2 - 30);
  }

  //moving the player up and down and making the game mobile compatible using touches
  if (keyDown("UP_ARROW") || touches.length > 0) {
    player.y += -30;
    player.addAnimation("PAnim", playerAnim);
  } else if (keyWentUp("UP_ARROW") || touches.length > 0) {
    player.y += -30;
    player.addAnimation("PAnim", defaultPAnim);
  }
  if (keyDown("DOWN_ARROW") || touches.length > 0) {
    player.y += +30;
    player.addAnimation("PAnim", playerAnim);
  } else if (keyWentUp("DOWN_ARROW") || touches.length > 0) {
    player.y += +30;
    player.addAnimation("PAnim", defaultPAnim);
  }

  //release bullets and change the image of shooter to shooting position when the s key is pressed
  if (keyDown("s")) {
    player.addAnimation("PAnim", shooter_shooting);
  }
  //player goes back to original standing image once we stop pressing the space bar
  else if (keyWentUp("s")) {
    player.addAnimation("PAnim", defaultPAnim);
  }

  drawSprites();
}

function Zombie() {
  // creating zombie sprite
  ry = random([320, 160, 460]);
  zombie = createSprite(width + 30, ry, 50, 50);
  zombie.velocityX = -3;
  zombie.addAnimation("zAnim", zombieAnim);
  zombie.scale = 0.14;
  zombie.setCollider("rectangle", 0, 0, 300, 700);
}
