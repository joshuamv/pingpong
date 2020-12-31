
//////////////// global vars /////////////////

var ball = {};
var padL = {};
var padR = {};

var scoreL = 0;
var scoreR = 0;

//////////////// run when html loads /////////////////

// $(document).ready(function() {
//
// }

//////////////// functions /////////////////

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  textFont('VT323');
  textAlign(CENTER, CENTER);
  resetBall();

  padL.x = 20;
  padL.y = height/2;
  padL.len = 200;

  padR.x = width - 20;
  padR.y = height/2;
  padR.len = 200;
}

function draw() {
  background(0);

  //score
  noStroke();
  fill(255);
  textSize(60);
  text(scoreL, width/2 - 100, 80);
  text(scoreR, width/2 + 100, 80);

  //middle line
  stroke(255);
  strokeWeight(3);
  line(width/2, 0, width/2, height);

  update();

  //draw ball
  noStroke();
  fill(255);
  rect(ball.x, ball.y, ball.r*2, ball.r*2);

  //draw pads
  //left pad
  noStroke();
  fill(255);
  rect(padL.x, padL.y, 20, padL.len);
  //right pad
  noStroke();
  fill(255);
  rect(padR.x, padR.y, 20, padR.len);

}

function update() {

  //update pads
  padL.y = mouseY;

  var badPlayer = map(noise(frameCount*0.01), 0, 1, 0, height);
  var perfectPlayer = padR.y = ball.y;
  var distPadR = map(dist(ball.x, ball.y, padR.x, padR.y), 0, width, 0, 1);
  var padRlerp = lerp(perfectPlayer, badPlayer, 0.1 + distPadR);
  padR.y = padRlerp;

  //update ball pos
  ball.x += ball.vx;
  ball.y += ball.vy;

  //bound ball to window from x axis
  if (ball.y > height || ball.y < 0) {
    ball.vy *= -1;
  }

  //update scores
  if (ball.x > width + 20) {
    scoreL++;
    resetBall();
  }

  if (ball.x < 0 - 20) {
    scoreR++;
    resetBall();
  }

  //hit a player user side
  var dx = dist(ball.x + ball.r, 0, padL.x + 10, 0);
  var dy = dist(0, ball.y, 0, padL.y);

  if (dx < 10 && dy < padL.len/2) {
    ball.vx *= -1;
    ball.x = padL.x + 10 + ball.r;
  }

  //hit a player computer side
  var dx = dist(ball.x + ball.r, 0, padR.x + 10, 0);
  var dy = dist(0, ball.y, 0, padR.y);

  if (dx < 10 && dy < padR.len/2) {
    ball.vx *= -1;
    ball.x = padR.x - 10 - ball.r;
  }

}

function resetBall() {
  ball.x = width/2;
  ball.y = height/2;
  var spd = 10;
  ball.vx = random(12, 15);
  ball.vy = random(12, 15);
  if (random(100) > 50) {ball.vx *= -1}
  if (random(100) > 50) {ball.vy *= -1}
  ball.r = 10;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

}
