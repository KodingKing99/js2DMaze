// Grid size x and y
let WIDTH = 10;
let HEIGHT = 10;
// construct cells,  
let constructMaze = () => {
    let maze = [];
    for(var i = 0; i < WIDTH; i++){
        let inner = [];
        for(var j = 0; j < HEIGHT; j++){
            inner.push(0);    
        }
        maze.push(inner);
    }
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    console.log(`Picking cell (${x}, ${y})`)
    // add the cell to the maze
    maze[x][y] = 1;
    console.log(maze);
    let neighbors = getNeighbors(x, y)
    console.log("Neighbors:")
    console.log(neighbors);
}
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
constructMaze();
