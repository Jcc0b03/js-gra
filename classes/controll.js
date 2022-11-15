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
        console.log("added el")
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