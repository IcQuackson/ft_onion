const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game constants
const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;
const MAX_BOUNCE_ANGLE = Math.PI / 3; // 60°
const BASE_SPEED = 10;

// Game state
let playerY = canvas.height / 2 - paddleHeight / 2;
let aiY = playerY;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballVX = BASE_SPEED;
let ballVY = 0;

let upPressed = false;
let downPressed = false;

let playerScore = 0;
let aiScore = 0;

// Input handling
document.addEventListener("keydown", e => {
  if (e.key === "w") upPressed = true;
  if (e.key === "s") downPressed = true;
});

document.addEventListener("keyup", e => {
  if (e.key === "w") upPressed = false;
  if (e.key === "s") downPressed = false;
});

// Drawing helpers
function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawBall(x, y, size, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fill();
}

function reflectFromPaddle(paddleY, isLeftSide) {
  const relativeIntersectY = (ballY - (paddleY + paddleHeight / 2)) / (paddleHeight / 2);
  const bounceAngle = relativeIntersectY * MAX_BOUNCE_ANGLE;

  ballVX = BASE_SPEED * Math.cos(bounceAngle) * (isLeftSide ? 1 : -1);
  ballVY = BASE_SPEED * Math.sin(bounceAngle);
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballVX = -ballVX;
  ballVY = (Math.random() - 0.5) * 4;
}

// Game update
function update() {
  // Move player
  if (upPressed) playerY -= 6;
  if (downPressed) playerY += 6;
  playerY = Math.max(0, Math.min(canvas.height - paddleHeight, playerY));

  // Move AI (imperfect tracking)
  const aiCenter = aiY + paddleHeight / 2;
  const targetY = ballY + Math.random() * 30 - 15;
  const diff = targetY - aiCenter;

  if (Math.abs(diff) > 10) {
    aiY += diff > 0 ? 3 : -3;
  }

  aiY = Math.max(0, Math.min(canvas.height - paddleHeight, aiY));

  // Move ball
  ballX += ballVX;
  ballY += ballVY;

  // Wall collision
  if (ballY <= 0 || ballY >= canvas.height) {
    ballVY = -ballVY;
  }

  // Paddle collisions
  if (ballX < 20 && ballY > playerY && ballY < playerY + paddleHeight) {
    ballX = 20;
    reflectFromPaddle(playerY, true);
  }

  if (ballX > canvas.width - 20 && ballY > aiY && ballY < aiY + paddleHeight) {
    ballX = canvas.width - 20;
    reflectFromPaddle(aiY, false);
  }

  // Score
  if (ballX < 0) {
    aiScore++;
    resetBall();
  }

  if (ballX > canvas.width) {
    playerScore++;
    resetBall();
  }

  // Update score display
  document.querySelector(".scoreboard").textContent = `Player: ${playerScore}   AI: ${aiScore}`;
}

// Game draw
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dashed middle line
  ctx.strokeStyle = "#555";
  ctx.setLineDash([5, 15]);
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();
  ctx.setLineDash([]);

  // Draw paddles and ball
  drawRect(10, playerY, paddleWidth, paddleHeight, "#0f0");
  drawRect(canvas.width - 20, aiY, paddleWidth, paddleHeight, "#f00");
  drawBall(ballX, ballY, ballSize, "#fff");
}

// Main loop
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
