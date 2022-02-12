Maze.graphics = (function(){
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let COORD_SIZE = 1000;
    CanvasRenderingContext2D.prototype.clear = function(){
        this.clearRect(0, 0, canvas.width, canvas.height);
    }    
    let clearScreen = function(){
        context.clear();
    }
    let drawOutline = function(){
        context.strokeStyle = 'rgba(0, 0, 255, 1)';
        context.lineWidth = 2;
        context.strokeRect(
        canvas.width / 4, canvas.height / 4,
        canvas.width / 2, canvas.height / 2);
    }
    function drawCell(cell, cellSize) {
        // if (imgFloor.isReady) {
        //     context.drawImage(imgFloor,
        //     cell.x * (COORD_SIZE / 3), cell.y * (COORD_SIZE / 3),
        //     COORD_SIZE / 3 + 0.5, COORD_SIZE / 3 + 0.5);
        // }
        console.log(cell)
        console.log(`Postion: ${cell.getX()}, ${cell.getY()}`)
        cell.reportNeighbors();
        // debugger;
        // if (cell.mazeNeighbors["TOP"] === null) {
        //     // console.log(`Moving to ${}`)
        //     context.moveTo(cell.getX() * (COORD_SIZE / cellSize), cell.getY() * (COORD_SIZE / cellSize));
        //     context.lineTo((cell.getX() + 1) * (COORD_SIZE / cellSize), cell.getY() * (COORD_SIZE / cellSize));
        // }
    
        if (cell.mazeNeighbors["BOTTOM"] === null) {
            context.moveTo(cell.getX() * (COORD_SIZE / cellSize), (cell.getY() + 1) * (COORD_SIZE / cellSize));
            context.lineTo((cell.getX() + 1) * (COORD_SIZE / cellSize), (cell.getY() + 1) * (COORD_SIZE / cellSize));
        }
    
        if (cell.mazeNeighbors["RIGHT"] === null) {
            context.moveTo((cell.getX() + 1) * (COORD_SIZE / cellSize), cell.getY() * (COORD_SIZE / cellSize));
            context.lineTo((cell.getX() + 1) * (COORD_SIZE / cellSize), (cell.getY() + 1) * (COORD_SIZE / cellSize));
        }
    
        if (cell.mazeNeighbors["LEFT"] === null) {
            context.moveTo(cell.getX() * (COORD_SIZE / cellSize), cell.getY() * (COORD_SIZE / cellSize));
            context.lineTo(cell.getX() * (COORD_SIZE / cellSize), (cell.getY() + 1) * (COORD_SIZE / cellSize));
        }
        if (cell.mazeNeighbors["TOP"] === null) {
            context.moveTo(cell.getY() * (COORD_SIZE / cellSize), cell.getX() * (COORD_SIZE / cellSize));
            context.lineTo(cell.getY() * (COORD_SIZE / cellSize), (cell.getX() + 1) * (COORD_SIZE / cellSize));
        }
    
        // if (cell.mazeNeighbors["BOTTOM"] === null) {
        //     context.moveTo(cell.getY() + 1 * (COORD_SIZE / cellSize), cell.getX() * (COORD_SIZE / cellSize));
        //     context.lineTo(cell.getY() + 1 * (COORD_SIZE / cellSize), (cell.getX() + 1) * (COORD_SIZE / cellSize));
        // }
    
        // if (cell.mazeNeighbors["RIGHT"] === null) {
        //     context.moveTo(cell.getY() * (COORD_SIZE / cellSize), (cell.getX() + 1) * (COORD_SIZE / cellSize));
        //     context.lineTo((cell.getY() + 1) * (COORD_SIZE / cellSize), (cell.getX() + 1) * (COORD_SIZE / cellSize));
        // }
    
        // if (cell.mazeNeighbors["LEFT"] === null) {
        //     context.moveTo(cell.getY() * (COORD_SIZE / cellSize), cell.getX() * (COORD_SIZE / cellSize));
        //     context.lineTo((cell.getY() + 1) * (COORD_SIZE / cellSize), cell.getX() * (COORD_SIZE / cellSize));
        // }
    }
    function renderMaze(gameState, width, height) {
        // Render the cells first
        context.beginPath();
        // console.log(gameState);
        for (let row = 0; row < width; row++) {
            for (let col = 0; col < height; col++) {
                drawCell(gameState.maze[col][row], width);
            }
        }
        // console.log(gameState.maze[0][0])
        context.strokeStyle = 'rgb(0, 0, 0)';
        context.lineWidth = 6;
        context.stroke();

        // Draw a black border around the whole maze
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(COORD_SIZE - 1, 0);
        context.lineTo(COORD_SIZE - 1, COORD_SIZE - 1);
        context.lineTo(0, COORD_SIZE - 1);
        context.closePath();
        context.strokeStyle = 'rgb(0, 0, 0)';
        context.stroke();
    }
    return {
        clearScreen: clearScreen,
        drawOutline: drawOutline,
        renderMaze: renderMaze
    }
}());

Maze.main = (function(graphics){
    'use strict';
    let lastTimeStamp = performance.now();
    let gameState = generateMaze(WIDTH, HEIGHT);
    console.log(gameState);
    let processInput = function(elapsedTime){
        // do nothing yet
    }
    let render = function(){
        graphics.clearScreen();
        graphics.renderMaze(gameState, WIDTH, HEIGHT);
    }
    let update = function(elapsedTime){
        // do nothing yet
    }
    let gameLoop = function(newTimeStamp){
        let elapsedTime = newTimeStamp - lastTimeStamp;
        processInput(elapsedTime);
        update(elapsedTime);
        render();
        // requestAnimationFrame(gameLoop);
    }
    console.log('Game Initializing')
    requestAnimationFrame(gameLoop);

}(Maze.graphics));