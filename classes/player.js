class Player{
    constructor(health, maxSpeed, jumpHeight){
        this.health = health
        this.maxSpeed = maxSpeed
        this.jumpHeight = jumpHeight
    }

    playerAnimationFrame = 0
    playerX = 0;
    playerY = height-58;

    playerCurrentSpeed = 0;
    jumpHeight = 20;

    canMoveRight = true;
    isMovingRight = false;
    canMoveLeft = true;
    isMovingLeft = false;

    isGrounded = true;
    jumpStartedFlag = false;

    playerSprite = new Image();
    playerState = 0;
    animationFrame = 0;

    async animate(){
        if(this.isGrounded){
            switch(this.playerState){
                case 0:
                    if(this.animationFrame > graphics.player.idleAnimationSize-1){
                        this.animationFrame = 0
                    }
                    this.playerSprite.src = graphics.player.idle[this.animationFrame];
                    break
                case 1:
                    if(this.animationFrame > graphics.player.walkAnimationSize-1){
                        this.animationFrame = 0
                    }
                    if(this.playerCurrentSpeed>0){
                        this.playerSprite.src = graphics.player.walkRight[this.animationFrame];
                    }else{
                        this.playerSprite.src = graphics.player.walkLeft[this.animationFrame];
                    }
                    break;
            }
        }else{
            if(!this.jumpStartedFlag){
                for(let jumpAnimationFrame=0;jumpAnimationFrame<graphics.player.jumpAnimationSize-1;jumpAnimationFrame++){
                    this.playerSprite.src = graphics.player.jump[jumpAnimationFrame];
                    console.log(this.jumpAnimationFrame)
                    await sleep(60);
                }
                this.jumpStartedFlag=true;
            }else{
                this.playerSprite.src = graphics.player.jump[2];
            }
        }
        this.animationFrame += 1
        console.log(this.playerSprite.src);
    }

    async render(){
        await mainGameCanvas2dContext.drawImage(this.playerSprite, this.playerX, this.playerY)
    }

    update(){
        this.playerX += this.playerCurrentSpeed
    }

    setSpeed(speed){
        this.playerCurrentSpeed = speed 
    }

    setState(state){
        this.playerState = state 
    }
}

let playerObject = new Player(100, 10, 20);