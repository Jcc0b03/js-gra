class enemy{
    constructor(type, x, y){
        this.type = type //type 0 - cucumber; type 1 - capitan; type 2 - bigGuy
        //spawn position
        this.X = x
        this.Y = y
    }

    distanceFromPlayer = 0
    
    //graphics 
    enemyState = 2 //animation state 0 - idle; 1 - walk; 3 - attack
    enemySprite = new Image()

    animationFrame = 0
    animate(){
        switch(this.type){
            //enemyCucumber
            case 0:
                switch(this.enemyState){
                    case 0:
                        if(this.animationFrame > graphics.enemyCucumber.idleAnimationSize - 1){
                            this.animationFrame = 0;
                        }
                        this.enemySprite.src = graphics.enemyCucumber.idle[this.animationFrame]
                        this.animationFrame+=1
                        break;
                    case 1:
                        if(this.animationFrame > graphics.enemyCucumber.walkAnimationSize-1){
                            this.animationFrame = 0;
                        }
                        this.enemySprite.src = graphics.enemyCucumber.walkLeft[this.animationFrame];
                        this.animationFrame += 1;
                        break;
                    case 2:
                        if(this.animationFrame > graphics.enemyCucumber.attackAnimationSize-1){
                            this.animationFrame = 0;
                        }
                        this.enemySprite.src = graphics.enemyCucumber.attackLeft[this.animationFrame];
                        this.animationFrame += 1;
                        break;
                }
                break;
            //enemyCaptain
            case 1:
                switch(this.enemyState){
                    case 0:
                        if(this.animationFrame > graphics.enemyCapitan.idleAnimationSize-1){
                            this.animationFrame = 0;
                        }
                        this.enemySprite.src = graphics.enemyCapitan.idle[this.animationFrame];
                        this.animationFrame += 1
                        break;
                    case 1:
                        if(this.animationFrame > graphics.enemyCapitan.walkAnimationSize-1){
                            this.animationFrame = 0;
                        }
                        this.enemySprite.src = graphics.enemyCapitan.walkRight[this.animationFrame];
                        this.animationFrame += 1;
                        break;
                    case 2:
                        if(this.animationFrame > graphics.enemyCapitan.attackAnimationSize-1){
                            this.animationFrame = 0;
                        }
                        this.enemySprite.src = graphics.enemyCapitan.attackRight[this.animationFrame];
                        this.animationFrame += 1;
                        break;
                }
                break;
            //enemyBigGuy
            case 2:
                switch(this.enemyState){
                    case 0:
                        if(this.animationFrame > graphics.enemyBigGuy.idleAnimationSize-1){
                            this.animationFrame = 0;
                        }
                        this.enemySprite.src = graphics.enemyBigGuy.idle[this.animationFrame];
                        this.animationFrame += 1;
                        break;
                    case 1:
                        if(this.animationFrame > graphics.enemyBigGuy.walkAnimationSize-1){
                            this.animationFrame = 0;
                        }
                        this.enemySprite.src = graphics.enemyBigGuy.walkRight[this.animationFrame];
                        this.animationFrame += 1;
                        break;
                    case 2:
                        if(this.animationFrame > graphics.enemyBigGuy.attackAnimationSize-1){
                            this.animationFrame = 0;
                        }
                        this.enemySprite.src = graphics.enemyBigGuy.attackRight[this.animationFrame];
                        this.animationFrame += 1;
                        break;
                }
                break;
        }
    }

    async render(){
        await mainGameCanvas2dContext.drawImage(this.enemySprite, this.X, this.Y)
    }

    update(){
       this.distanceFromPlayer = this.calculateDistanceFromPlayer();
       //debuging
    //    console.log(this.distanceFromPlayer);
    }

    calculateDistanceFromPlayer(){
        return Math.round(Math.sqrt(Math.pow(this.X-playerObject.X, 2)+Math.pow(this.Y - playerObject.Y, 2)));
    }
}

let enemiesObjects = [];

let enemyCucumber = new enemy(0, 120, 120);
let enemyCapitan = new enemy(1, 200, 120);
let enemyBigGuy = new enemy(2, 280, 120);

enemiesObjects.push(enemyCucumber, enemyCapitan, enemyBigGuy);
console.log(enemiesObjects);