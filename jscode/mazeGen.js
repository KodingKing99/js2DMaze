// Grid size x and y
let WIDTH = 10;
let HEIGHT = 10;
let findIndexForTuple = (array, x, y) => {
    let index = -1;
    for(let i = 0; i < array.length; i++){
        if(array[i][0] === x){
            if(array[i][1] === y){
                return i;
            }
        }
    }
}
// returns the neighbors of a coordinate
let getNeighbors = (x, y) => {
    let neighbors = [];
    if(x > 0){ // left
        neighbors.push([x - 1, y]);
    }
    if(y < HEIGHT - 1){ // top 
        neighbors.push([x, y + 1]);
    }
    if(x < WIDTH - 1){ // right
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
    // that.setMazeNeighbors = (array) => {
    //     this.mazeNeighbors = array;
    // }
    // Returns a random wall for maze algorithm, which is tuple coordinate array. If walls is empty, return null
    that.getRandomWall = function(){
        if(this.walls.length > 0){
            let index = Math.floor(Math.random() * this.walls.length);
            return this.walls[index];
        }
        return null;
        
    }
    // Removes a wall from walls array
    that.removeWall = function(x, y) {
        
        console.log(`Removing wall (${x}, ${y}) for cell (${this.getX()}, ${this.getY()})`)
        console.log("cell walls before remove:")
        let wallz = [...this.walls]
        console.log(wallz);
        // console.log("index in array to remove: ")
        // console.log(findIndexForTuple(this.walls, x, y));
        this.walls.splice(findIndexForTuple(this.walls, x, y), 1);
        console.log("cell walls after remove:")
        console.log(this.walls);
        // wallz = [[0, 1]];
        // console.log("testing...")
        // console.log(findIndexForTuple(wallz, 0, 1))
        // console.log(wallz.find)
    }
    that.reportNeighbors = function(){
        console.log(`Reporting maze neighbors for cell ... (${this.getX()}, ${this.getY()})`)
        for(let i = 0; i < this.mazeNeighbors.length; i++){
            console.log(`(${this.mazeNeighbors[i].getX()}, ${this.mazeNeighbors[i].getY()})`)
        }
        console.log(this.mazeNeighbors)
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
    that.addToMaze = function(x, y) {
        // add the cell to the maze
        this.maze[x][y].isMaze = true;
    }
    
    that.addNeighborsToFrontier = function(x, y) {
        // get neighbors
        console.log("Adding cells neighbors to frontier")
        let neigbors = getNeighbors(x, y);
        console.log(neigbors);
        // loop through, add neighbor to frontier if it is not in the maze
        for(let i = 0; i < neigbors.length; i++){
            // console.log("in loop for adding neighbors")
            let myCell = maze[neigbors[i][0]][neigbors[i][1]];
            // console.log(myCell);
            if(!myCell.isMaze){
                this.frontier.push(myCell);
            }
        }
    }
    
    that.updateNeighbors = function(mazeX, mazeY, frontierX, frontierY){
        console.log("Updating cell neighbors...")
        // Add frontier cell as a neighbor
        this.maze[mazeX][mazeY].mazeNeighbors.push(this.maze[frontierX][frontierY])
        this.maze[frontierX][frontierY].mazeNeighbors.push(this.maze[mazeX][mazeY])
        console.log("Maze cell after updating maze neighbors")
        console.log(this.maze[mazeX][mazeY]);
        console.log(this.maze[mazeX][mazeY].reportNeighbors());
        console.log("Frontier cell after updating maze neighbors")
        console.log(this.maze[frontierX][frontierY].reportNeighbors())
    }
    that.removeWall = function(mazeX, mazeY, frontierX, frontierY){
        console.log("removing Walls for cells...")
        this.maze[mazeX][mazeY].removeWall(frontierX, frontierY);
        this.maze[frontierX][frontierY].removeWall(mazeX, mazeY);
        console.log("Maze cell after removing walls")
        console.log(this.maze[mazeX][mazeY])
        console.log("Frontier cell after removing walls")
        console.log(this.maze[frontierX][frontierY])
    }
    // that.removeCellFromFrontier = (frontierIndex) => {
    //     console.log("Removing cell from frontier");
    //     console.log("Frontier before splice")
    //     console.log(this.frontier);
    //     this.frontier.splice(frontierIndex, 1);
    //     console.log("Frontier after splice")
    //     console.log(this.frontier);
    // }
    that.updateCells = function(mazeX, mazeY, frontierX, frontierY, frontierIndex){
        console.log("Updating frontier and maze cells...");
        // console.log(this)
        this.addToMaze(frontierX, frontierY);
        this.updateNeighbors(mazeX, mazeY, frontierX, frontierY);
        this.removeWall(mazeX, mazeY, frontierX, frontierY);
        // this.removeCellFromFrontier(frontierIndex);
    }
    return that;
}
let addCellToMaze = (state) => {
    let x = Math.floor(Math.random() * WIDTH);
    let y = Math.floor(Math.random() * HEIGHT);
    state.addToMaze(x, y);
    console.log(`Adding a cell (${x}, ${y}) : position: (${state.maze[x][y].getX()}, ${state.maze[x][y].getY()}) to the maze `)
    console.log("adding cell's neighbors to the frontier")
    state.addNeighborsToFrontier(x, y);
}
let spreadMazeCells = (state) => {
    console.log("Procreating...");
    // let x = Math.floor(Math.random() * WIDTH);
    // let y = Math.floor(Math.random() * HEIGHT);
    let index = Math.floor(Math.random() * state.frontier.length);
    let frontierCell = state.frontier[index];
    console.log(`Picking frontier cell: (${state.frontier[index].getX()}, ${state.frontier[index].getY()})`)
    console.log(state.frontier[index]);
    let wallInMaze = frontierCell.getRandomWall();
    // console.log("Random wall picked: ")
    // console.log(wallInMaze);
    // console.log(state.maze[wallInMaze[0]][wallInMaze[1]]); 
    while(!state.maze[wallInMaze[0]][wallInMaze[1]].isMaze){
        wallInMaze = frontierCell.getRandomWall();
    }
    console.log("wall in maze picked: ")
    console.log(wallInMaze);
    console.log(state.maze[wallInMaze[0]][wallInMaze[1]]); 
    state.updateCells(wallInMaze[0], wallInMaze[1], frontierCell.getX(), frontierCell.getY(), index);

}
let generateMaze = () => {
    let gamestate = getGameState();
    console.log(gamestate);
    addCellToMaze(gamestate); 
    console.log(gamestate);
    spreadMazeCells(gamestate);
}
generateMaze();
