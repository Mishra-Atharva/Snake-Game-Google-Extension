//Board
var blockSize = 25;
var row = 20;
var cols = 20;
var board;
var context;
var points = 0;
var highScore;

//Snake
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var snakeBody = [];

//Food
var foodX;
var foodY;

//Movement
var velocityX = 0;
var velocityY = 0;

//alive?
gameOver = false;

window.onload = function() {
    highScore = localStorage.getItem("pts");
    board = document.getElementById("board");
    board.height = row * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placeFood()
    document.addEventListener("keyup", changeDirection);
    setInterval(change, 1000/10);
}

function change() {
    if (gameOver) {
        if (points > highScore) {
            localStorage.setItem("pts", points);
        }
        setInterval(window.location.reload(), 500);
        return;
    }
    document.getElementById("pts").innerHTML = "Score: " + points + "<br> High Score: " + highScore;

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        points += 5;
        placeFood();
    }
    
    for (var i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;

    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for (var i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //gamve over conditions
    if (snakeX == 0 || snakeX > cols*blockSize || snakeY == 0 || snakeY > row*blockSize) {
        gameOver = true;
    }

    for (var i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * row) * blockSize;
}