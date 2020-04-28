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
        redcube.aim = "up";
    }
    if(controller.down){
        redcube.y += movement;
        redcube.aim = "down";
    }
    if(controller.right){
        redcube.x += movement; 
        redcube.aim = "right";
    }
    if(controller.left){
        redcube.x -= movement;
        redcube.aim = "left";
    }
    if(controller.space){
        if(redcube.aim === "up" && bulletUp.y <= -120){
            bulletUp.x = redcube.x + 9;
            bulletUp.y = redcube.y - bulletUp.h;
        }
        else if(redcube.aim === "down" && !(bulletDown.y <= 480 && bulletDown.y>=20 && bulletDown.x>0)){
            bulletDown.x = redcube.x + 9;
            bulletDown.y = redcube.y + 20;
        }

        else if(redcube.aim === "left" && (bulletLeft.x<=-20)){
            bulletLeft.x = redcube.x - bulletLeft.w;
            bulletLeft.y = redcube.y + 9;
        }

        else if(redcube.aim === "right" && !(bulletRight.x<=480 && bulletRight.x>=20 && bulletRight.y>0)){
            bulletRight.x = redcube.x + 20;
            bulletRight.y = redcube.y + 9;
        }
    }
    boundsControll(redcube);
}

function checkCollisons(){
    for(let i = 0; i < enemies.length; i++){
        if(intersects(bulletUp, enemies[i])){
            let element = document.getElementById(enemies[i].element);
            element.style.visibility = 'hidden';
            element.parentNode.removeChild(element);
            enemies.splice(i, 1);
            i--;
            bulletUp.y = -bulletUp.h;
        }else if(intersects(redcube,enemies[i])){
            let element = document.getElementById(redcube.element);
            element.style.visibility = 'hidden';
        }
        else if(enemies[i].y + enemies[i].h >= 480){
            let element = document.getElementById(enemies[i].element);
            element.style.visibility = 'hidden';
            element.parentNode.removeChild(element);
            enemies.splice(i, 1); 
            i--;
        }
        else if(bulletDown.y+bulletDown.h >=480)
        {
            bulletDown = createSprite('bulletDown', -2, -120, 2, 50);
        }

        else if(intersects(bulletDown,enemies[i]))
        {
            let element = document.getElementById(enemies[i].element);
            element.style.visibility = 'hidden';
            element.parentNode.removeChild(element);
            enemies.splice(i, 1);
            i--;
            bulletDown = createSprite('bulletDown', -2, -120, 2, 50);
        }

        else if(intersects(bulletLeft,enemies[i]))
        {
            let element = document.getElementById(enemies[i].element);
            element.style.visibility = 'hidden';
            element.parentNode.removeChild(element);
            enemies.splice(i, 1);
            i--;
            bulletLeft = createSprite('bulletLeft', 2, -100, 50, 2);
        }

        else if(intersects(bulletRight,enemies[i]))
        {
            let element = document.getElementById(enemies[i].element);
            element.style.visibility = 'hidden';
            element.parentNode.removeChild(element);
            enemies.splice(i, 1);
            i--;
            bulletRight = createSprite('bulletRight', 2, -100, 50, 2);
        }

        else if(bulletRight.x+bulletRight.w >=480)
        {
            bulletRight = createSprite('bulletRight', 2, -100, 50, 2);
        }
    }
}

function showSprites(){
    setPosition(redcube);
    setPosition(bulletUp);

    setPosition(bulletDown);
    setPosition(bulletLeft);
    setPosition(bulletRight);
    for(let i = 0; i < enemies.length; i++){
        setPosition(enemies[i]);
    }
}

function updatePositions(){
    for(let i = 0; i < enemies.length; i++){
        enemies[i].y += 4;
        //enemies[i].x += getRandom(7) - 3;
        boundsControll(enemies[i], true);
    }
    bulletUp.y -=12;

    bulletDown.y +=12;

    bulletLeft.x -=12;

    bulletRight.x +=12;
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
const bulletUp = createSprite('bulletUp', 0, -120, 2, 50);
let bulletDown = createSprite('bulletDown', -2, -120, 2, 50);
let bulletLeft = createSprite('bulletLeft', 2, -100, 50, 2);
let bulletRight = createSprite('bulletRight', 2, -100, 50, 2);

loop();