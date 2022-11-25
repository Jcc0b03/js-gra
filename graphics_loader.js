//loading resources
const graphics = {
    player: {
        idleAnimationSize: 26, 
        idle: [],
        walkAnimationSize: 14,
        walkRight: [],
        walkLeft: [],
        jumpAnimationSize: 4,
        jumpRight: [],
        jumpLeft: [],
        deadHitAnimationSize: 6,
        deadHit: [],
        deadGroundAnimationSize: 4,
        deadGround: [],
    },

    bomb: {
        bomb_off: "",
        bombOnAnimationSize: 10,
        bomb_on: [],
        explosionAnimationSize: 9,
        explosion: [] 
    },

    enemyCucumber: {
        idleAnimationSize: 36,
        idle: [],
        walkAnimationSize: 12,
        walkRight: [],
        walkLeft: [],
        attackAnimationSize: 11,
        attackRight: [],
        attackLeft: []
    },

    enemyCapitan: {
        idleAnimationSize: 32,
        idle: [],
        walkAnimationSize: 14,
        walkRight: [],
        walkLeft: [],
        attackAnimationSize: 7,
        attackRight: [],
        attackLeft: []
    },
    
    enemyBigGuy: {
        idleAnimationSize: 38,
        idle: [],
        walkAnimationSize: 16,
        walkRight: [],
        walkLeft: [],
        attackAnimationSize: 11,
        attackRight: [],
        attackLeft: []
    },

    platform: {
        idleAnimationSize: 1,
        idle: []
    }

}

function loadGraphic(animationSize, graphicsArray, path){
    for(let i = 1; i<=animationSize; i+=1){
        fetch(`resources/Sprites/${path}/${i}.png`).then(image => image.blob()).then(imageBlob => {
            let imageToBase64Converter = new FileReader();
            imageToBase64Converter.addEventListener("load", () => {
                graphicsArray.push(imageToBase64Converter.result);
            });
            imageToBase64Converter.readAsDataURL(imageBlob);
        })
    }
}

const loadGraphics = function(){
    console.log("loading graphics...")

    //loading player graphics
    loadGraphic(graphics.player.idleAnimationSize, graphics.player.idle, "player/idle")
    loadGraphic(graphics.player.walkAnimationSize, graphics.player.walkRight, "player/walkRight")
    loadGraphic(graphics.player.walkAnimationSize, graphics.player.walkLeft, "player/walkLeft")
    loadGraphic(graphics.player.jumpAnimationSize, graphics.player.jumpRight, "player/jumpRight")
    loadGraphic(graphics.player.jumpAnimationSize, graphics.player.jumpLeft, "player/jumpLeft")
    loadGraphic(graphics.player.jumpAnimationSize, graphics.player.deadHit, "player/DeadHit")
    loadGraphic(graphics.player.jumpAnimationSize, graphics.player.deadGround, "player/DeadGround")

    //loading bomb graphics
    loadGraphic(graphics.bomb.bombOnAnimationSize, graphics.bomb.bomb_on, "bomb/on")
    loadGraphic(graphics.bomb.explosionAnimationSize, graphics.bomb.explosion, "bomb/explosion")
    
    //enemy cucumber
    loadGraphic(graphics.enemyCucumber.idleAnimationSize, graphics.enemyCucumber.idle, "enemyCucumber/idle")
    loadGraphic(graphics.enemyCucumber.walkAnimationSize, graphics.enemyCucumber.walkRight, "enemyCucumber/walkRight")
    loadGraphic(graphics.enemyCucumber.walkAnimationSize, graphics.enemyCucumber.walkLeft, "enemyCucumber/walkLeft")
    loadGraphic(graphics.enemyCucumber.attackAnimationSize, graphics.enemyCucumber.attackRight, "enemyCucumber/attack")
    loadGraphic(graphics.enemyCucumber.attackAnimationSize, graphics.enemyCucumber.attackLeft, "enemyCucumber/attack")

    //enemy capitan
    loadGraphic(graphics.enemyCapitan.idleAnimationSize, graphics.enemyCapitan.idle, "enemyCapitan/idle")
    loadGraphic(graphics.enemyCapitan.walkAnimationSize, graphics.enemyCapitan.walkRight, "enemyCapitan/walkRight")
    loadGraphic(graphics.enemyCapitan.walkAnimationSize, graphics.enemyCapitan.walkLeft, "enemyCapitan/walkLeft")
    loadGraphic(graphics.enemyCapitan.attackAnimationSize, graphics.enemyCapitan.attackRight, "enemyCapitan/attack")
    loadGraphic(graphics.enemyCapitan.attackAnimationSize, graphics.enemyCapitan.attackLeft, "enemyCapitan/attack")

    //enemy bigGuy
    loadGraphic(graphics.enemyBigGuy.idleAnimationSize, graphics.enemyBigGuy.idle, "enemyBigGuy/idle")
    loadGraphic(graphics.enemyBigGuy.walkAnimationSize, graphics.enemyBigGuy.walkRight, "enemyBigGuy/walkRight")
    loadGraphic(graphics.enemyBigGuy.walkAnimationSize, graphics.enemyBigGuy.walkLeft, "enemyBigGuy/walkLeft")
    loadGraphic(graphics.enemyBigGuy.walkAnimationSize, graphics.enemyBigGuy.attackLeft, "enemyBigGuy/attack")
    for(let i = 1; i<=graphics.enemyBigGuy.attackAnimationSize; i+=1){
        fetch(`resources/Sprites/enemyBigGuy/attack/${i}.png`).then(image => image.blob()).then(imageBlob => {
            let imageToBase64Converter = new FileReader();
            imageToBase64Converter.addEventListener("load", () => {
                graphics.enemyBigGuy.attackRight.push(imageToBase64Converter.result);
                if(graphics.enemyBigGuy.attackRight.length==graphics.bomb.explosionAnimationSize){
                    //on the last element loaded there must be an event dispatched for renderer to know that graphics is loaded
                    window.dispatchEvent(new Event("graphics_loaded"));
                }
            });
            imageToBase64Converter.readAsDataURL(imageBlob);
        })
    }

    // platform
    for(let i = 1; i<=graphics.platform.idleAnimationSize; i+=1){
        fetch(`resources/Background/platform${i}.png`).then(image => image.blob()).then(imageBlob => {
            let imageToBase64Converter = new FileReader();
            imageToBase64Converter.addEventListener("load", () => {
                graphics.platform.idle.push(imageToBase64Converter.result);
            });
            imageToBase64Converter.readAsDataURL(imageBlob);
        })
    }

    console.log(graphics)
}

window.addEventListener("load", loadGraphics);