

let getContext = () => {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');    
    return context;
}
let clearScreen = (context) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
}
let drawRect = (context) => {
    context.strokeStyle = 'rgba(0, 0, 255, 1)';
    context.lineWidth = 2;
    context.strokeRect(
    canvas.width / 4, canvas.height / 4,
    canvas.width / 2, canvas.height / 2);
}