const leftButton = 65;
const upButton = 87;
const rightButton = 68;
const downButton = 83;
const movement = 5;

let lastLoopRun = 0;

const redcube = new Object();
redcube.element = 'redcube'
redcube.x = 250;
redcube.y = 460;

const controller = new Object();

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
}

function showSprites(sprite){
    setPosition(sprite);
}

function loop(){
    if(new Date().getTime() - lastLoopRun > 40){
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

loop();