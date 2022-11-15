//canvas configuration
const mainGameCanvas = document.querySelector("#display");

let scale = 0.5
let width = window.innerWidth * scale;
let height = window.innerHeight * scale;
mainGameCanvas.width = width;
mainGameCanvas.height = height; 
let timing = Math.round(1000/60)

console.log(mainGameCanvas.width, mainGameCanvas.height);
const mainGameCanvas2dContext = mainGameCanvas.getContext('2d');

//update display
async function render(){
    await mainGameCanvas2dContext.clearRect(0,0,width,height);
    for(let enemyCounter = 0; enemyCounter < enemiesObjects.length; enemyCounter++){
        enemiesObjects[enemyCounter].render();
    }
    for(let bombCounter = 0; bombCounter < bombObjects.length; bombCounter++){
        bombObjects[bombCounter].render();
    }
    playerObject.render();
}

let scrollBackground = false;

async function animationHandler(){
    for(let enemyCounter = 0; enemyCounter < enemiesObjects.length; enemyCounter++){
        enemiesObjects[enemyCounter].animate();
    }
    for(let bombCounter = 0; bombCounter < bombObjects.length; bombCounter++){
        bombObjects[bombCounter].animate();
    }
    playerObject.animate();
    render();
}

// window.addEventListener("keydown", keyDownHandler);
// window.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e){
    switch(e.key){
        case "ArrowRight":
            movementRight = true;
            break;
        case "ArrowLeft":
            movementLeft = true;
            break;
        case "ArrowUp":
            playerState = 2;
            break;
    }   
    console.log(e.key)
}

//keyboard handler
let movementRight = false;
let movementLeft = false;

function mainGameLoop(){
    // if(movementRight){
    //     playerObject.setSpeed(10);
    //     playerObject.setState(1);
    // }else{
    //     playerObject.setSpeed(0);
    //     playerObject.setState(0);
    // }

    // if(movementLeft&&!movementRight){
    //     playerObject.setSpeed(-10);
    //     playerObject.setState(1);
    // }



    for(let bombCounter = 0; bombCounter < bombObjects.length; bombCounter++){
        bombObjects[bombCounter].update();
    }

    for(let enemyCounter = 0; enemyCounter < enemiesObjects.length; enemyCounter++){
        enemiesObjects[enemyCounter].update();
    }
    playerObject.update();
    clearBombObjectsArray();
}

// function keyUpHandler(e){
//     switch(e.key){
//         case "ArrowRight":
//             movementRight = false;
//             break;
//         case "ArrowLeft":
//             movementLeft = false;
//             break;
//         case "ArrowUp":
//             playerState = 0;
//             break;
//         case " ":
//             playerObject.dropBomb();
//             console.log(bombObjects)
//             break;
//     }
// }

//utils
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.addEventListener("graphics_loaded", () => {
    setInterval(animationHandler, 60);
})

window.addEventListener("graphics_loaded", () => {
    setInterval(mainGameLoop, timing);
})

let obstacles = [
    new Beam(0, 410, 300, 30),
    new Beam(400, 410, 500, 30),
]

let controll = new Controll(player)
setInterval(()=>{
    controll.tick()
    player.updatePos(obstacles)
    collide(player, obstacles[0])
}, )