function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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


function distance(firstObject, secondObject){
    let x = firstObject.x_cord - secondObject.x_cord
    let y = firstObject.y_cord - secondObject.y_cord
    let disct = Math.sqrt(x**2 + y**2)
    return [x, y, disct]
}
