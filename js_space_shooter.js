function setup() {
  createCanvas(windowWidth,windowHeight);
  background(0);
}

var spos = 500;
var bullets = [];
var asteroids = [];
var adder = 150;
var astspeed = 1;
var score = 0;
var lost = false;
var gameover = 0;

function draw() {
  if (!lost){
    background(0);
    let i = 0;
    while (i <= 255){
      fill(0,0,255-i);
      stroke(0,0,255-i);
      rect(0,i,windowWidth,0.5);
      i += 0.5;
    }
    
    if (keyIsDown(RIGHT_ARROW)){
      spos += 5;
    }
    if (keyIsDown(LEFT_ARROW)){
      spos -= 5;
    }
    
    fill(225,0,0);
    rect(spos,windowHeight-25,100,25);
    fill(0,225,0);
    rect(spos+40,windowHeight-50,20,50);
    
    fill(0,255,0);
    stroke(0,255,0);
    let j = 0;
    while (j < bullets.length){
      if (bullets[j+2] == 'green'){
        stroke(0,255,0);
        fill(0,255,0);
      } else {
        stroke(255,255,0);
        fill(255,255,0);
      }
      
      ellipse(bullets[j],bullets[j+1],5,20);
      bullets[j+1] = bullets[j+1]-Math.random()*10;
      j += 3;
      if (bullets[j+1] <= -10){
        bullets.splice(j, 3);
        if (bullets[j+2] == 'green'){
          score -= 1;
        }
      }
    }
    
    fill(225,0,0);
    let a = 0;
    while (a < asteroids.length){
      ellipse(asteroids[a],asteroids[a+1],20,20);
      asteroids[a+1] = asteroids[a+1] + astspeed;
      
      if (asteroids[a+1] >= windowHeight){
        lost = true;
      }
      
      j = 0;
      while (j < bullets.length){
        if ((Math.abs(asteroids[a]-bullets[j]) < 25) && (Math.abs(asteroids[a+1]-bullets[j+1]) < 25)){
          asteroids.splice(a, 2);
          if (bullets[j+2] == 'green'){
            bullets[j+2] = 'yellow';
          } else {
            bullets.splice(j, 3);
          }
          
          score += 100;
        }
        j += 3;
      }
      
      a += 2;
    }
    
    if (Math.floor(Math.random() * adder) == 5){
      asteroids.push(Math.floor(Math.random() * windowWidth));
      asteroids.push(-10);
    }
    
    stroke(255);
    fill(255);
    text('Score: '+score,800,100);
    
    adder -= 0.01;
    astspeed += 0.0001;
  } else if (gameover < windowWidth){
    fill(200,0,0);
    stroke(200,0,0);
    rect(0,windowHeight-gameover,windowWidth,gameover);
    gameover += 10;
    fill(0,255,0);
    textSize(40);
    text('GAME OVER',500,250);
  } else {
    fill(200,0,0);
    stroke(200,0,0);
    rect(0,0,windowWidth,windowWidth-(gameover/2));
    gameover += 10;
    fill(0,255,0);
    textSize(40);
    text('GAME OVER',500,250);
  }
  
}

function keyPressed(){
  if (key == ' '){
    bullets.push(spos+50);
    bullets.push(windowHeight-40);
    bullets.push('green');
  }
}
