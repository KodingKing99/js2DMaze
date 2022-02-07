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
    //by default, the cell has no neighbors in the maze
    // I'm planning on using this array to store the 'walls'
    // by 'remove wall' I will add that cell as a neighbor
    that.mazeNeighbors = [];
    // By default, the walls are the neighbors of x and y
    that.walls = getNeighbors(x, y);
    that.isMaze = false;
    that.getX = function(){
        return x;
    }
    that.getY = function(){
        return y;
    }
    that.getMazeNeighbors = function(){
        return this.mazeNeighbors;
    }
    that.setMazeNeighbors = (array) => {
        this.mazeNeighbors = array;
    }
    that.getRandomWall = function(){
        
    }
    return that;
}
let getMaze = (x, y) => {
   let maze = [];
   for(var i = 0; i < x; i++){
        let inner = [];
        for(var j = 0; j < y; j++){
            let cell = getCell(i, j);
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
    // let frontier = [];
    that.maze = maze;
    that.frontier = [];
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
        for(let i = 0; i < neigbors.length; i++){
            console.log("in loop for adding neighbors")
            let myCell = maze[neigbors[i][0]][neigbors[i][1]];
            console.log(myCell);
            if(!myCell.isMaze){
                that.frontier.push(myCell);
            }
        } 
    }
    return that;
}
let addCellToMaze = (state) => {
    let x = Math.floor(Math.random() * WIDTH);
    let y = Math.floor(Math.random() * HEIGHT);
    console.log(`Adding a cell (${x}, ${y}) : position: (${state.maze[x][y].getX()}, ${state.maze[x][y].getY()}) to the frontier `)
    state.addNeighborsToFrontier(x, y);
}
let spreadMazeCells = (state) => {
    console.log("Procreating...");
    // let x = Math.floor(Math.random() * WIDTH);
    // let y = Math.floor(Math.random() * HEIGHT);
    let index = Math.floor(Math.random() * state.frontier.length);
    console.log(`Picking frontier cell: (${state.frontier[index].getX()}, ${state.frontier[index].getY()})`)
    console.log(state.frontier[index]);

}
let generateMaze = () => {
    let gamestate = getGameState();
    console.log(gamestate);
    addCellToMaze(gamestate); 
    console.log(gamestate);
    spreadMazeCells(gamestate);
}
generateMaze();
