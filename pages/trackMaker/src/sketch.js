const screenWidth = 1200;
const screenHeight = 600;

let array = [];
let tempPoint = null;
let drawSetting = 'POINT';
let cameraSpeed = 6;
let cameraPos;

//let button;

function setup() {
    createCanvas(screenWidth, screenHeight);

    cameraPos = createVector(0, 0)
}

function draw() {
    background(240);
    
    if(keyIsDown(65)) { // A
        cameraPos.x += cameraSpeed;
    }
    if (keyIsDown(68)) { // D
        cameraPos.x -= cameraSpeed;
    }
    if (keyIsDown(87)) { // W
        cameraPos.y += cameraSpeed;
    }
    if (keyIsDown(83)) { // S
        cameraPos.y -= cameraSpeed;
    }

    if(keyIsDown(49) && tempPoint == null) { // POINT
        drawSetting = 'POINT';
    } else if (keyIsDown(50) && tempPoint == null) { // LINE
        drawSetting = 'LINE';
    } else if (keyIsDown(51) && tempPoint == null) { // LINE
        drawSetting = 'AUTOLINE';
    } else if (keyIsDown(52) && tempPoint == null) { // LINE
        drawSetting = 'CIRCLE';
    }

    textSettings(10,0,0,0);
    text('press numbers 1-4 \n to change mode \n---------------------------\n press Z to undo', 5, 10);
    textSize(10);
    text('current mode:', 120, 10);
    textSize(20);
    text(drawSetting, 120, 30);
    textSize(10);
    text("camera position:", 240, 10)
    textSize(20);
    text(cameraPos.x + " | " + cameraPos.y, 240, 30);
    textSize(10);
    text("press C to go to 0,0", 240, 43)

    translate(cameraPos)
    if(tempPoint != null) {
        textSettings(10,0,0,0);
        text('press X to cancel', mouseX - cameraPos.x, mouseY - cameraPos.y-10);
        if(keyIsDown(88)) {
            tempPoint = null;
        }
    }
    
    if(tempPoint != null) {
        textSettings(10,0,0,0);
        text('press X to cancel', mouseX - cameraPos.x, mouseY - cameraPos.y-10);
        if(keyIsDown(88)) {
            tempPoint = null;
        }

        switch(drawSetting) {
            case 'AUTOLINE':
            case 'LINE':
                strokeWeight(1);
                color(255);
                line(tempPoint.x, tempPoint.y, (mouseX - cameraPos.x), (mouseY - cameraPos.y));
                break;

            case 'CIRCLE':
                strokeWeight(2);
                color(0);
                fill(0, 0, 0, 10);
                let r = vectorDistance(tempPoint, createVector(mouseX - cameraPos.x, mouseY - cameraPos.y))*2;
                ellipse(tempPoint.x, tempPoint.y, r);
                break;
        }
    }

    for(let i = 0; i < array.length; i++) {
        array[i].showAuto();
    }
}

function mousePressed() {
    if (mouseButton === LEFT) {
        switch(drawSetting) {
            case 'POINT': 
                array.push(new Point(mouseX - cameraPos.x, mouseY - cameraPos.y));
                break;

            case 'LINE':
                if(tempPoint == null) {
                    tempPoint = createVector(mouseX - cameraPos.x, mouseY - cameraPos.y);
                } else {
                    array.push(new Line(tempPoint.x, tempPoint.y, mouseX - cameraPos.x, mouseY - cameraPos.y));
                    tempPoint = null;
                }
                break;
            
            case 'AUTOLINE':
                if(tempPoint == null) {
                    tempPoint = createVector(mouseX - cameraPos.x, mouseY - cameraPos.y);
                } else {
                    array.push(new Line(tempPoint.x, tempPoint.y, mouseX - cameraPos.x, mouseY - cameraPos.y));
                    tempPoint = createVector(mouseX - cameraPos.x, mouseY - cameraPos.y);
                }
                break;

            case 'CIRCLE':
                if(tempPoint == null) {
                    tempPoint = createVector(mouseX - cameraPos.x, mouseY - cameraPos.y);
                } else {
                    array.push(new Circle(tempPoint.x, tempPoint.y, vectorDistance(tempPoint, createVector(mouseX - cameraPos.x, mouseY - cameraPos.y))));
                    tempPoint = null;
                }
                break;
        }
    }
}

function keyPressed() {
    if(keyCode === 90 && tempPoint == null) {
        array.pop();
    } else if(keyCode === 67) {
        cameraPos = createVector(0,0);
    }
}

function runDownload() {
    //setAndDownloadData(tGeoWriter(array));
    console.log('click')
}




