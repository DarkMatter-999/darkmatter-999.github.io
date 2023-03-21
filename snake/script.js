const viewport = document.getElementById("viewport");

const context = viewport.getContext("2d");

const SPEED = 5;
let Score = 0;
let restart = false;

// Setup
const drawScreen = () => {
    clearScreen();
    drawGame();
};

const clearScreen = () => {
    context.fillStyle = "black";
    context.fillRect(0, 0, viewport.width, viewport.height);
};

// Loop
const drawGame = () => {
    if (restart) {
        changeSnakePosition();

        clearScreen();

        //check is the player died
        if (isGameOver()) {
            displayGameOver();
            console.log("GameOver");
            restart = false;
        }

        drawSnake();

        checkCollision();
        drawFood();
        drawScore();
    }
    setTimeout(drawGame, 1000 / SPEED);
};

const tileCount = 20;
const tileSize = 18;
let headX = 10;
let headY = 10;

let xvel = 0;
let yvel = -1;

const snake = [];
let tailLength = 2;

class Snake {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
    //up
    if (event.keyCode == 38) {
        yvel = -1; //move one tile up
        xvel = 0;
    }
    //down
    if (event.keyCode == 40) {
        yvel = 1; //move one tile down
        xvel = 0;
    }

    //left
    if (event.keyCode == 37) {
        yvel = 0;
        xvel = -1; //move one tile left
    }
    //right
    if (event.keyCode == 39) {
        yvel = 0;
        xvel = 1; //move one tile right
    }
}

const drawSnake = () => {
    context.fillStyle = "orange";

    for (let i = 0; i < snake.length; i++) {
        const part = snake[i];
        context.fillRect(
            part.x * tileCount,
            part.y * tileCount,
            tileSize,
            tileSize
        );
    }

    // add new node and delete the last node
    snake.push(new Snake(headX, headY));
    if (snake.length > tailLength) {
        snake.shift();
    }
};

function changeSnakePosition() {
    headX = headX + xvel;
    headY = headY + yvel;
}

let foodX = Math.floor(Math.random() * tileCount);
let foodY = Math.floor(Math.random() * tileCount);

const drawFood = () => {
    context.fillStyle = "red";
    context.fillRect(foodX * tileCount, foodY * tileCount, tileSize, tileSize);
};

const checkCollision = () => {
    if (foodX == headX && foodY == headY) {
        foodX = Math.floor(Math.random() * tileCount);
        foodY = Math.floor(Math.random() * tileCount);
        tailLength++;
        Score++;
    }
};

const drawScore = () => {
    context.fillStyle = "white";
    context.font = "10px verdena";
    context.fillText("Score: " + Score, 5, 10);
};

const isGameOver = () => {
    if (xvel === 0 && yvel === 0) {
        return true;
    } else if (headX < 0 || headX === tileCount) {
        return true;
    } else if (headY < 0 || headY === tileCount) {
        return true;
    }

    for (let i = 0; i < snake.length; i++) {
        const part = snake[i];
        if (part.x === headX && part.y === headY) {
            return true;
        }
    }

    return false;
};

const displayGameOver = () => {
    context.fillStyle = "white";
    context.font = "50px verdana";
    context.fillText(
        "Game Over",
        viewport.clientWidth / 6.5,
        viewport.clientHeight / 2
    );
};

const Restart = () => {
    headX = 10;
    headY = 10;

    xvel = 0;
    yvel = -1;

    tailLength = 2;

    while (snake.length) {
        snake.pop();
    }

    restart = true;
};

const moveUp = () => {
    yvel = -1; //move one tile up
    xvel = 0;
};
const moveDown = () => {
    yvel = 1; //move one tile down
    xvel = 0;
};

const moveLeft = () => {
    yvel = 0;
    xvel = -1; //move one tile left
};
const moveRight = () => {
    yvel = 0;
    xvel = 1; //move one tile right
};

drawScreen();
