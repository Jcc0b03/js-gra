class Beam {
    HEIGHT = 36
    WIDTH = 36
    constructor(x, y, size, gravity=false) {
        this.x_cord = x
        this.y_cord = y
        this.size = size
        this.width = size * 36
        this.height = 36
        this.gravity = gravity
        if (gravity){
            console.error("Not implemented")
        }
        this.image = new Image()

    }

    updatePos(){
        // this.speedY += this.gravity

        let newX = this.x_cord + this.speedX
        let newY = this.y_cord + this.speedY
        
        if (this.checkHor(newX)){this.x_cord = newX}
        if (this.checkVer(newY)){this.y_cord = newY}
    }

    // wierzchowski sra trzy razy dziennie
    async render(){
        this.image.src = graphics.platform.idle[0]
        for (let i=0; i < this.size; i++){
            await mainGameCanvas2dContext.drawImage(this.image, this.x_cord + i * 36, this.y_cord)
        }
        // await mainGameCanvas2dContext.drawImage(this.image, 0, 0)
    }

    scroll(speed){
        this.x_cord -= speed;
    }
}