class Beam {
    constructor(x, y, width, height, gravity=false) {
        this.x_cord = x
        this.y_cord = y
        this.width = width
        this.height = height
        this.gravity = gravity
        if (gravity){
            console.error("Not implemented")
        }

        
        this.css.style.marginLeft = this.x_cord + "px"
        this.css.style.marginTop = this.y_cord + "px"
        this.css.style.width = this.width + "px"
        this.css.style.height = this.height + "px"
    }
    updatePos(){
        // this.speedY += this.gravity

        let newX = this.x_cord + this.speedX
        let newY = this.y_cord + this.speedY
        
        if (this.checkHor(newX)){this.x_cord = newX}
        if (this.checkVer(newY)){this.y_cord = newY}

        // this.css.style.marginTop = this.y_cord + "px"
        // this.css.style.marginLeft = this.x_cord + "px"
    }

    // wierzchowski sra trzy razy dziennie
    rednder(){
        //TO DO
    }
}