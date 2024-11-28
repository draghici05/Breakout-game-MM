window.onload = function() {
    
     //bug when clicking multiple times on the screen another canvas appears 
    document.addEventListener('click', function() {

        let canvasContainer = document.getElementById('canvas-container');
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d'); //terbuia sa le dau declare inainte de functie but we ll live and we ll see

        canvasContainer.style.display = 'block';
        canvasContainer.appendChild(canvas);

        removeItems();
        document.removeEventListener('click', arguments.callee); //nvm solved :P
    });

    function removeItems() {
        let canvasContainer = document.getElementById('canvas-container'); // la fel ca la primele
        document.body.innerHTML = '';
        document.body.appendChild(canvasContainer);
    }
//DE CE NU MERGE
    function startGame() {
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d'); //la fel ca la fel ca la primele
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '30px Arial'; 
        ctx.fillStyle = 'white';
        ctx.fillText('Game Started!', 150, 300);
    }

    document.addEventListener('click', startGame);
}




