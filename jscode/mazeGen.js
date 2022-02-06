// Grid size x and y
let WIDTH = 10;
let HEIGHT = 10;
// returns the neighbors of a coordinate
let getNeighbors = (x, y) => {
    let neighbors = [];
    if(x > 0){ // left
        neighbors.push([x - 1, y]);
    }
    if(y < HEIGHT){ // top 
        neighbors.push([x, y + 1]);
    }
    if(x < WIDTH){ // right
        neighbors.push([x + 1, y]);
    }
    if(y > 0){ // bottom 
        neighbors.push([x, y - 1]);
    }
    
    return neighbors;
}
// returns cell object
let getCell = (x, y) => {
    let that = {};
    //by default the neighboring cells as walls;
    that.walls = getNeighbors(x, y);
    that.isMaze = false;
    that.getX = function(){
        return x;
    }
    that.getY = function(){
        return y;
    }
    that.getWalls = function(){
        return this.walls;
    }
    that.setWalls = (array) => {
        this.walls = array;
    }
    return that;
}
let getMaze = (x, y) => {
   let maze = [];
   for(var i = 0; i < x; i++){
        let inner = [];
        for(var j = 0; j < y; j++){
            let cell = getCell(i, j);
            console.log(cell);
            inner.push(cell);    
        }
        maze.push(inner);
    }
    return maze;
}
// Returns a gamestate object with getters and setters
let getGameState = () => {
    let that = {};
    let maze = getMaze(WIDTH, HEIGHT);
    let frontier = [];
    that.maze = maze;
    that.addToMaze = (x, y) => {
        // add the cell to the maze
        maze[x][y].isMaze = true;
    }
    that.addNeighborsToFrontier = (x, y) => {
        // get neighbors
        console.log("Adding cells neighbors to frontier")
        let neigbors = getNeighbors(x, y);
        console.log(neigbors);
        // loop through, add neighbor to frontier if it is not in the maze
        for(let i = 0; i < neigbors; ++i){
            let myCell = maze[neigbors[i][0]][neigbors[i][1]];
            console.log(myCell);
            if(!myCell.isMaze){
                frontier.push(myCell);
            }
        } 
    }
    // that.getFrontier = () => {
    //     return frontier;
    // }
    // that.setFrontier = (array) => {
    //     that.frontier = array;
    // } 
    return that;
}
let gamestate = getGameState([]);
console.log(gamestate);
let x = Math.floor(Math.random() * 10);
let y = Math.floor(Math.random() * 10);

console.log(`Adding a cell (${x}, ${y}) : position: (${gamestate.maze[x][y].getX()}, ${gamestate.maze[x][y].getY()}) to the frontier `)
gamestate.addNeighborsToFrontier(x, y)
console.log(gamestate);
