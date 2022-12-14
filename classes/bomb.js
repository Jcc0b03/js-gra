class Bomb{
    constructor(timing, range, damage, bomb_x, bomb_y){
        this.timing = timing;
        this.range = range;
        this.damage = damage;
        this.X = bomb_x
        this.Y = bomb_y
        this.x_cord = bomb_x
        this.y_cord = bomb_y
    }

    bombState = 0 // 0 - bomb before explosion; 1 - explosion; -1 - special state when the bomb is exploded
    bombImage = new Image();
    bombAnimationFrame = 0;
    bomb_speed = 10;

    frameCounter = 0;
    
    exploded = false;
    blow_power_x = 10
    blow_power_y = 16

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
                        this.setExploded();
                    }

                    this.boom();
                    break;
            }
        }
    }

    async render(){
        if(!this.exploded){
            await mainGameCanvas2dContext.drawImage(this.bombImage, this.x_cord, this.y_cord);
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

    setExploded(){
        this.exploded = true;
        this.bombState = -1;
        this.bombImage = null;
    }
    
    boomFlag = false;
    boom(){
        if(!this.boomFlag){
            this.recoilPlayer();
            this.giveDamage();
            this.boomFlag = true;
        }
    }

    //todo - give enemies in bomb range damage
    giveDamage(){
        enemiesObjects.forEach((enemy, id) => {
            if(distance(this, enemy)[2] <= this.range){
                enemy.getDamage(this.damage);
            }
        })
    }

    recoilPlayer(){
        let [bomb_x, bomb_y, bomb_dist] = [...distance(this, playerObject)]
        let x_percent
        let y_percent
        bomb_y += 31
        
        if(distance(this, playerObject)[2] <= this.range){
            if (bomb_x < 0) {
                x_percent = Math.abs(-this.range - bomb_x)/this.range
            } else if (bomb_x == 0) {
                x_percent = 0
            } else {
                x_percent = -((this.range - bomb_x)/this.range)
            }

            if (bomb_y <= 0) {
                y_percent = Math.abs(-this.range - bomb_y)/this.range
            } else {
                y_percent = -((this.range - bomb_y)/this.range)
            }

            console.log(this.blow_power * x_percent, this.blow_power * y_percent)
            playerObject.addSpeedX(this.blow_power_x * x_percent)
            playerObject.addSpeedY(this.blow_power_y * -y_percent)
            // if(playerObject.x_cord > this.x_cord+10){
            //     playerObject.addSpeedX(7);
            //     playerObject.addSpeedY(15);
            // }else if(playerObject.x_cord < this.x_cord-10){
            //     playerObject.addSpeedX(-7);
            //     playerObject.addSpeedY(15);
            // } else {
            //     playerObject.addSpeedY(14)
            // }

        }
    }

    scroll(speed){
        this.x_cord -= speed;
    }
}

//array that contains all active bombs
let bombObjects = [];

//bombs array is cleaned when the bomb explodes
function clearBombObjectsArray(){
    for(let bombCounter=0; bombCounter<bombObjects.length; bombCounter++){
        if(bombObjects[bombCounter].exploded==true){
            bombObjects.splice(bombCounter, 1);
        }
    }
}