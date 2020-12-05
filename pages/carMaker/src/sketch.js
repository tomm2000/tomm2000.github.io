const screenWidth = 800;
const screenHeight = 500;

let exampleCar;

let car = {
    radius: 10,
    shape: 2,
    maxSpeed: 10,
    acceleration: 5,
    friction: 5,
    steerPower: 2,
    brakePower: 5,
};

let editMod = {
    radius: 2,
    shape: Math.PI/12,
    maxSpeed: 1,
    acceleration: 0.01,
    friction: 0.01,
    steerPower: Math.PI/200,
    brakePower: 1,
}


function setup() {
    createCanvas(screenWidth, screenHeight);
    exampleCar = new CollisionRect(screenWidth/2, screenHeight/2, 20, Math.PI/6);
}

function draw() {
    background(240);

    strokeWeight(1)
    stroke(100, 100, 100, 180)
    exampleCar.show();

    textSettings(20);
    text("Radius: " + car.radius, 10, 20)
    text("Shape: " + car.shape, 10, 40)
    text("Max Speed: " + car.maxSpeed, 10, 60)
    text("Acceleration: " + car.acceleration, 10, 80)
    text("Friction: " + car.friction, 10, 100)
    text("Steer Power: " + car.steerPower, 10, 120)
    text("Brake Power: " + car.brakePower, 10, 140)

    new CollisionRect(screenWidth/2, screenHeight/2, car.radius * editMod.radius, car.shape * editMod.shape).showAuto()
}

function runDownload() {
    setAndDownloadData(tCarWriter(car));
}

function radiusEdit(n) {
    car.radius += n;
    car.radius = clamp(car.radius, 2, 40)
}
function shapeEdit(n) {
    car.shape += n;
    car.shape = clamp(car.shape, 0.25, 5.75)
}
function maxSpeedEdit(n) {
    car.maxSpeed += n;
    car.maxSpeed = clamp(car.maxSpeed, 1, 40)
}
function accelerationEdit(n) {
    car.acceleration += n;
    car.acceleration = clamp(car.acceleration, 1, 10)
}
function frictionEdit(n) {
    car.friction += n;
    car.friction = clamp(car.friction, 0, 10)
}
function steerPowerEdit(n) {
    car.steerPower += n;
    car.steerPower = clamp(car.steerPower, .5, 8)
}
function brakePowerEdit(n) {
    car.brakePower += n;
    car.brakePower = clamp(car.brakePower, 1, 20)
}

function loadCar() {
    car = getCarData();
}




