// Grid size x and y
let WIDTH = 5;
let HEIGHT = 5;
let findIndexForTuple = (array, x, y) => {
    let index = -1;
    for(let i = 0; i < array.length; i++){
        if(array[i][0] === x){
            if(array[i][1] === y){
                index = i;
            }
        }
    }
    return index;
}
// let findIndexForFrontier = (cellArray, )
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
// wall is a tuple
let getWallChar = (wall, x, y) => {
    // left
    if(wall[0] === x - 1 && wall[1] === y){
        return ["TOP", "|"]
    }
    // top
    if(wall[0] === x && wall[1] === y + 1){
        return ["RIGHT", "-"]
    }
    // right
    if(wall[0] === x + 1 && wall[1] === y){
        return ["BOTTOM", "|"]
    }
    if(wall[0] === x && wall[1] === y - 1){
        return ["LEFT", "_"]
    }
     

}
// returns cell object
let getCell = (x, y) => {
    let that = {};
    //by default, the cell has no neighbors in the maze
    // I'm planning on using this array to store the 'walls'
    // by 'remove wall' I will add that cell as a neighbor
    that.mazeNeighbors = that.mazeNeighbors = {
        "TOP": null,
        "LEFT": null,
        "RIGHT": null,
        "BOTTOM": null
    };
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
        let wallsCopy = [...this.walls];

        wallsCopy.splice(findIndexForTuple(this.walls, x, y), 1);
        this.walls = wallsCopy;
    }
    that.reportNeighbors = function(){
        console.log(`Reporting maze neighbors for cell ... (${this.getX()}, ${this.getY()})`)
        // for(let i = 0; i < this.mazeNeighbors.length; i++){
        //     console.log(`(${this.mazeNeighbors[i].getX()}, ${this.mazeNeighbors[i].getY()})`)
        // }
        console.log(this.mazeNeighbors)
    }
    that.cellString = function(){
        let returnString = "";
        for(let i = 0; i < this.walls.length; i++){
            let wallChar =  getWallChar(this.walls[i], x, y);
            if(wallChar[0] === "TOP"){
                returnString += wallChar[1];
            }
            // else{
            //     returnString += "\n";
            // }
            else if(wallChar[0] === "LEFT"){
                returnString += wallChar[1];
            }
            else if(wallChar[0] === "BOTTOM"){
                returnString += wallChar[1];
            }
            else if(wallChar[0] === "RIGHT"){
                returnString += wallChar[1];
            }
        }
        return returnString;
    }
    that.reportWalls = function(){
        let retList = []
        for(let i = 0; i < this.walls.length; i++){
            let wallChar =  getWallChar(this.walls[i], x, y);
            retList.push(wallChar[0]);
            
        }
        console.log(`Cell Postion (${this.getX()}, ${this.getY()}) walls:`)
        console.log(this.walls);
        console.log(retList);
    }
        
    // }
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
let getGameState = (width, height) => {
    let that = {};
    let maze = getMaze(width, height);
    // let frontier = [];
    that.maze = maze;
    that.frontier = [];
    that.addToMaze = function(x, y) {
        // add the cell to the maze
        this.maze[x][y].isMaze = true;
    }
    that.mazeToString = function() {
        let retString = ""
        for(let i = 0; i < this.maze.length; i++){
            for(let j = 0; j < this.maze[i].length; j++){
                retString += this.maze[i][j].cellString();
            }
            retString += "\n";
        }
        return retString;
    }
    that.reportFrontier = function() {
        for(let i = 0; i < this.frontier.length; i++){
            console.log(`Cell: (${this.frontier[i].getX()}, ${this.frontier[i].getY()})`)
        }
        console.log(this.frontier);
    }
    that.reportMazeWalls = function() {
        // let retString = ""
        for(let i = 0; i < this.maze.length; i++){
            for(let j = 0; j < this.maze[i].length; j++){
                // retString += this.maze[i][j].cellString();
                this.maze[i][j].reportWalls();
                this.maze[i][j].reportNeighbors();
            }
            // retString += "\n";
        }
        // return retString;
    }
    // that.reportMazeWalls = function() {
    //     // let retString = ""
    //     for(let i = 0; i < this.maze.length; i++){
    //         for(let j = 0; j < this.maze[i].length; j++){
    //             // retString += this.maze[i][j].cellString();
    //             this.maze[i][j].reportWalls();
    //         }
    //         // retString += "\n";
    //     }
    //     // return retString;
    // }
    that.addNeighborsToFrontier = function(x, y) {
        // get neighbors
        let neigbors = getNeighbors(x, y);
        // loop through, add neighbor to frontier if it is not in the maze
        for(let i = 0; i < neigbors.length; i++){
            let myCell = maze[neigbors[i][0]][neigbors[i][1]];
            // Check if the cell is in the maze, or if it is already in the frontier
            if(!myCell.isMaze && !this.frontier.includes(myCell)){
                this.frontier.push(myCell);
            }
        }
    }
    that.updateNeighbors = function(mazeX, mazeY, frontierX, frontierY){
        // Add frontier cell as a neighbor
        // console.log("Updating neighbors for maze and frontier cell")
        // this.maze[mazeX][mazeY].mazeNeighbors.push(this.maze[frontierX][frontierY])
        this.maze[mazeX][mazeY].mazeNeighbors[getWallChar([frontierX, frontierY], mazeX, mazeY)[0]] = this.maze[frontierX][frontierY];
        this.maze[frontierX][frontierY].mazeNeighbors[getWallChar([mazeX, mazeY], frontierX, frontierY)[0]] = this.maze[mazeX][mazeY];
        // console.log("maze cell")
        // this.maze[mazeX][mazeY].reportNeighbors();
        // console.log("frontier cell")
        // this.maze[frontierX][frontierY].reportNeighbors();
        // this.maze[frontierX][frontierY].mazeNeighbors.push(this.maze[mazeX][mazeY])
    }
    that.removeWall = function(mazeX, mazeY, frontierX, frontierY){
        this.maze[mazeX][mazeY].removeWall(frontierX, frontierY);
        this.maze[frontierX][frontierY].removeWall(mazeX, mazeY);
    }
    that.removeCellFromFrontier = function(frontierIndex){
        let frontierCopy = [...this.frontier];
        frontierCopy.splice(frontierIndex, 1);
        this.frontier = frontierCopy;
    }
    that.updateCells = function(mazeX, mazeY, frontierX, frontierY, frontierIndex){
        this.addToMaze(frontierX, frontierY);
        this.updateNeighbors(mazeX, mazeY, frontierX, frontierY);
        this.removeWall(mazeX, mazeY, frontierX, frontierY);
        this.removeCellFromFrontier(frontierIndex);
        this.addNeighborsToFrontier(frontierX, frontierY);
    }
    return that;
}
let addCellToMaze = (state) => {
    // Starting Cell
    let x = 0;
    let y = 0;
    state.addToMaze(x, y);
    state.addNeighborsToFrontier(x, y);
}
let spreadMazeCells = (state) => {
    console.log("Procreating...");
    while(state.frontier.length > 0){
    let index = Math.floor(Math.random() * state.frontier.length);
    let frontierCell = state.frontier[index];
    let wallInMaze = frontierCell.getRandomWall();
    if(wallInMaze === null){
        state.removeCellFromFrontier(index);
        continue;
    }
    while(!state.maze[wallInMaze[0]][wallInMaze[1]].isMaze){
        wallInMaze = frontierCell.getRandomWall();
    }
    state.updateCells(wallInMaze[0], wallInMaze[1], frontierCell.getX(), frontierCell.getY(), index);
    // state.reportFrontier();
    }
    
}
let generateMaze = (width, height) => {
    let gamestate = getGameState(width, height);
    console.log(gamestate);
    gamestate.reportMazeWalls()
    addCellToMaze(gamestate); 
    spreadMazeCells(gamestate);
    console.log("Ending State")
    console.log(gamestate)
    gamestate.reportMazeWalls()

}
generateMaze(WIDTH, HEIGHT);
