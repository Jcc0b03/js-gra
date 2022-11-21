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
