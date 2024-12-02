window.onload = function() {

    let canvasContainer = document.getElementById('canvas-container');
    // let canvas = document.createElement('canvas');
    // let ctx = canvas.getContext('2d'); //da nush la startGame() de ce nu merge daca ii dau declare aici
    let button = document.getElementById('start-button');

    // document.addEventListener('click', function() { //nu mai trb click daca avem BUTTON

    //     // let canvasContainer = document.getElementById('canvas-container');
    //     // let canvas = document.createElement('canvas');
    //     // let context = canvas.getContext('2d'); //terbuia sa le dau declare inainte de functie but we ll live and we ll see

    //     canvasContainer.style.display = 'block';
    //     canvasContainer.appendChild(canvas);

    //     removeItems(); //bug when clic   king multiple times on the screen another canvas appears 
    //     document.removeEventListener('click', arguments.callee); //nvm solved :P
    // });

    function removeItems() {
         // let canvasContainer = document.getElementById('canvas-container'); // la fel ca la primele
         document.body.innerHTML = '';
         document.body.appendChild(canvasContainer);
    }

    button.addEventListener('click', function() {
        removeItems();
        canvasContainer.style.display = 'block';
        canvasContainer.appendChild(canvas);
    });

    
//DE CE NU MERGE 
     function startGame() {
        let canvas = document.querySelector('canvas'); //also de ce merge doar daca ii dau declare asa si nu poate sa ia de la ctx de SUS i hate javascript
        let ctx = canvas.getContext('2d'); //la fel ca la fel ca la primele
        let playerWidth = 120;
        let playerHeight = 10;

        let player = {
            x: canvas.width/2 - playerWidth/2,
            y: canvas.height - playerHeight - 10,
            width: playerWidth,
            height: playerHeight,
        }    
        
        ctx.fillStyle = 'red';
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    document.addEventListener('click', startGame);

}




