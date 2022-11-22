function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// returns random value within range(a, b)
function randint(a, b){
    b += 1
    return Math.floor(Math.random() * (b - a) + a)
}


// returns true or false according given percentage
function randbool(percent){
    return randint(1, Math.round(100/percent)) == 1
}


// returns random element from a list
function randelement(array){
    if (array.length > 0){
        return array[randint(0, array.length-1)]
    }
    return false
}


function generate_terrain(){
    min_h = 36 * 3
    max_h = height - 36 - 10
    beams = []
    enemies = []
    numberOfBeams = 20
    
    start_beam = new Beam(36, min_h + 36 * 3, randint(3, 5))
    beams.push(new Beam(0, min_h + 36 * 2, 1))
    beams.push(start_beam)
    
    let prev_y = start_beam.y_cord
    let prev_x = start_beam.x_cord + start_beam.width
    let new_x
    let new_y
    let beam_size
    for (let iter = 1; iter <= numberOfBeams; iter++){
        new_x = prev_x + randint(3, 4) * 36
        // console.log(new_x)
        new_y = prev_y + randint(-3, 3) * 36
        if (new_y != prev_y) {
            new_x -= randint(0, 6) * 36
        }

        beam_size = randint(2, 6)
        new_beam = new Beam(new_x, new_y, beam_size)
        beams.push(new_beam)
        if (beam_size >= 3){
            enemies.push(new Enemy(randint(0, 2), new_beam.x_cord + 10, new_beam.y_cord - 100))
        }
        
        prev_x = new_x + new_beam.width
        perv_y = new_y
    } 

    
    return [beams, enemies]
}


// function that checks collisions
function collide(firstObject, secondObject){
    let fBottomRight = [firstObject.x_cord + firstObject.width, firstObject.y_cord + firstObject.height]
    let sBottomRight = [secondObject.x_cord + secondObject.width, secondObject.y_cord + secondObject.height]
    
    let fx = firstObject.x_cord > secondObject.x_cord && firstObject.x_cord < sBottomRight[0]
    let fy = firstObject.y_cord > secondObject.y_cord && firstObject.y_cord < sBottomRight[1]
    let sx = secondObject.x_cord > firstObject.x_cord && secondObject.x_cord < fBottomRight[0]
    let sy = secondObject.y_cord > firstObject.y_cord && secondObject.y_cord < fBottomRight[1]
    return [(fx || sx) , (fy || sy)]
}


function objCollide(firstObject, secondObject){
    [x, y] = [...collide(firstObject, secondObject)]
    return x && y
}


function distance(firstObject, secondObject){
    let x = firstObject.x_cord - secondObject.x_cord
    let y = firstObject.y_cord - secondObject.y_cord
    let disct = Math.sqrt(x**2 + y**2)
    return [x, y, disct]
}


function draw_rect(x, y, width, height){
    mainGameCanvas2dContext.beginPath();
    mainGameCanvas2dContext.rect(x, y, width, height);
    mainGameCanvas2dContext.stroke();
}
