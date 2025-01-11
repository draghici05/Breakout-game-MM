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
    let level = 1;

    function removeItems() {
         document.body.innerHTML = '';
         document.body.appendChild(canvasContainer);
    }

    button.addEventListener('click', function() {
        removeItems();
        canvasContainer.style.display = 'block';
        canvasContainer.appendChild(canvas);
    });

    
    function startGame() {
        let canvas = document.querySelector('canvas'); 
        let ctx = canvas.getContext('2d'); 
        // let playerWidth = 100 / level;
        // let playerHeight = 10;

    // facea dublura cand dai click so i deleted it :p
    //     let player = { 
    //         x: canvas.width/2 - playerWidth/2,
    //         y: canvas.height - playerHeight - 8,
    //         width: playerWidth,
    //         height: playerHeight
    //     }

    // ctx.fillStyle = 'white';
    // ctx.fillRect(player.x, player.y, player.width, player.height);


    // ctx.fillStyle = 'green';
    // for (let i = 0; i < brickArray.length; i++) {
    //     let brick = brickArray[i]
    //     if (!brick.break) {
    //         ctx.fillRect(brick.x, brick.y, brick.width, brick.height)
    //     }
    // }
    score();
    displayBricks();
}

    function score() {
        ctx.font = '15px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText('Score: ' + score, 10, 20);
        ctx.fillText('Lives: ' + lives, canvas.width - 100, 20);
    }

    function displayBricks() {

        let canvas = document.querySelector('canvas'); 
        let ctx = canvas.getContext('2d'); 

        let brickArray = [];
        let brickWidth = 49.5;
        let brickHeight = 10;
        let brickColumn = (canvas.width - 16) / brickWidth;
        let brickRow = 5 * level;
        let brickCount = 0;
        let brickX = 8;
        let brickY = 8;

        let brickColors = ['yellow', 'orange', 'red', 'purple', 'blue'];
        
        for (let col = 0; col < brickColumn; col++) {
            for (let row = 0; row < brickRow; row ++ ) {
                let brick = {
                    x: brickX + col * brickWidth + col * 10,
                    y: brickY + row * brickHeight + row * 10,
                    width: brickWidth,
                    height: brickHeight,
                    break: false
                }
                brickArray.push(brick);
            }
        }
        brickCount = brickArray.length;

        for (let i = 0; i < brickArray.length; i++) {
            let brick = brickArray[i];
            ctx.fillStyle = 'green';
            ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
        }
    }

    function movePlayer(event) { //este generated vezi tu daca e ok sau fa-o sa nu para ca e generated :D
        let canvas = document.querySelector('canvas');
        let ctx = canvas.getContext('2d');
        let playerWidth = 100 / level;
        let playerHeight = 10;

        let player = { 
            x: event.clientX - canvas.offsetLeft - playerWidth / 2,
            y: canvas.height - playerHeight - 8,
            width: playerWidth,
            height: playerHeight
        }

        // condition to keep the player inside the canvas :D
        if(player.x < 8){
            player.x = 8;
        }
        else
        if(player.x + player.width - 8 > canvas.width) {
            player.x = canvas.width - player.width -8;
        }

        ctx.clearRect(0, 500, canvas.width, canvas.height); // clear the player from the canvas
        ctx.fillStyle = 'white';
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }

   canvasContainer.addEventListener('mousemove', movePlayer);
    document.addEventListener('click', startGame);
    displayBricks();

    // function gameOver() { //asta idk nu trebuie neap si nu e bine oricum
    //     let canvas = document.querySelector('canvas');
    //     let ctx = canvas.getContext('2d');
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    //     ctx.font = '30px Arial';
    //     ctx.fillStyle = 'red';
    //     ctx.fillText('Game Over', canvas.width/2 - 100, canvas.height/2);
    // }

}
