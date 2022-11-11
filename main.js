//canvas configuration
const mainGameCanvas = document.querySelector("#display");

let scale = 0.5
let width = window.innerWidth * scale;
let height = window.innerHeight * scale;
mainGameCanvas.width = width;
mainGameCanvas.height = height; 

console.log(mainGameCanvas.width, mainGameCanvas.height);
const mainGameCanvas2dContext = mainGameCanvas.getContext('2d');

//loading resources
const graphics = {
    player: {
        idleAnimationSize: 26, 
        idle: [],
        walkAnimationSize: 14,
        walkRight: [],
        walkLeft: [],
        jumpAnimationSize: 4,
        jump: [],
    },
    bomb: {
        bomb_off: "",
        bombOnAnimationSize: 10,
        bomb_on: [],
        explosionAnimationSize: 9,
        explosion: [] 
    }
}

const loadGraphics = function(){
    console.log("loading graphics")
    for(let i = 1; i<=graphics.player.idleAnimationSize; i+=1){
        fetch(`resources/Sprites/player/idle/${i}.png`).then(image => image.blob()).then(imageBlob => {
            let imageToBase64Converter = new FileReader();
            imageToBase64Converter.addEventListener("load", () => {
                graphics.player.idle.push(imageToBase64Converter.result);
            });
            imageToBase64Converter.readAsDataURL(imageBlob);
        })
    }

    for(let i = 1; i<=graphics.player.walkAnimationSize; i+=1){
        fetch(`resources/Sprites/player/walkRight/${i}.png`).then(image => image.blob()).then(imageBlob => {
            let imageToBase64Converter = new FileReader();
            imageToBase64Converter.addEventListener("load", () => {
                graphics.player.walkRight.push(imageToBase64Converter.result);
            });
            imageToBase64Converter.readAsDataURL(imageBlob);
        })
    }

    for(let i = 1; i<=graphics.player.walkAnimationSize; i+=1){
        fetch(`resources/Sprites/player/walkLeft/${i}.png`).then(image => image.blob()).then(imageBlob => {
            let imageToBase64Converter = new FileReader();
            imageToBase64Converter.addEventListener("load", () => {
                graphics.player.walkLeft.push(imageToBase64Converter.result);
            });
            imageToBase64Converter.readAsDataURL(imageBlob);
        })
    }

    for(let i = 1; i<=graphics.player.jumpAnimationSize; i+=1){
        fetch(`resources/Sprites/player/jump/${i}.png`).then(image => image.blob()).then(imageBlob => {
            let imageToBase64Converter = new FileReader();
            imageToBase64Converter.addEventListener("load", () => {
                graphics.player.jump.push(imageToBase64Converter.result);
            });
            imageToBase64Converter.readAsDataURL(imageBlob);
        })
    }

    for(let i = 1; i<=graphics.bomb.bombOnAnimationSize; i+=1){
        fetch(`resources/Sprites/bomb/on/${i}.png`).then(image => image.blob()).then(imageBlob => {
            let imageToBase64Converter = new FileReader();
            imageToBase64Converter.addEventListener("load", () => {
                graphics.bomb.bomb_on.push(imageToBase64Converter.result);
            });
            imageToBase64Converter.readAsDataURL(imageBlob);
        })
    }

    for(let i = 1; i<=graphics.bomb.explosionAnimationSize; i+=1){
        fetch(`resources/Sprites/bomb/explosion/${i}.png`).then(image => image.blob()).then(imageBlob => {
            let imageToBase64Converter = new FileReader();
            imageToBase64Converter.addEventListener("load", () => {
                graphics.bomb.explosion.push(imageToBase64Converter.result);
                if(graphics.bomb.explosion.length==graphics.bomb.explosionAnimationSize){
                    window.dispatchEvent(new Event("graphics_loaded"));
                }
            });
            imageToBase64Converter.readAsDataURL(imageBlob);
        })
    }
    console.log(graphics)
}

window.addEventListener("load", loadGraphics);

//update display
async function render(){
    await mainGameCanvas2dContext.clearRect(0,0,width,height);
    for(let bombCounter = 0; bombCounter < bombObjects.length; bombCounter++){
        bombObjects[bombCounter].render();
    }
    playerObject.render();
}

let scrollBackground = false;

async function animationHandler(){
    for(let bombCounter = 0; bombCounter < bombObjects.length; bombCounter++){
        bombObjects[bombCounter].animate();
    }
    playerObject.animate();
    render();
}

window.addEventListener("keydown", keyDownHandler);
window.addEventListener("keyup", keyUpHandler);

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

let movementRight = false;
let movementLeft = false;

function mainGameLoop(){
    if(movementRight){
        playerObject.setSpeed(10);
        playerObject.setState(1);
    }else{
        playerObject.setSpeed(0);
        playerObject.setState(0);
    }

    if(movementLeft&&!movementRight){
        playerObject.setSpeed(-10);
        playerObject.setState(1);
    }
    for(let bombCounter = 0; bombCounter < bombObjects.length; bombCounter++){
        bombObjects[bombCounter].update();
    }
    playerObject.update();
    clearBombObjectsArray();
}

function keyUpHandler(e){
    switch(e.key){
        case "ArrowRight":
            movementRight = false;
            break;
        case "ArrowLeft":
            movementLeft = false;
            break;
        case "ArrowUp":
            playerState = 0;
            break;
        case " ":
            playerObject.dropBomb();
            console.log(bombObjects)
            break;
    }
}

//utils
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.addEventListener("graphics_loaded", () => {
    setInterval(animationHandler, 60);
})

window.addEventListener("graphics_loaded", () => {
    setInterval(mainGameLoop, 60);
})