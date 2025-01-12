window.onload = function() {

    let canvasContainer = document.getElementById('canvas-container');//nu stiu  de ce si 
    // cum faci dar daca dai declare la 
    //let brickArray = [];
    //let score = 0;
    //let lives = 3;
    //let player = null; globally nu mai merge butonul :D
    
    // let canvas = document.createElement('canvas');
    // let ctx = canvas.getContext('2d'); 
    let button = document.getElementById('start-button');

    function removeItems() {
        document.body.innerHTML = '';
        document.body.appendChild(canvasContainer);
    }

    button.addEventListener('click', function () {
        removeItems();
        canvasContainer.style.display = 'block';
        canvasContainer.appendChild(canvas);
    });

    function startGame() {
        let canvas = document.querySelector('canvas'); 
        let ctx = canvas.getContext('2d'); 
        let playerWidth = 140;
        let playerHeight = 10;

        let player = { 
            x: canvas.width/2 - playerWidth/2,
            y: canvas.height - playerHeight - 8,
            width: playerWidth,
            height: playerHeight
        }

    ctx.fillStyle = 'white';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    ctx.fillStyle = 'green';
    for (let i = 0; i < brickArray.length; i++) {
        let brick = brickArray[i]
        if (!brick.break) {
            ctx.fillRect(brick.x, brick.y, brick.width, brick.height)
        }
    }
    score();
    displayBricks();
}

    function score() {
        ctx.font = '15px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText('Score: ' + score, 20, 20);
        ctx.fillText('Lives: ' + lives, canvas.width - 80, 20);
        ctx.fillText('Level: ' + level, canvas.width/2, 20);
    }

    function displayBricks() {
        let brickArray = [];
        let brickWidth = 50;
        let brickHeight = 10;
        let brickColumn = 5;
        let brickRow = 3;
        let brickCount = 0;
        let brickX = 15;
        let brickY = 45;
        
        brickArray = [];
        
        for (let col = 0; colu < brickColumn; col++) {
            for (let row = 0; row < brickRow; row ++ ) {
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
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    canvasContainer.addEventListener('mousemove', movePlayer);
    document.addEventListener('click', startGame);
    

    // function gameOver() { //asta idk nu trebuie neap si nu e bine oricum
    //     let canvas = document.querySelector('canvas');
    //     let ctx = canvas.getContext('2d');
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    //     ctx.font = '30px Arial';
    //     ctx.fillStyle = 'red';
    //     ctx.fillText('Game Over', canvas.width/2 - 100, canvas.height/2);
    // }
    
}




