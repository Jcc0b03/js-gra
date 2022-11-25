class AIControl{
    TIMING = 0

    // states constants
    STAND = 0
    WALK_LEFT = 1
    WALK_RIGHT = 2

    RUN_LEFT = 8
    RUN_RIGHT = 9

    JUMP_UP = 10
    JUMP_LEFT = 11
    JUMP_RIGHT = 12

    ATTACK = 20
    // end

    RANGE = 100 // jak daleko widzą enemiesy

    // randomization
    WILL_JUMP_DOWN = 64 // szansa że gdy dotrze do krawędzi, zeskoczy na niższą platformę

    constructor(object, timing=1){
        this.timing = timing
        this.mstime = 0
        this.object = object
        this.state = this.STAND
        this.jumpCooldown = 0
        this.playerKilled = false

        this.leftDownHitbox
        this.rightDownHitbox
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

        this.leftShortHitbox = {
            "x_cord": this.object.x_cord - this.object.width, 
            "y_cord": this.object.y_cord + this.object.height,
            "width": this.object.width, 
            "height": 50
        }

        
        this.rightShortHitbox = {
            "x_cord": this.object.x_cord + this.object.width, 
            "y_cord": this.object.y_cord + this.object.height,
            "width": this.object.width, 
            "height": 50
        }

        this.leftDetectHitbox = {
            "x_cord": this.object.x_cord - this.object.width - this.RANGE, 
            "y_cord": this.object.y_cord,
            "width": this.object.width + this.RANGE, 
            "height": this.object.height
        }

        
        this.rightDetectHitbox = {
            "x_cord": this.object.x_cord + this.object.width, 
            "y_cord": this.object.y_cord,
            "width": this.object.width + this.RANGE, 
            "height": this.object.height
        }
        
        // draw_object(this.leftDetectHitbox)
        // draw_object(this.rightDetectHitbox)
    }

    check_left(obstacles){
        let long = false
        let short = false
        obstacles.forEach(obstacle => {
            if (objCollide(obstacle, this.leftDownHitbox)){
                long = true
            }
            if (objCollide(obstacle, this.leftShortHitbox)){
                short = true
            }
        })

        return [long, short]
    }

    check_right(obstacles){
        let long = false
        let short = false
        obstacles.forEach(obstacle => {
            if (objCollide(obstacle, this.rightDownHitbox)){
                long = true
            }
            if (objCollide(obstacle, this.rightShortHitbox)){
                short = true
            }
        })

        return [long, short]
    }

    look_for_player(player){
        // console.log(distance(this.object, player))
        console.log(this.playerKilled)
        if (playerObject.alive == playerObject.DYING){
            this.playerKilled = true
            this.state = this.STAND
        }
        if (this.playerKilled){
            return
        }
        if (distance(this.object, player)[2] < 50){
            return true
        }
        if (objCollide(this.leftDetectHitbox, player)){
            console.log("gracz")
            this.state = this.RUN_LEFT
        }else if (objCollide(this.rightDetectHitbox, player)){
            this.state = this.RUN_RIGHT
        } // no longer see player
        else if ([this.RUN_LEFT, this.RUN_RIGHT].includes(this.state)){
            this.state = this.STAND
        }
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

        if (randbool(10)){
            this.object.shortJump()
        }
    }

    apply_state(){
        // console.log(this.state)
        switch (this.state) {
            case (this.STAND):
                this.object.decelerateX()
                break
            case (this.WALK_LEFT):
                this.object.maxSpeed = this.object.walk_speed
                this.object.moveLeft()
                break
            case (this.JUMP_LEFT):
                this.object.moveLeft()
                this.jumpCooldown ++
                break
            case (this.RUN_LEFT):
                this.object.maxSpeed = this.object.run_speed
                this.object.moveLeft()
                break
            case (this.WALK_RIGHT):
                this.object.maxSpeed = this.object.walk_speed
                this.object.moveRight()
                break
            case (this.JUMP_RIGHT):
                this.object.moveRight()
                this.jumpCooldown ++
                break
            case (this.RUN_RIGHT):
                this.object.maxSpeed = this.object.run_speed
                this.object.moveRight()
                break
            case (this.ATTACK):
                this.object.decelerateX()
                this.object.enemyState = 2
                playerObject.receive_damage(1)

        }
    }

    tick(obstacles, player){
        // console.log(this.state)
        this.mstime += timing
        if (this.mstime >= 700){
            this.mstime = 0
            this.randomize_state()
        }
        
        this.apply_state()
        this.update_hitboxes()

        let player_here = this.look_for_player(player)
        if (player_here) {
            this.state = this.ATTACK
        }

        if (this.state == this.JUMP_LEFT && this.object.collide_bottom && this.jumpCooldown >= 60) {
            this.jumpCooldown = 0
            this.state = this.STAND
        } else if(this.state == this.JUMP_LEFT && this.jumpCooldown >= 30){
            this.object.speedX += 0.2
        }

        if (this.state == this.JUMP_RIGHT && this.object.collide_bottom && this.jumpCooldown >= 60) {
            this.jumpCooldown = 0
            this.state = this.STAND
        } else if(this.state == this.JUMP_RIGHT && this.jumpCooldown >= 30){
            this.object.speedX -= 0.2
        }

        let left = this.check_left(obstacles)
        if (this.state == this.WALK_LEFT) {
            if (left[0] && left[1]){
                return true
            } else if (left[0] && !left[1]){
                if (randbool(this.WILL_JUMP_DOWN)){
                    this.object.powerJump()
                    this.object.speedX -= 1.2
                    this.state = this.JUMP_LEFT
                } else {
                    this.state = this.STAND
                }
            } else {
                this.state = this.STAND
            }
        }

        let right = this.check_right(obstacles)
        if (this.state == this.WALK_RIGHT) {
            if (right[0] && right[1]){
                return true
            } else if (right[0] && !right[1]){
                if (randbool(this.WILL_JUMP_DOWN)){
                    this.object.powerJump()
                    this.object.speedX += 1.2
                    this.state = this.JUMP_RIGHT
                } else {
                    this.state = this.STAND
                }
            } else {
                this.state = this.STAND
            }
        }
    }
}