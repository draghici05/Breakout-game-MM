window.onload = function () {

    let canvasContainer = document.getElementById('canvas-container');
    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');
    let button = document.getElementById('start-button');
    let level = 1;
    let brickArray = [];
    let score = 0;
    let lives = 3;
    let paddle = null;
    let ball = null;

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
        resetGame();
        displayBricks();
        generateScore();
        canvasContainer.addEventListener('mousemove', initializePaddle);
        requestAnimationFrame(game);

    }


    function resetGame() {
        level = 1;
        brickArray = [];
        score = 0;
        lives = 3;
        ball = null;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function gameOver() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '30px Arial';
        ctx.fillStyle = 'red';
        ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
        resetGame();
    }

    function generateScore() {
        ctx.font = '15px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText('Score: ' + score, 20, 20);
        ctx.fillText('Lives: ' + lives, canvas.width - 100 + 10, 20);
    }

    function displayBricks() {

        let brickWidth = 64.5;
        let brickHeight = 15;
        let brickColumn = (canvas.width - 16) / brickWidth;
        let brickRow = 5 * level;
        let brickX = 8;
        let brickY = 8 + 15 + 8;
        brickArray = [];

        let brickColors = ['yellow', 'orange', 'red', 'purple', 'blue'];

        for (let col = 0; col < brickColumn; col++) {
            for (let row = 0; row < brickRow; row++) {
                let brick = {
                    x: brickX + col * brickWidth + col * 10,
                    y: brickY + row * brickHeight + row * 10,
                    width: brickWidth,
                    height: brickHeight,
                    break: false,
                    points: 10 * level
                }
                brickArray.push(brick);
            }
        }

        for (let i = 0; i < brickArray.length; i++) {
            if (brickArray[i].break == false) {
            ctx.fillStyle = brickColors[i % brickColors.length];
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
                    radius: 10,
                    velocityX: 2, //initial velocities
                    velocityY: -2
                };
            }
        }, 2);

    }

    function animateBall() {
        ball.x += ball.velocityX;
        ball.y += ball.velocityY;

        if (ball.x < 8 || ball.x + 8 > canvas.width) {
            ball.velocityX = -ball.velocityX;
        } else
            if (ball.y < 8) {
                ball.velocityY = -ball.velocityY;
            } else
                if (ball.y > canvas.height) {  // need working here
                    lives--;
                    ball = null;
                    initializePaddle();
                }

        if (ball.x > paddle.x && ball.x < paddle.x + paddle.width && ball.y + 8 > paddle.y) {
            ball.velocityY = -ball.velocityY;
        }

        for (let i = 0; i < brickArray.length; i++) {
            if (brickArray[i].break == false && ball.x > brickArray[i].x && ball.x < brickArray[i].x + brickArray[i].width
                && ball.y + 8 > brickArray[i].y && ball.y < brickArray[i].y + brickArray[i].height) {
                ball.velocityY = -ball.velocityY;
                brickArray[i].break = true;
                score += brickArray[i].points;
                brickArray.splice(i, 1);
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

        if (lives == 0)  // game over condition
            gameOver();

        if (brickArray.length == 0) {  // next lvl condition
            level++;
            startGame();
        }

        requestAnimationFrame(game);
    }
}
