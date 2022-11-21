//canvas configuration
const mainGameCanvas = document.querySelector("#display");

let scale = 0.5
let width = window.innerWidth * scale;
let height = window.innerHeight * scale;
mainGameCanvas.width = width;
mainGameCanvas.height = height; 
let timing = Math.round(1000/60)
// let timing = 300 // for debbugging

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
    obstacles.forEach(obstacle => {
        obstacle.render()
    });
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

// game elements init
let obstacles
let controll
let enemiesObjects

function initialization(){
    obstacles = [
        new Beam(36, 310, 4),
        new Beam(36 * 7, 310, 6),
        new Beam(36 * 11, 160, 10),
    ]

    enemiesObjects = [
        new enemy(0, 300, 0, timing),
        new enemy(1, 390, 0, timing),
        new enemy(2, 480, 0, timing),
    ];

    controll = new Controll(playerObject, timing)
}

function mainGameLoop(){
    for(let bombCounter = 0; bombCounter < bombObjects.length; bombCounter++){
        bombObjects[bombCounter].update();
    }

    for(let enemyCounter = 0; enemyCounter < enemiesObjects.length; enemyCounter++){
        enemiesObjects[enemyCounter].update();
        enemiesObjects[enemyCounter].updatePos(obstacles);
    }
    controll.tick()
    playerObject.update(obstacles);
    clearBombObjectsArray();
}

window.addEventListener("graphics_loaded", () => {
    initialization();
})

window.addEventListener("graphics_loaded", () => {
    setInterval(animationHandler, 60);
})

window.addEventListener("graphics_loaded", () => {
    setInterval(mainGameLoop, timing);
})
