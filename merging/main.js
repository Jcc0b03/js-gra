function collide(firstObject, secondObject){
    let fBottomRight = [firstObject.x_cord + firstObject.width, firstObject.y_cord + firstObject.height]
    let sBottomRight = [secondObject.x_cord + secondObject.width, secondObject.y_cord + secondObject.height]
    
    let fx = firstObject.x_cord > secondObject.x_cord && firstObject.x_cord < sBottomRight[0]
    let fy = firstObject.y_cord > secondObject.y_cord && firstObject.y_cord < sBottomRight[1]
    let sx = secondObject.x_cord > firstObject.x_cord && secondObject.x_cord < fBottomRight[0]
    let sy = secondObject.y_cord > firstObject.y_cord && secondObject.y_cord < fBottomRight[1]
    return [(fx || sx) , (fy || sy)]
}

class Beam {
    constructor(x, y, width, height, cssName, gravity=false) {
        this.x_cord = x
        this.y_cord = y
        this.width = width
        this.height = height
        this.gravity = gravity
        if (gravity){
            console.error("Not implemented")
        }

        this.css = document.querySelector(`#${cssName}`)
        
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

        this.css.style.marginTop = this.y_cord + "px"
        this.css.style.marginLeft = this.x_cord + "px"
    }
}

class Player {
    constructor(x, y, cssName){
        this.speed = 4
        this.speedX = 1
        this.speedY = -8
        this.acc = 0.1
        this.dec = 0.2
        this.jump_dec = 0.02
        this.gravity = 0.7
        this.prevCollX = false
        this.prevCollY = false

        this.x_cord = x
        this.y_cord = y
        this.width = 75
        this.height = 75
        this.square = document.querySelector("#" + cssName)
        this.maxH = innerWidth
        this.maxV = innerHeight
        this.isJumping = false
        this.collide_bottom = false

        this.square.style.width = this.width + "px"
        this.square.style.height = this.height + "px"
    }

    checkHor(cord) {
        return 0 < cord && cord < this.maxH
    }

    checkVer(cord) {
        return 0 < cord && cord < this.maxV
    }

    moveUp(){
        if (this.speedY > -this.speed) {
            this.speedY -= this.acc
        }
    }

    moveDown(){
        if (this.speedY < this.speed) {
            this.speedY += this.acc
        }
    }

    moveLeft(){
        if (this.speedX > -this.speed) {
            this.speedX -= this.acc
        }
    }

    moveRight(){
        if (this.speedX < this.speed) {
            this.speedX += this.acc
        }
    }

    jump(){
        console.log(this.isJumping)
        if (!this.isJumping && this.collide_bottom) {
            this.speedY -= 15
            this.isJumping = true
        } 
    }

    decelerateX(){
        if (Math.abs(this.speedX) < this.dec * 2) {
            this.speedX = 0
        }
        if (this.speedX > 0) {
            if (this.isJumping){this.speedX -= this.jump_dec}
            else {this.speedX -= this.dec}
        } else if (this.speedX < 0) {
            if (this.isJumping){this.speedX += this.jump_dec}
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

    // handle_collisions(){
    //     let collision = false
    //     obstacles.forEach(obstacle => {
    //         let coll = collide({
    //             "x_cord": newX, "y_cord": newY,
    //             "width": this.width, "height": this.height
    //         }, obstacle)
    //         cx = coll[0]
    //         cy = coll[1]
    //         if (cx && cy){
    //             // console.log("koliduje")
    //             collision = true
    //         }
    //     })

    //     return collision
    // }

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
        console.log(coll_top, coll_bottom, coll_left, coll_right)

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
        


        this.square.style.marginTop = this.y_cord + "px"
        this.square.style.marginLeft = this.x_cord + "px"
        this.prevCollX = cx
        this.prevCollY = cy
    }
}

class Controll {
    constructor(player) {
        this.player = player
        this.body = document.querySelector("body")

        // this.keyUp = "ArrowUp"
        // this.keyDown = "ArrowDown"
        // this.keyLeft = "ArrowLeft"
        // this.keyRight = "ArrowRight"

        this.keyUp = "w"
        this.keyDown = "s"
        this.keyLeft = "a"
        this.keyRight = "d"
        this.jump = " "

        this.isKeyUp = false
        this.isKeyDown = false
        this.isKeyLeft = false
        this.isKeyRight = false
        this.isSpace = false

        this.addEL()
    }

    addEL(){
        this.body.addEventListener("keydown", (e) => {
            // if (e.key == this.keyUp){
            //     this.isKeyUp = true
            // }
            // if (e.key == this.keyDown){
            //     this.isKeyDown = true
            // }
            if (e.key == this.keyLeft){
                this.isKeyLeft = true
            }
            if (e.key == this.keyRight){
                this.isKeyRight = true
            }
            if (e.key == this.jump){
                this.isSpace = true
            }
        })
        this.body.addEventListener("keyup", (e) => {
            // if (e.key == this.keyUp){
            //     this.isKeyUp = false
            // }
            // if (e.key == this.keyDown){
            //     this.isKeyDown = false
            // }
            if (e.key == this.keyLeft){
                this.isKeyLeft = false
            }
            if (e.key == this.keyRight){
                this.isKeyRight = false
            }
            if (e.key == this.jump){
                this.isSpace = false
            }
        })
    }

    tick(){
        if (this.isKeyUp){
            this.player.moveUp()
        }
        if (this.isKeyDown){
            this.player.moveDown()
        }
        if (this.isKeyLeft){
            this.player.moveLeft()
        }
        if (this.isKeyRight){
            this.player.moveRight()
        }
        if (this.isSpace) {
            this.player.jump()
        }
    
        if (!(this.isKeyRight || this.isKeyLeft)){
            this.player.decelerateX()
        }
    
        if (!(this.isKeyUp || this.isKeyDown)){
            this.player.decelerateY()
        }
    }
}

let player = new Player(0, 280, "square")
let obstacles = [
    new Beam(0, 410, 300, 30, "obs"),
    new Beam(400, 410, 500, 30, "obs2"),
]

let controll = new Controll(player)
setInterval(()=>{
    controll.tick()
    player.updatePos(obstacles)
    collide(player, obstacles[0])
}, Math.round(1000/60))
