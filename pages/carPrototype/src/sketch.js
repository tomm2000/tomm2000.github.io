const screenWidth = -10+ window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

const screenHeight = -85+ window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

const fps = 60;

const areaWidth = 5000;
const areaHeight = 5000;
const density = 0.00005;

let cars = [];
let shapes = [];

let frames = 0;
let c = 0;

let cameraPos;

function setup() {
    createCanvas(screenWidth, screenHeight);
    frameRate(fps);

    cars.push(new PlayerCar());
    cameraPos = createVector(0, 0)
}

function draw() {

    background(240);

    // FPS COMPUTING AND DISPLAY
    if(c == fps/2)    {
        frames = Math.round(getFrameRate());
        c = 0
    } else { c++ }

    strokeWeight(0)
    textSize(20);
    fill(0);
    text('fps: ' + frames, 10, 20)
    // =======================

    // CONTROL AND MOVEMENT
    cars[0].control()
    for(let i = 0; i < cars.length; i++){
        cars[i].move(shapes)
    }
    // ====================

    // DRAWING
    translate(cars[0].follow()); // see Car.js for info about this func

    for(let i = 0; i < shapes.length; i++) { // draws the shapes
        shapes[i].show();   
    } 
    for(let i = 0; i < cars.length; i++) { // draws the cars
        cars[i].show()
    }
    // ==========

}

function loadTrack() { // loads the track (activated by button)
    shapes = getGeoData();
}

function loadCar() { // loads the car (activated by button)
    cars[0].loadCarData(getCarData());
}




