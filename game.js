const leftButton = 65; //A
const upButton = 87;  //W
const rightButton = 68; // D
const downButton = 83; // S
const space = 32; // space
const movement = 4;

let lastLoopRun = 0;

const controller = new Object();

function createSprite(element, x, y, w, h){
    let result = new Object();
    result.element = element;
    result.x = x;
    result.y= y;
    result.w = w;
    result.h = h;
    return result;
}

function toggleKey(keyCode, isPressed) {
    if(keyCode === leftButton){
        controller.left = isPressed;
    }
    if(keyCode === upButton){
        controller.up = isPressed;
    }
    if(keyCode === rightButton){
        controller.right = isPressed;
    }
    if(keyCode === downButton){
        controller.down = isPressed;
    }
    if(keyCode === space){
        controller.space = isPressed;
    }
    
}

function boundsControll(sprite){
    if(sprite.x <20){
        sprite.x = 20;
    }
    if(sprite.y < 20){
        sprite.y = 20;
    }
    if(sprite.x +sprite.w > 480){
        sprite.x = 480 - sprite.w;        
    }
    if(sprite.y +sprite.h > 480){
        sprite.y = 480 - sprite.h;        
    }
}

function setPosition(sprite) {
    let eL = document.getElementById(sprite.element);
    eL.style.left = sprite.x + 'px';
    eL.style.top = sprite.y + 'px';
}

function handleControls(){
    if(controller.up){
        redcube.y -= movement; 
    }
    if(controller.down){
        redcube.y += movement;
    }
    if(controller.right){
        redcube.x += movement; 
    }
    if(controller.left){
        redcube.x -= movement;
    }
    if(controller.space){
        bullet.x = redcube.x + 9;
        bullet.y = redcube.y - bullet.h;
    }
    boundsControll(redcube);
}

function showSprites(){
    setPosition(redcube);
    setPosition(bullet);
}

function updatePositions(){
    bullet.y -=12;
}

function loop(){
    if(new Date().getTime() - lastLoopRun > 40){
        updatePositions();
        handleControls();
        showSprites(redcube);

        lastLoopRun = new Date().getTime();
    }
    setTimeout('loop();',2);
}

document.onkeydown = function(evt){
    toggleKey(evt.keyCode, true);
}

document.onkeyup = function(evt){
    toggleKey(evt.keyCode, false);
}

const redcube = createSprite('redcube', 250, 460, 20, 20);
const bullet = createSprite('bullet', 0, -120, 2, 50);

loop();