const leftButton = 65; //A
const upButton = 87;  //W
const rightButton = 68; // D
const downButton = 83; // S
const space = 32; // space
const movement = 4;

let lastLoopRun = 0;

const controller = new Object();
let enemies = new Array();

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

function intersects(a,b){
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function boundsControll(sprite, ignoreY){
    if(sprite.x <20){
        sprite.x = 20;
    }
    if(!ignoreY && sprite.y < 20){
        sprite.y = 20;
    }
    if(sprite.x +sprite.w > 480){
        sprite.x = 480 - sprite.w;        
    }
    if(!ignoreY && sprite.y +sprite.h > 480){
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
    if(controller.space && bullet.y <= -120 ){
        bullet.x = redcube.x + 9;
        bullet.y = redcube.y - bullet.h;
    }
    boundsControll(redcube);
}

function checkCollisons(){
    for(let i = 0; i < enemies.length; i++){
        if(intersects(bullet, enemies[i])){
            let element = document.getElementById(enemies[i].element);
            element.style.visibility = 'hidden';
            element.parentNode.removeChild(element);
            enemies.splice(i, 1);
            i--;
            bullet.y = -bullet.h;
        }else if(intersects(redcube,enemies[i])){
            let element = document.getElementById(redcube.element);
            element.style.visibility = 'hidden';;
        }
        else if(enemies[i].y + enemies[i].h >= 480){
            let element = document.getElementById(enemies[i].element);
            element.style.visibility = 'hidden';
            element.parentNode.removeChild(element);
            enemies.splice(i, 1); 
            i--;
        }

    }
}

function showSprites(){
    setPosition(redcube);
    setPosition(bullet);
    for(let i = 0; i < enemies.length; i++){
        setPosition(enemies[i]);
    }
}

function updatePositions(){
    for(let i = 0; i < enemies.length; i++){
        enemies[i].y += 4;
        enemies[i].x += getRandom(7) - 3;
        boundsControll(enemies[i], true);
    }
    bullet.y -=12;
}

function addEnemy(){
    if(getRandom(50) == 0){
        let enemyName ='enemy' + getRandom(10000000);
        let enemy = createSprite(enemyName, getRandom(450), -40, 35, 35);

        let element = document.createElement('div');
        element.id = enemyName;
        element.className = 'enemy';
        document.children[0].appendChild(element);

        enemies[enemies.length] = enemy;
    }
}

function getRandom(maxSize){
    return parseInt(Math.random()* maxSize);
}

function loop(){
    if(new Date().getTime() - lastLoopRun > 40){
        updatePositions();
        handleControls();
        checkCollisons();

        addEnemy();

        showSprites();

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