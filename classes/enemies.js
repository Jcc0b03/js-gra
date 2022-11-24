class Enemy{
    constructor(type, x, y, timing){
        this.type = type //type 0 - cucumber; type 1 - capitan; type 2 - bigGuy
        this.ai = new AIControl(this, timing)

        //spawn position
        this.X = x
        this.Y = y

        //starting position
        this.x_cord = x
        this.y_cord = y

        //hitboxesY size for diffrent type of enemies
        this.hitboxesY = [69, 72, 75]

        this.width = 58
        this.height = this.hitboxesY[this.type]

        this.hitbox = {
            "x_cord": this.x_cord, 
            "y_cord": this.y_cordt,
            "width": this.width, 
            "height": this.height
        }

        this.health = 100
        this.walk_speed = 1
        this.run_speed = 2
        this.maxSpeed = this.walk_speed
        this.jumpHeight = 10

        this.speedX = 0
        this.speedY = -8
        this.acc = 0.1
        this.dec = 0.2
        this.jump_dec = 0.02
        this.gravity = 0.6
        this.prevCollX = false
        this.prevCollY = false
    }

    distanceFromPlayer = 0
    
    //graphics 
    enemyState = 0 //animation state 0 - idle; 1 - walk; 2 - attack
    direction = 1  // where enemy is facing; 1 - right; -1 - left
    enemySprite = new Image()

    animationFrame = 0
    animate(){
        let enemyArray
        let walk
        let attack
        switch(this.type){
            //enemyCucumber
            case 0:
                enemyArray = graphics.enemyCucumber
                break;
            //enemyCaptain
            case 1:
                enemyArray = graphics.enemyCapitan
                break;
            //enemyBigGuy
            case 2:
                enemyArray = graphics.enemyBigGuy
                break;
        }

        switch(this.direction) {
            case 1:
                walk = enemyArray.walkRight
                attack = enemyArray.attackRight
                break
            case -1:
                walk = enemyArray.walkLeft
                attack = enemyArray.attackLeft
                break
        }
        console.log(this.enemyState)
        switch(this.enemyState){
            case 0:
                if(this.animationFrame > enemyArray.idleAnimationSize - 1){
                    this.animationFrame = 0;
                }
                this.enemySprite.src = enemyArray.idle[this.animationFrame]
                this.animationFrame+=1
                break;
            case 1:
                if(this.animationFrame > enemyArray.walkAnimationSize-1){
                    this.animationFrame = 0;
                }
                this.enemySprite.src = walk[this.animationFrame];
                this.animationFrame += 1;
                break;
            case 2:
                if(this.animationFrame > enemyArray.attackAnimationSize-1){
                    this.animationFrame = 0;
                }
                this.enemySprite.src = attack[this.animationFrame];
                this.animationFrame += 1;
                break;
        }
    }

    async render(){
        await mainGameCanvas2dContext.drawImage(this.enemySprite, this.X, this.Y)
    }

    update(){
       this.distanceFromPlayer = this.calculateDistanceFromPlayer();
       clearEnemies();
    }

    calculateDistanceFromPlayer(){
        return Math.round(Math.sqrt(Math.pow(this.X-playerObject.X, 2)+Math.pow(this.Y - playerObject.Y, 2)));
    }

    //////////////////////////////////////

    checkHor(cord) {
        return true
    }

    checkVer(cord) {
        return true
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
        this.direction = -1
        this.enemyState = 1
        if (this.speedX > -this.maxSpeed) {
            this.speedX -= this.acc
        }
    }

    moveRight(){
        this.direction = 1
        this.enemyState = 1
        if (this.speedX < this.maxSpeed) {
            this.speedX += this.acc
        }
    }

    shortJump(){
        if (!this.isJumping && this.collide_bottom) {
            this.speedY -= this.jumpHeight / 2
            this.isJumping = true
        } 
    }

    jump(){
        if (!this.isJumping && this.collide_bottom) {
            this.speedY -= this.jumpHeight
            this.isJumping = true
        } 
    }

    powerJump(){
        if (!this.isJumping && this.collide_bottom) {
            this.speedY -= this.jumpHeight * 1.2
            this.isJumping = true
        } 
    }

    decelerateX(){
        this.enemyState = 0
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

    updatePos(obstacles){
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

        this.ai.tick(obstacles, playerObject)

        this.X = this.x_cord
        this.Y = this.y_cord
        
        this.prevCollX = cx
        this.prevCollY = cy

        // this.handle_explosions()
    }

    getDamage(damage){
        this.health -= damage;
        console.log(this.health);
    }

    scroll(speed){
        this.x_cord -= speed;
    }
}

function clearEnemies(){
    enemiesObjects.forEach((enemy, id)=>{
        if(enemy.health <= 0){
            enemiesObjects.splice(id, 1);
        }
    })
}
