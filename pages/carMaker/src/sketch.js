const screenWidth = 800;
const screenHeight = 500;

let car = {
    radius: 0,
    shape: 0,
    maxSpeed: 0,
    acceleration: 0,
    friction: 0,
    steerPower: 0,
    brakePower: 0,
};

function setup() {
    createCanvas(screenWidth, screenHeight);
}

function draw() {
    background(240);
    textSettings(20);
    text("Radius: " + car.radius, 10, 20)
    text("Shape: " + car.shape, 10, 40)
    text("Max Speed: " + car.maxSpeed, 10, 60)
    text("Acceleration: " + car.acceleration, 10, 80)
    text("Friction: " + car.friction, 10, 100)
    text("Steer Power: " + car.steerPower, 10, 120)
    text("Brake Power: " + car.brakePower, 10, 140)
}

function runDownload() {
    setAndDownloadData(tCarWriter(car));
}

function radiusEdit(n) {
    car.radius += n;
}
function shapeEdit(n) {
    car.shape += n;
}
function maxSpeedEdit(n) {
    car.maxSpeed += n;
}
function accelerationEdit(n) {
    car.acceleration += n;
}
function frictionEdit(n) {
    car.friction += n;
}
function steerPowerEdit(n) {
    car.steerPower += n;
}
function brakePowerEdit(n) {
    car.brakePower += n;
}

function loadFile() {
    if(dataRead) {
        car = getCarData();
        console.log(car);
    } else {
        console.log("data not read");
    }
}




