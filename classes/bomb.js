class Bomb{
    constructor(timing, range, damage){
        this.timing = timing;
        this.range = range;
        this.damage = damage;
    }

    bombState = 0
    bombImage = new Image()
    bombAnimationFrame = 0
    bomb_x = 200;
    bomb_y = 200;
    bomb_speed = 10;

    frameCounter = 0;

    animate(){
        if(this.bombAnimationFrame > graphics.bomb.bombOnAnimationSize-1){
            this.bombAnimationFrame=0
        }
        this.bombImage.src = graphics.bomb.bomb_on[this.bombAnimationFrame];
        this.bombAnimationFrame += 1
    }

    async render(){
        await mainGameCanvas2dContext.drawImage(this.bombImage, this.bomb_x, this.bomb_y);
    }

    update(){
        this.frameCounter += 1
        //after the timing in ms do a boom
        if(this.frameCounter>=Math.ceil(this.timing/60)){
            
        }
    }
}

let bombObject = new Bomb(1000, 100, 25);