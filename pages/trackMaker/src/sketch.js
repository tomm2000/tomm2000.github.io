const screenWidth = -10+ window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

const screenHeight = -75+ window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

let array = []; // SHAPE ARRAY
let tempPoint = null; // temp point for multi-click shapes
let drawSetting = 'POINT'; // current draw setting
let cameraSpeed = 6; // camera mov speed
let cameraPos; // camera pos

function setup() {
    canvas = createCanvas(screenWidth, screenHeight);
    canvas.mousePressed(canvasClick);
    cameraPos = createVector(0, 0);
}

function draw() {
    background(240);
    
    // CAMERA MOVEMET
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
    // =======================

    // DRAW SETTING CHANGING [keys 1-4]
    if(keyIsDown(49) && tempPoint == null) { // POINT
        drawSetting = 'POINT';
    } else if (keyIsDown(50) && tempPoint == null) { // LINE
        drawSetting = 'LINE';
    } else if (keyIsDown(51) && tempPoint == null) { // LINE
        drawSetting = 'AUTOLINE';
    } else if (keyIsDown(52) && tempPoint == null) { // LINE
        drawSetting = 'CIRCLE';
    }

    // DISPLAYS SOME INFO TEXT
    textSettings(10);
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
    // ===========================
    
    // DRAWING
    translate(cameraPos) // translate to camera pos

    if(tempPoint != null) { // displays "x to cancel" on the mouse is a multi-click shape is being drawn
        textSettings(10);
        text('press X to cancel', mouseX - cameraPos.x, mouseY - cameraPos.y-10);
        if(keyIsDown(88)) {
            tempPoint = null;
        }
    }
    
    if(tempPoint != null) {
        if(keyIsDown(88)) { // resets the temppoint if key is clicked (stops drawing the shape)
            tempPoint = null;
        }

        switch(drawSetting) { // if a multi-click shape is being drawn, displays a preview based on the current mouse position
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

    for(let i = 0; i < array.length; i++) { // draws the shapes
        array[i].show();
    }
    // ==============================
}

function canvasClick() { // HANDLES THE CONSTRUCTION OF SHAPES WHEN THE MOUSE IS PRESSED ON THE CANVAS
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
    if(keyCode === 90 && tempPoint == null) { // PRESS z TO REMOVE LATEST SHAPE
        array.pop();
    } else if(keyCode === 67) { // PRESS C TO MOVE CAMERA TO 0,0
        cameraPos = createVector(0,0);
    }
}

function runDownload() {
    setAndDownloadData(tGeoWriter(array));
}




