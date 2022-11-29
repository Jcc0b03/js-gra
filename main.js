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

let scrollScreen = false;
let scrollingSpeed = 0;

let gameState = 0; //0 - menu; 1 - game 

//menu
let menuText = new Image();

//update display
async function render(){
    await mainGameCanvas2dContext.clearRect(0,0,width,height);
    switch(gameState){
        case 0:
            await mainGameCanvas2dContext.drawImage(menuText, (width/2)-(308/2),(height/2)-(57/2),308,57);
            break;
        case 1:
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
            break;
    }
}

let scrollBackground = false;

async function animationHandler(){
    switch(gameState){
        case 0:
            break;
        case 1:
            for(let enemyCounter = 0; enemyCounter < enemiesObjects.length; enemyCounter++){
                enemiesObjects[enemyCounter].animate();
            }
            for(let bombCounter = 0; bombCounter < bombObjects.length; bombCounter++){
                bombObjects[bombCounter].animate();
            }

            playerObject.animate();
            break;
    }
    render();
}

// window.addEventListener("keydown", keyDownHandler);
// window.addEventListener("keyup", keyUpHandler);

// function keyDownHandler(e){
//     switch(e.key){
//         case "ArrowRight":
//             movementRight = true;
//             break;
//         case "ArrowLeft":
//             movementLeft = true;
//             break;
//         case "ArrowUp":
//             playerState = 2;
//             break;
//     }   
//     console.log(e.key)
// }

//keyboard handler
let movementRight = false;
let movementLeft = false;

function newB(x, y, width){
    return new Beam(36 * x, 36 * y, width)
}

// game elements init
let obstacles
let controll
let enemiesObjects = []

function initialization(){
    // let generated = generate_terrain()

    obstacles = [
        newB(11, 5, 5),
        newB(1, 9, 4),
        newB(4, 3, 2),
        newB(7, 9, 10),
    ]

    // obstacles.push(...generated[0])

    enemiesObjects = [
        new Enemy(0, 300, 0, timing),
        new Enemy(1, 390, 0, timing),
        new Enemy(2, 480, 0, timing),
    ]

    // enemiesObjects.push(...generated[1])

    controll = new Controll(playerObject, timing)
}

function mainGameLoop(){
    // to delete
    gameState = 1
    switch(gameState){
        case 0:
            
            break;
        case 1:
            for(let bombCounter = 0; bombCounter < bombObjects.length; bombCounter++){
                bombObjects[bombCounter].update();
            }

            for(let enemyCounter = 0; enemyCounter < enemiesObjects.length; enemyCounter++){
                enemiesObjects[enemyCounter].update();
                enemiesObjects[enemyCounter].updatePos(obstacles);
            }
            controll.tick();
            playerObject.update(obstacles);
            clearBombObjectsArray();
            applyScrollingSpeed();
            break;
    }
}

window.addEventListener("graphics_loaded", () => {
    initialization();
})

window.addEventListener("graphics_loaded", () => {
    setInterval(animationHandler, 60);
    menuText.src = graphics.mainMenuText.idle[0];
})

window.addEventListener("graphics_loaded", () => {
    setInterval(mainGameLoop, timing);
});

window.addEventListener("keydown", (e) => {
    if(gameState==0){
        if(e.key=="Enter"){
            gameState=1;
        }
    }
})
