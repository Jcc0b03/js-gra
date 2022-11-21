// function that checks collisions


class Player{
    constructor(x, y, health, maxSpeed=3, jumpHeight=12){
        this.health = health
        this.maxSpeed = maxSpeed
        this.jumpHeight = jumpHeight

        this.speedX = 1
        this.speedY = -8
        this.acc = 0.1
        this.dec = 0.2
        this.jump_dec = 0.02
        this.gravity = 0.6
        this.prevCollX = false
        this.prevCollY = false
        
        //starting position
        this.x_cord = x
        this.y_cord = y

        //hitbox size
        this.width = 58
        this.height = 58

        this.isJumping = false
        this.collide_bottom = false
    }

    
    // X = 0;
    // Y = height-58;

    //movement variables
    playerCurrentSpeed = 0;
    jumpHeight = 20;

    canMoveRight = true;
    isMovingRight = false;
    canMoveLeft = true;
    isMovingLeft = false;

    isGrounded = true;
    jumpStartedFlag = false;
    jumpHeight = 15;

    //graphics
    playerSprite = new Image();
    playerState = 0 //0 - idle; 1 - walk;
    animationFrame = 0;
    playerAnimationFrame = 0

    async animate(){
        if(!this.isJumping){
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
                    this.playerSprite.src = graphics.player.walkLeft[this.animationFrame];
                    break;
                case 2:
                    if(this.animationFrame > graphics.player.walkAnimationSize-1){
                        this.animationFrame = 0
                    }
                    this.playerSprite.src = graphics.player.walkRight[this.animationFrame]
            }
        }else{
            if(this.speedX >= 0){
                if(!this.jumpStartedFlag){
                    for(let jumpAnimationFrame=0;jumpAnimationFrame<graphics.player.jumpAnimationSize-1;jumpAnimationFrame++){
                        this.playerSprite.src = graphics.player.jumpRight[jumpAnimationFrame];
                        console.log(this.jumpAnimationFrame);
                        await sleep(60);
                    }
                    this.jumpStartedFlag=true;
                }else if(this.jumpStartedFlag){
                    this.playerSprite.src = graphics.player.jumpRight[2];
                }
            }else if(this.speedX < 0){
                if(!this.jumpStartedFlag){
                    for(let jumpAnimationFrame=0;jumpAnimationFrame<graphics.player.jumpAnimationSize-1;jumpAnimationFrame++){
                        this.playerSprite.src = graphics.player.jumpLeft[jumpAnimationFrame];
                        console.log(this.jumpAnimationFrame);
                        await sleep(60);
                    }
                    this.jumpStartedFlag=true;
                }else if(this.jumpStartedFlag){
                    this.playerSprite.src = graphics.player.jumpLeft[2];
                }
            }
        }
        this.animationFrame += 1
    }

    async render(){
        await mainGameCanvas2dContext.drawImage(this.playerSprite, this.x_cord, this.y_cord)
    }

    // update(){
    //     this.X += this.playerCurrentSpeed
    // }

    setSpeed(speed){
        this.playerCurrentSpeed = speed 
    }

    setState(state){
        this.playerState = state 
    }

    dropBomb(timeToBoom=1000){
        let bomb = new Bomb(timeToBoom, 100, 25, this.x_cord, this.y_cord-30);
        bombObjects.push(bomb);
    }

    //////////////////////////////////////

    checkHor(cord) {
        return 0 < cord && cord < this.maxH
    }

    checkVer(cord) {
        return 0 < cord && cord < this.maxV
    }

    moveUp(){
        if (this.speedY > -this.maxSpeed) {
            this.speedY -= this.acc
        }
    }

    moveDown(){
        if (this.speedY < this.maxSpeed) {
            this.speedY += this.acc
        }
    }

    moveLeft(){
        if (this.speedX > -this.maxSpeed) {
            this.speedX -= this.acc
        }
    }

    moveRight(){
        console.log(this.speedX, this.maxSpeed)
        if (this.speedX < this.maxSpeed) {
            this.speedX += this.acc
        }
    }

    jump(){
        console.log(this.isJumping)
        if (!this.isJumping && this.collide_bottom) {
            this.speedY -= this.jumpHeight
            this.isJumping = true
        } 
    }

    decelerateX(){
        if (Math.abs(this.speedX) < this.dec * 2) {
            this.speedX = 0
        }
        if (this.speedX > 0) {
            if (!this.collide_bottom){this.speedX -= this.jump_dec}
            else {this.speedX -= this.dec}
        } else if (this.speedX < 0) {
            if (!this.collide_bottom){this.speedX += this.jump_dec}
            else {this.speedX += this.dec}
        }
    }

    decelerateY(){
        if (Math.abs(this.speedY) < this.dec * 2) {
            this.speedY = 0
        }
        if (this.speedY > 0) {
            this.speedY -= this.dec
        } else if (this.speedY < 0) {
            this.speedY += this.dec
        }
    }
    /*
    handle_explosions(){
        bombObjects.forEach(bomb=>{
            if (bomb.bombState == 1){
                let x_len, y_len, dist
                let fun = distance(bomb, this)
                if (fun){
                    [x_len, y_len, dist] = fun
                    console.log(x_len, y_len, dist)
                    if (dist < bomb.range) {
                        //if player is on the right side of the bomb
                        if(this.x_cord > bomb.X){
                            this.speedX += (bomb.range - x_len) / (bomb.range * 3)
                            //this.speedY += (bomb.range - y_len) / (bomb.range * 3)
                            this.jump()
                        //if player is on the left side of the bomb
                        }else if(this.x_cord < bomb.X){
                            this.speedX += (x_len - bomb.range) / (bomb.range * 3)
                            console.error((x_len - bomb.range) / (bomb.range * 3))
                            this.speedY -= 0.;
                            //this.speedY += (bomb.range + y_len) / (bomb.range * 3)
                        }else if(this.x_cord == bomb.X){
                            this.jump()
                        }
                    }
                }
            }
        })
    }*/

    update(obstacles){
        this.speedY += this.gravity

        let newX = this.x_cord + this.speedX
        let newY = this.y_cord + this.speedY
        let cx, cy

        let collision = false
        let coll_obstacles = []
        obstacles.forEach(obstacle => {
            let coll = collide({
                "x_cord": newX, "y_cord": newY,
                "width": this.width, "height": this.height
            }, obstacle)
            cx = coll[0]
            cy = coll[1]
            if (cx && cy){
                coll_obstacles.push(obstacle)
                collision = true
            }
        })

        if (this.checkHor(newX) && !collision){
            this.x_cord = newX
        } 
        else if (this.prevCollX && cx && !this.prevCollY && cy){
            this.x_cord = this.x_cord - this.speedX
            // this.speedX = 0
        }

        if (this.checkVer(newY) && !collision){
            this.y_cord = newY
        } 
        else if (this.prevCollY && cy && !this.prevCollX && cx){
            this.y_cord = this.y_cord - this.speedY
            // this.speedY = 0
        }

        let coll_top = false
        let coll_bottom = false
        let coll_left = false
        let coll_right = false
        coll_obstacles.forEach(obstacle => {
            if (this.y_cord > obstacle.y_cord + obstacle.height){
                coll_top = true
            }
            if (this.y_cord + this.height < obstacle.y_cord){
                coll_bottom = true
                this.collide_bottom = true
            } else {this.collide_bottom = false}
            if (this.x_cord > obstacle.x_cord + obstacle.width){
                coll_left = true
            }
            if (this.x_cord + this.width < obstacle.x_cord){
                coll_right = true
            }
        })

        if (!coll_top && !coll_bottom) {
            this.y_cord = newY
        } else {
            this.speedY = 0
        }
        if (!coll_left && !coll_right) {
            this.x_cord = newX
        } else {
            this.speedX = 0
        }

        if(this.isJumping && coll_bottom){
            this.isJumping = false
        }
        
        this.prevCollX = cx
        this.prevCollY = cy

        // this.handle_explosions()
    }
    
    addSpeedX(value){
        this.speedX += value;
    }

    addSpeedY(value){
        this.speedY -= value;
    }

    stop(){
        this.speedX = 0;
    }
}

let playerObject = new Player(100, 10, 20);x=10
