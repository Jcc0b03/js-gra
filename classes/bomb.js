class Bomb{
    constructor(timing, range, damage, bomb_x, bomb_y){
        this.timing = timing;
        this.range = range;
        this.damage = damage;
        this.X = bomb_x
        this.Y = bomb_y
    }

    bombState = 0;
    bombImage = new Image();
    bombAnimationFrame = 0;
    bomb_speed = 10;

    frameCounter = 0;
    
    exploded = false;

    animate(){
        if(!this.exploded){
            switch(this.bombState){
                case 0:
                    if(this.bombAnimationFrame > graphics.bomb.bombOnAnimationSize-1){
                        this.bombAnimationFrame=0;
                    }
                    this.bombImage.src = graphics.bomb.bomb_on[this.bombAnimationFrame];
                    this.bombAnimationFrame += 1;
                    break;
                case 1:
                    this.bombImage.src = graphics.bomb.explosion[this.bombAnimationFrame];
                    this.bombAnimationFrame += 1;

                    if(this.bombAnimationFrame > graphics.bomb.explosionAnimationSize-1){
                        this.boom();
                    }
                    break;
            }
        }
    }

    async render(){
        if(!this.exploded){
            await mainGameCanvas2dContext.drawImage(this.bombImage, this.X, this.Y);
        }
    }

    explosionFlag = false

    update(){
        this.frameCounter += 1
        //after the timing in ms do a boom
        if(this.frameCounter>=Math.ceil(this.timing/60)&&!this.exploded){
            this.bombState = 1;
            if(!this.explosionFlag){
                this.bombAnimationFrame = 0;
                this.explosionFlag = true;
            }
        }
    }

    boom = function(){
        this.exploded = true;
        this.bombState = -1;
        this.bombImage = null;
    }
}

let bombObjects = [];

function clearBombObjectsArray(){
    for(let bombCounter=0; bombCounter<bombObjects.length; bombCounter++){
        if(bombObjects[bombCounter].exploded==true){
            bombObjects.splice(bombCounter, 1);
        }
    }
}