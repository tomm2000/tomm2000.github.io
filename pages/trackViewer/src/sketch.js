const screenWidth = 1200;
const screenHeight = 600;

let array = [];
let tempPoint = null;
let drawSetting = 'POINT';
let cameraPos;
let cameraSpeed = 6;

function setup() {
    createCanvas(screenWidth, screenHeight);
    cameraPos = createVector(0,0)
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

    if(array.length == 0)
        array = getGeoData();

    color(255);
    fill(0)
    strokeWeight(0);
    textSize(10);
    text("camera position:", 10, 10)
    textSize(20);
    text(cameraPos.x + " | " + cameraPos.y, 10, 30);
    
    translate(cameraPos);

    for(let i = 0; i < array.length; i++) {
        array[i].showAuto();
    }
}

//setAndDownloadData(tGeoWriter(array));




