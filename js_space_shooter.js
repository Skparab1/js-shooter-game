function setup() {
  createCanvas(windowWidth,windowHeight);
  background(0);
}

var spos = 500;
var bullets = [];
var asteroids = [];
var points = [];
var adder = 150;
var astspeed = 1;
var score = 0;
var lost = false;
var gameover = 0;
var invincibility = false;
var bsize = 5;
var slowspeed = 100;
var moneytimer = 120;
var largeb = 301;

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
      
      ellipse(bullets[j],bullets[j+1],bsize,bsize*4);
      bullets[j+1] = bullets[j+1]-5;
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
        if (!invincibility){
          lost = true;
        } else {
          invincibility = false;
          asteroids.splice(a, 2);
        }
      }
      
      j = 0;
      while (j < bullets.length){
        if ((Math.abs(asteroids[a]-bullets[j]) < 25*bsize/5) && (Math.abs(asteroids[a+1]-bullets[j+1]) < 25*bsize/4)){
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
    
    let x = 0;
    while (x < points.length){
      fill(255,150,0);
      stroke(255,150,0);
      textSize(20);
      text(points[x+2],points[x],points[x+1]);
      print(points[x+2],points[x],points[x+1]);
     
      j = 0;
      while (j < bullets.length){
        if ((Math.abs((points[x]+35)-bullets[j]) < 35) && (Math.abs(points[x+1]-bullets[j+1]) < 25)){
          if (points[x+2] == '$$$'){
            score += 500;
            moneytimer = 0;
          } else if (points[x+2] == 'TIME'){
            astspeed = 0.5*astspeed;
            slowspeed = 0;
          } else if (points[x+2] == 'INVINCIBILITY'){
            invincibility = true;
          } else if (points[x+2] == 'LARGE BULLETS'){
            bsize = bsize*2;
            largeb = 0;
          } else if (points[x+2] == 'ALL FIRE'){
            let a = 25;
            while (a < windowWidth){
              bullets.push(a);
              bullets.push(windowHeight-40);
              bullets.push('green');
              a += 25;
            }
          }
          points.splice(x, 3);
          
          if (bullets[j+2] == 'green'){
            bullets[j+2] = 'yellow';
          } else {
            bullets.splice(j, 3);
          }
          
          score += 100;
        }
        j += 3;
      }
      
      points[x+1] += 1;
      
      x += 3;
    }
    
    if (Math.floor(Math.random() * adder) == 5){
      asteroids.push(Math.floor(Math.random() * windowWidth));
      asteroids.push(-10);
    }
    
    if (Math.floor(Math.random() * 190) == 5){
      points.push(Math.floor(Math.random() * windowWidth));
      points.push(-10);
      
      let randobj = Math.floor(Math.random() * 5); // 0,1,2,3,4
      if (randobj == 0){
        points.push('$$$');
      } else if (randobj == 1){
        points.push('TIME');
      } else if (randobj == 2){
        points.push('INVINCIBILITY');
      } else if (randobj == 3){
        points.push('LARGE BULLETS');
      } else {
        points.push('ALL FIRE');
      }
    }
    
    textSize(40);
    stroke(255);
    fill(255);
    text('Score: '+score,800,100);
    
    adder -= 0.01;
    moneytimer += 1;
    largeb += 1;
    if (invincibility){
      text('Invincibility active',650,200);
    }
    if (moneytimer < 120){
      text('Money gained',700,250);
    }
    if (largeb < 300){
      text('Large bullets expiring in '+(120-largeb)/6600,300);
    }
    if (largeb == 120){
      bsize = bsize/2;
    }
    
    if (slowspeed < 1){
      text('Time: expiring in '+(1-slowspeed),600,150);
      slowspeed += 0.002777777778;
    } else if (Math.abs(slowspeed - 1) < 0.1){
      astspeed = 1;
    } else {
      astspeed += 0.0001;
    }
  } else if (gameover < windowWidth){
    fill(200,0,0);
    stroke(200,0,0);
    rect(0,windowHeight-gameover,windowWidth,gameover);
    gameover += 10;
    fill(0,255,0);
    textSize(40);
    text('GAME OVER',500,250);
    text('SCORE: '+score,500,300);
    text('Press any key to play again',300,350);
  } else {
    fill(200,0,0);
    stroke(200,0,0);
    rect(0,0,windowWidth,windowWidth-(gameover/2));
    gameover += 10;
    fill(0,255,0);
    textSize(40);
    text('GAME OVER',500,250);
    text('SCORE: '+score,500,300);
    text('Press any key to play again',300,350);
  }
  
}

function keyPressed(){
  if (key == ' '){
    bullets.push(spos+50);
    bullets.push(windowHeight-40);
    bullets.push('green');
  }
  if (lost){
    location.reload();
  }
}
