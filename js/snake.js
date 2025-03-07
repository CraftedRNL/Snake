import { getInputDirection } from "./input.js";
let speedVar;
export var SNAKE_SPEED = 10;
var snakeBody = [
    { x: 11, y: 11}
];
let newSegments = 0;

var e = document.getElementById("color");
var text = e.options[e.selectedIndex].text;
let name;
let select = document.getElementById("color");
select.addEventListener('change', function(){
   name = select.options[select.selectedIndex].text;
        console.log(name)

})


export function update(){
    addSegments();
    const inputDirection = getInputDirection();
    for(let i = snakeBody.length - 2; i >= 0;i--){
        snakeBody[i+1] = {...snakeBody[i]}
        
    }

    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
    
    
}
export function draw(gameBoard){
    snakeBody.forEach(segment =>{
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.style.backgroundColor= text;
        snakeElement.classList.add('snake');
        snakeElement.id = ('snake');
        gameBoard.appendChild(snakeElement);
        snakeElement.style.backgroundColor = name;
         
        changeSpeed();
    })

}

export function expandSnake(amount){
    newSegments += amount;
}
export function onSnake(position, {ignoreHead = false} = {}){
    
    return snakeBody.some((segment, index) =>{
        if(ignoreHead && index ===0) {
            return false
        };
        return equalPositions(segment, position)
    })
}
export function snakeIntersection(){
    return onSnake(snakeBody[0], {ignoreHead:true});
}
function equalPositions(pos1, pos2){
    return pos1.x === pos2.x && pos1.y === pos2.y;
}
function addSegments(){
    for(let i =0; i < newSegments;i++){
        snakeBody.push({ ...snakeBody[snakeBody.length-1]});
    }
    newSegments = 0;
    
}
export function getSnakeHead(){
    return snakeBody[0];
}

function changeSpeed() {
    speedVar = document.getElementById("speed").value;
    if(speedVar === ""){
        speedVar = 1;
    }
    console.log(speedVar)
    SNAKE_SPEED = speedVar;
}