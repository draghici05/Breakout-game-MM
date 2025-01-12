let level = 1;
let brickArray = [];
let score = 0;
let lives = 3;
let speed = 5;
let paddle = null;
let ball = null;
let sound = new Audio('assets/Death.mp3');
sound.volume = 0.1;
let music = new Audio('assets/OST.mp3');
music.volume = 0.1;

window.onload = function () {

    let canvasContainer = document.getElementById('canvas-container');
    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');
    let button = document.getElementById('start-button');

    function removeItems() {
        document.body.innerHTML = '';
        document.body.appendChild(canvasContainer);
    }

    button.addEventListener('click', function () {
        removeItems();
        canvasContainer.style.display = 'block';
        canvasContainer.appendChild(canvas);
        startGame();
    });

    function startGame() {
        music.play();
        resetGame();
        initializeBricks();
        generateScore();
        canvasContainer.addEventListener('mousemove', initializePaddle);
        requestAnimationFrame(game);

    }

    function resetGame() {
        level = 1;
        brickArray = [];
        score = 0;
        lives = 3;
        speed = 2;
        ball = null;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        music.play();
        initializeBricks();
    }

    function gameOver() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#FF5047';
        ctx.textAlign = 'center';
        ctx.font = '45px Comic Sans MS';

        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 25);
        ctx.fillText('Press SPACE to restart', canvas.width / 2, canvas.height / 2 + 25);


        document.addEventListener('keydown', function (e) {
            if (e.code === 'Space') {
                resetGame();
            }
        });
        document.addEventListener('keyup', function (e) {
            if (e.code === 'Space') {
                resetGame();
            }
        });

        document.removeEventListener('keydown', resetGame);
        document.removeEventListener('keyup', resetGame);
    }

    function generateScore() {
        ctx.font = '15px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText('Score: ' + score, 20, 20);
        ctx.fillText('Lives: ' + lives, canvas.width - 80, 20);
        ctx.fillText('Level: ' + level, canvas.width / 2, 20);
    }

    function nextLevel() {
        level++;
        speed = 2;
        resetBall();
        initializeBricks();
        initializeBall(paddle);
    }

    function initializeBricks() {

        let brickWidth = 64.5;
        let brickHeight = 20;
        let brickColumn = (canvas.width - 16) / brickWidth;
        let brickRow = 5 * level;
        let brickX = 8;
        let brickY = 8 + 15 + 8;
        brickArray = [];

        let brickColors = ['#FF1900', '#FF8800', '#FFFA00', '#00FF2E', '#057DFF', '#9800FF'];

        for (let col = 0; col < brickColumn; col++) {
            for (let row = 0; row < brickRow; row++) {
                let brick = {
                    x: brickX + col * brickWidth + col * 10,
                    y: brickY + row * brickHeight + row * 10,
                    width: brickWidth,
                    height: brickHeight,
                    break: false,
                    points: 10 * (brickRow - row),
                    color: brickColors[row % brickColors.length]
                }
                brickArray.push(brick);
            }
        }

        for (let i = 0; i < brickArray.length; i++) {
            if (brickArray[i].break == false) {
                ctx.fillStyle = brickArray[i].color;
                ctx.fillRect(brickArray[i].x, brickArray[i].y, brickArray[i].width, brickArray[i].height);
            }
        }
    }

    function displayBricks() {
        for (let i = 0; i < brickArray.length; i++) {
            if (brickArray[i].break == false) {
                ctx.fillStyle = brickArray[i].color;
                ctx.fillRect(brickArray[i].x, brickArray[i].y, brickArray[i].width, brickArray[i].height);
            }
        }
    }

    let previousPaddleX = 500;
    let previousPaddleY = 500;

    function initializePaddle(event) {
        let paddleWidth = 100 / level;
        let paddleHeight = 10;

        paddle = {
            x: event.clientX - canvas.offsetLeft - paddleWidth / 2,
            y: canvas.height - paddleHeight - 8,
            width: paddleWidth,
            height: paddleHeight
        }

        // condition to keep the player inside the canvas :D
        if (paddle.x + paddle.width - 8 > canvas.width) {
            paddle.x = canvas.width - 8 - paddle.width;
        }
        else
            if (paddle.x < 8) {
                paddle.x = 8;
            }


        ctx.clearRect(previousPaddleX, previousPaddleY, paddleWidth, paddleHeight); // clear the player from the canvas
        ctx.fillStyle = 'white';
        ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

        previousPaddleX = paddle.x;
        previousPaddleY = paddle.y;
        initializeBall(paddle);

    }

    function initializeBall(paddle) {
        setTimeout(() => {
            if (!ball) {
                ball = {
                    x: paddle.x + paddle.width / 2,
                    y: paddle.y - 10,
                    radius: 8,
                    velocityX: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 2, //initial velocities
                    velocityY: -2
                };
            }
        }, 20);
    }

    function resetBall() {
        ball = null;
        speed = 2;
        if (lives > 0) {
            setTimeout(() => {
                initializeBall(paddle);
            }, 1000);
        } else {
            sound.play();
            music.pause();
            gameOver();
        }
    }

    function animateBall() {
        ball.x += ball.velocityX * speed;
        ball.y += ball.velocityY * speed;

        if (ball.x < 8 || ball.x + 8 > canvas.width) {
            ball.velocityX = -ball.velocityX;
        }
        if (ball.y < 8) {
            ball.velocityY = -ball.velocityY;
        }
        if (ball.y > canvas.height) {
            lives--;
            resetBall();
            return;
        }

        if (ball.x > paddle.x && ball.x < paddle.x + paddle.width && ball.y + 8 > paddle.y) { // ball hits the paddle
            ball.velocityY = -Math.abs(ball.velocityY);

            let random = (Math.random() < 0.5 ? -1 : 1) * Math.random() * 2;
            ball.velocityX = random;
        }

        for (let i = 0; i < brickArray.length; i++) {
            if (brickArray[i].break == false && ball.x > brickArray[i].x && ball.x < brickArray[i].x + brickArray[i].width
                && ball.y + 8 > brickArray[i].y && ball.y < brickArray[i].y + brickArray[i].height) {
                ball.velocityY = -ball.velocityY;
                brickArray[i].break = true;
                score += brickArray[i].points;
                brickArray.splice(i, 1);

                speed = speed + score / 10000;
            }
        }


        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
    }


    function game() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        displayBricks();
        generateScore();

        if (paddle) {
            ctx.fillStyle = 'white';
            ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
        }

        if (ball) {
            animateBall();
        }

        if (lives == 0) {  // game over condition
            gameOver();
        }

        if (brickArray.length == 0) {
            nextLevel();
        }

        requestAnimationFrame(game);
    }
}
