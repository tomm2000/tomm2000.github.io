const screenWidth = -10+ window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

const screenHeight = -85+ window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

let array = []; // SHAPE ARRAY
let cameraPos; // CAMERA POS
let cameraSpeed = 6; // CAMERA SPEED

function setup() {
    createCanvas(screenWidth, screenHeight);
    cameraPos = createVector(0,0)
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
    // ====================

    // LOADS THE SHAPED DATA
    // !!! MUST BE CHANGED LIKE OTHER DATA LOADING SYSTEMS !!!
    if(array.length == 0)
        array = getGeoData();

    // DISPLAYS SOME INFO
    textSettings()
    text("camera position:", 10, 10)
    textSize(20);
    text(cameraPos.x + " | " + cameraPos.y, 10, 30);
    
    // MOVES THE CAMERA
    translate(cameraPos);

    // DISPLAYS THE SHAPES
    for(let i = 0; i < array.length; i++) {
        array[i].show();
    }
}

//setAndDownloadData(tGeoWriter(array));




