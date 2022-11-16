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
    },

    enemyCucumber: {
        idleAnimationSize: 36,
        idle: [],
        walkAnimationSize: 12,
        walkRight: [],
        walkLeft: [],
        attackAnimationSize: 11,
        attackLeft: []
    },

    enemyCapitan: {
        idleAnimationSize: 32,
        idle: [],
        walkAnimationSize: 14,
        walkRight: [],
        walkLeft: [],
        attackAnimationSize: 7,
        attackRight: []
    },
    
    enemyBigGuy: {
        idleAnimationSize: 38,
        idle: [],
        walkAnimationSize: 16,
        walkRight: [],
        walkLeft: [],
        attackAnimationSize: 11,
        attackRight: []
    },

    platform: {
        idleAnimationSize: 1,
        idle: []
    }

}

const loadGraphics = function(){
    console.log("loading graphics...")
    //loading player graphics
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

    //loading bomb graphics
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
            });
            imageToBase64Converter.readAsDataURL(imageBlob);
        })
    }

    //enemy cucumber
    for(let i = 1; i<=graphics.enemyCucumber.idleAnimationSize; i+=1){
        fetch(`resources/Sprites/enemyCucumber/idle/${i}.png`).then(image => image.blob()).then(imageBlob => {
            let imageToBase64Converter = new FileReader();
            imageToBase64Converter.addEventListener("load", () => {
                graphics.enemyCucumber.idle.push(imageToBase64Converter.result);
            });
            imageToBase64Converter.readAsDataURL(imageBlob);
        })
    }

    for(let i = 1; i<=graphics.enemyCucumber.walkAnimationSize; i+=1){
        fetch(`resources/Sprites/enemyCucumber/walkLeft/${i}.png`).then(image => image.blob()).then(imageBlob => {
            let imageToBase64Converter = new FileReader();
            imageToBase64Converter.addEventListener("load", () => {
                graphics.enemyCucumber.walkLeft.push(imageToBase64Converter.result);
            });
            imageToBase64Converter.readAsDataURL(imageBlob);
        })
    }

    for(let i = 1; i<=graphics.enemyCucumber.attackAnimationSize; i+=1){
        fetch(`resources/Sprites/enemyCucumber/attack/${i}.png`).then(image => image.blob()).then(imageBlob => {
            let imageToBase64Converter = new FileReader();
            imageToBase64Converter.addEventListener("load", () => {
                graphics.enemyCucumber.attackLeft.push(imageToBase64Converter.result);
            });
            imageToBase64Converter.readAsDataURL(imageBlob);
        })
    }

    //enemy capitan
    for(let i = 1; i<=graphics.enemyCapitan.idleAnimationSize; i+=1){
        fetch(`resources/Sprites/enemyCapitan/idle/${i}.png`).then(image => image.blob()).then(imageBlob => {
            let imageToBase64Converter = new FileReader();
            imageToBase64Converter.addEventListener("load", () => {
                graphics.enemyCapitan.idle.push(imageToBase64Converter.result);
            });
            imageToBase64Converter.readAsDataURL(imageBlob);
        })
    }

    for(let i = 1; i<=graphics.enemyCapitan.walkAnimationSize; i+=1){
        fetch(`resources/Sprites/enemyCapitan/walkRight/${i}.png`).then(image => image.blob()).then(imageBlob => {
            let imageToBase64Converter = new FileReader();
            imageToBase64Converter.addEventListener("load", () => {
                graphics.enemyCapitan.walkRight.push(imageToBase64Converter.result);
            });
            imageToBase64Converter.readAsDataURL(imageBlob);
        })
    }

    for(let i = 1; i<=graphics.enemyCapitan.attackAnimationSize; i+=1){
        fetch(`resources/Sprites/enemyCapitan/attack/${i}.png`).then(image => image.blob()).then(imageBlob => {
            let imageToBase64Converter = new FileReader();
            imageToBase64Converter.addEventListener("load", () => {
                graphics.enemyCapitan.attackRight.push(imageToBase64Converter.result);
            });
            imageToBase64Converter.readAsDataURL(imageBlob);
        })
    }

    //enemy bigGuy
    for(let i = 1; i<=graphics.enemyBigGuy.idleAnimationSize; i+=1){
        fetch(`resources/Sprites/enemyBigGuy/idle/${i}.png`).then(image => image.blob()).then(imageBlob => {
            let imageToBase64Converter = new FileReader();
            imageToBase64Converter.addEventListener("load", () => {
                graphics.enemyBigGuy.idle.push(imageToBase64Converter.result);
            });
            imageToBase64Converter.readAsDataURL(imageBlob);
        })
    }

    for(let i = 1; i<=graphics.enemyBigGuy.walkAnimationSize; i+=1){
        fetch(`resources/Sprites/enemyBigGuy/walkRight/${i}.png`).then(image => image.blob()).then(imageBlob => {
            let imageToBase64Converter = new FileReader();
            imageToBase64Converter.addEventListener("load", () => {
                graphics.enemyBigGuy.walkRight.push(imageToBase64Converter.result);
            });
            imageToBase64Converter.readAsDataURL(imageBlob);
        })
    }

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