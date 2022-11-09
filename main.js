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
                if(graphics.player.jump.length==graphics.player.jumpAnimationSize){
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
async function flipDisplay(){
    await mainGameCanvas2dContext.clearRect(0,0,width,height);
    mainGameCanvas2dContext.drawImage(player, playerX, playerY);
}

//animations and controls of player
let playerX = 0;
let playerY = height-58;

let playerMaxSpeed = 5;
let playerCurrentSpeed = 0;
let jumpHeight = 20;

let canMoveRight = true;
let isMovingRight = false;

let canMoveLeft = true;
let isMovingLeft = false;

let isGrounded = true;
let jumpStartedFlag = false;

let player = new Image();
let playerState = 0;
let animationFrame = 0;
async function animationHandler(){
    if(isGrounded){
        switch(playerState){
            case 0:
                if(animationFrame > graphics.player.idleAnimationSize-1){
                    animationFrame = 0
                }
                player.src = graphics.player.idle[animationFrame];
                break
            case 1:
                if(animationFrame > graphics.player.walkAnimationSize-1){
                    animationFrame = 0
                }
                if(playerCurrentSpeed>0){
                    player.src = graphics.player.walkRight[animationFrame];
                }else{
                    player.src = graphics.player.walkLeft[animationFrame];
                }
                break;
        }
    }else{
        if(!jumpStartedFlag){
            for(let jumpAnimationFrame=0;jumpAnimationFrame<graphics.player.jumpAnimationSize-1;jumpAnimationFrame++){
                player.src = graphics.player.jump[jumpAnimationFrame];
                console.log(jumpAnimationFrame)
                await sleep(60);
            }
            jumpStartedFlag=true;
        }else{
            player.src = graphics.player.jump[2];
        }
    }
    if(playerCurrentSpeed < 0&&canMoveLeft){
        playerX += playerCurrentSpeed;
    }else if(playerCurrentSpeed > 0&&canMoveRight){
        playerX += playerCurrentSpeed;
    }
    flipDisplay();
    animationFrame += 1
    console.log(playerX, width)
}

window.addEventListener("keydown", keyDownHandler);
window.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e){
    switch(e.key){
        case "ArrowRight":
            if(canMoveRight){
                playerState = 1;
                playerCurrentSpeed = playerMaxSpeed;
            }
            break;
        case "ArrowLeft":
            if(canMoveLeft){
                playerState = 1;
                playerCurrentSpeed = -playerMaxSpeed;
            }
            break;
        case "ArrowUp":
            playerState = 2;
            break;
    }   
    console.log(e.key)
}

function mainGameLoop(){
    //player can`t escape from window
    if(playerX <= 0){
        canMoveLeft = false
        playerState = 0;
    }else{
        canMoveLeft = true
    }

    if(playerX >= width-58){
        canMoveRight = false
        playerState = 0
    }else{
        canMoveRight = true
    }
}

function keyUpHandler(e){
    switch(e.key){
        case "ArrowRight":
            playerState = 0;
            playerCurrentSpeed = 0;
            break;
        case "ArrowLeft":
            playerState = 0;
            playerCurrentSpeed = 0;
            break;
        case "ArrowUp":
            playerState = 0;
            break;
    }
}

//utils
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.addEventListener("graphics_loaded", () => {
    setInterval(animationHandler, 50)
})

window.addEventListener("graphics_loaded", () => {
    setInterval(mainGameLoop, 60)
})