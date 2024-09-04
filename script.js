const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scale = 20; // Tamaño de cada segmento de la serpiente
const rows = canvas.height / scale;
const cols = canvas.width / scale;

let snake = [];
let snakeLength = 3;
let food = { x: 0, y: 0 };
let direction = 'RIGHT';
let nextDirection = 'RIGHT';
let gameOver = false;

function setup() {
    for (let i = 0; i < snakeLength; i++) {
        snake.push({ x: (snakeLength - i - 1) * scale, y: 0 });
    }
    placeFood();
    document.addEventListener('keydown', changeDirection);
    gameLoop();
}

function gameLoop() {
    if (gameOver) return;

    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        moveSnake();
        drawSnake();
        drawFood();
        checkCollision();
        gameLoop();
    }, 100);
}

function moveSnake() {
    const head = { ...snake[0] };

    switch (direction) {
        case 'LEFT':
            head.x -= scale;
            break;
        case 'RIGHT':
            head.x += scale;
            break;
        case 'UP':
            head.y -= scale;
            break;
        case 'DOWN':
            head.y += scale;
            break;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        snakeLength++;
        placeFood();
    } else {
        snake.pop();
    }

    direction = nextDirection;
}

function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, scale, scale));
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, scale, scale);
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * cols) * scale,
        y: Math.floor(Math.random() * rows) * scale
    };
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction !== 'DOWN') nextDirection = 'UP';
            break;
        case 'ArrowDown':
            if (direction !== 'UP') nextDirection = 'DOWN';
            break;
        case 'ArrowLeft':
            if (direction !== 'RIGHT') nextDirection = 'LEFT';
            break;
        case 'ArrowRight':
            if (direction !== 'LEFT') nextDirection = 'RIGHT';
            break;
    }
}

function checkCollision() {
    const head = snake[0];

    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        gameOver = true;
        alert('Game Over');
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver = true;
            alert('Game Over');
        }
    }
}

setup();
