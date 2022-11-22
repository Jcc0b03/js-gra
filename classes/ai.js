class AIControl{
    TIMING = 0

    STAND = 0
    WALK_LEFT = 1
    WALK_RIGHT = 2

    RUN_LEFT = 8
    RUN_RIGHT = 9

    JUMP_UP = 10
    JUMP_LEFT = 11
    JUMP_RIGHT = 12
    constructor(object, timing=1){
        this.timing = timing
        this.mstime = 0
        this.object = object
        this.state = this.STAND

        this.leftDownHitbox = {
            "x_cord": this.object.x_cord + this.object.width, 
            "y_cord": this.object.y_cord - this.object.height,
            "width": this.object.width, 
            "height": 500
        }

        this.rightDownHitbox = {
            "x_cord": this.object.x_cord + this.object.width, 
            "y_cord": this.object.y_cord - this.object.height,
            "width": this.object.width, 
            "height": 500
        }
    }

    update_hitboxes(){
        this.leftDownHitbox = {
            "x_cord": this.object.x_cord - this.object.width, 
            "y_cord": this.object.y_cord + this.object.height,
            "width": this.object.width, 
            "height": 500
        }

        
        this.rightDownHitbox = {
            "x_cord": this.object.x_cord + this.object.width, 
            "y_cord": this.object.y_cord + this.object.height,
            "width": this.object.width, 
            "height": 500
        }
        
        // draw_rect(
        //     this.leftDownHitbox.x_cord, 
        //     this.leftDownHitbox.y_cord,
        //     this.leftDownHitbox.width,
        //     this.leftDownHitbox.height,
        // )
        // draw_rect(
        //     this.rightDownHitbox.x_cord, 
        //     this.rightDownHitbox.y_cord,
        //     this.rightDownHitbox.width,
        //     this.rightDownHitbox.height,
        // )
    }

    check_left(obstacles){
        let c = false
        obstacles.forEach(obstacle => {
            if (objCollide(obstacle, this.leftDownHitbox)){
                c = true
            }
        })
        return c
    }

    check_right(obstacles){
        let c = false
        obstacles.forEach(obstacle => {
            if (objCollide(obstacle, this.rightDownHitbox)){
                c = true
            }
        })
        return c
    }

    randomize_state(){
        if ([this.WALK_LEFT, this.WALK_RIGHT].includes(this.state)){
            if (randbool(20)) {
                this.state = this.STAND
            }
        } else if (this.state == this.STAND) {
            if (randbool(33)) {
                this.state = randelement([this.WALK_LEFT, this.WALK_RIGHT])
            }
        }
    }

    apply_state(){
        // console.log(this.state)
        switch (this.state) {
            case (this.STAND):
                this.object.decelerateX()
                break
            case (this.WALK_LEFT):
                this.object.moveLeft()
                break
            case (this.WALK_RIGHT):
                this.object.moveRight()
                break
        }
    }

    tick(obstacles){
        this.mstime += timing
        if (this.mstime >= 500){
            this.mstime = 0
            this.randomize_state()
        }
        
        this.apply_state()
        this.update_hitboxes()

        if (!this.check_left(obstacles) && this.state == this.WALK_LEFT) {
            this.state = this.STAND
        }

        if (!this.check_right(obstacles) && this.state == this.WALK_RIGHT) {
            this.state = this.STAND
        }
    }
}