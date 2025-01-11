window.onload = function() {

    let canvasContainer = document.getElementById('canvas-container');
    // let canvas = document.createElement('canvas');
    // let ctx = canvas.getContext('2d'); 
    let button = document.getElementById('start-button');

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
    

    ctx.fillstyle = 'green'
    for (let i = 0; i < brickArray.length; i ++) {
        let brick = brickArray[i];
        if (!brick.break) {
            ctx.fillRect(brick.x, brick.y, brick.width, brick.height)
        }
    }
    }

    function createBricks() {
        brickArray = [];
        for (let c = 0; c < brickColumns; c++) {
            for (let r = 0; r < brickRows; r++) {
                let brick = {
                    x: brickX + c*brickWidth + c*10,
                    y: brickY + r*brickHeight + r*10,
                    width: brickWidth,
                    height: brickHeight,
                }
                brickArray.push(brick);
            }
        }
        brickCount = brickArray.length;
    }
    

    function movePlayer(event) { //este generated vezi tu daca e ok sau fa-o sa nu para ca e generated :D
        let canvas = document.querySelector('canvas');
        let ctx = canvas.getContext('2d');
        let playerWidth = 140;
        let playerHeight = 10;

        let player = { 
            x: event.clientX - canvas.offsetLeft - playerWidth / 2,
            y: canvas.height - playerHeight - 8,
            width: playerWidth,
            height: playerHeight
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    canvasContainer.addEventListener('mousemove', movePlayer);
    document.addEventListener('click', startGame);

    function gameOver() { //asta idk nu trebuie neap si nu e bine oricum
        let canvas = document.querySelector('canvas');
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '30px Arial';
        ctx.fillStyle = 'red';
        ctx.fillText('Game Over', canvas.width/2 - 100, canvas.height/2);
    }
    
}




