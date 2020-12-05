const screenWidth = 800;
const screenHeight = 500;

const canvasX = 0;
const canvasY = 150;

const CAR_SETTINGS_Y = 20;
const DEFAULT_CAR_Y = 180;
const CAR_COLOR_Y = 250;

let sliders;

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

let carColor = {
    red: 0,
    green: 0,
    blue: 0,
    alpha: 0,
}


function setup() {
    canvas = createCanvas(screenWidth, screenHeight);
    canvas.position(canvasX, canvasY, 'fixed');
    
    sliders = {
        red: createSlider(0, 255, 128, 1),
        green: createSlider(0, 255, 128, 1),
        blue: createSlider(0, 255, 128, 1),
        alpha: createSlider(0, 255, 255, 1),
    }

    sliders.red.position(canvasX, canvasY + CAR_COLOR_Y);
    sliders.red.style('width', '80px');
    
    sliders.green.position(canvasX, canvasY + CAR_COLOR_Y + 20);
    sliders.green.style('width', '80px');
    
    sliders.blue.position(canvasX, canvasY + CAR_COLOR_Y + 40);
    sliders.blue.style('width', '80px');
    
    sliders.alpha.position(canvasX, canvasY + CAR_COLOR_Y + 60);
    sliders.alpha.style('width', '80px');
}

function draw() {
    background(240);

    carColor.red = sliders.red.value();
    carColor.green = sliders.green.value();
    carColor.blue = sliders.blue.value();
    carColor.alpha = sliders.alpha.value();
    const {red, green, blue, alpha} = carColor;

    textSettings(20);
    // CAR SETTINGS
    text("Radius: " + car.radius, 10, CAR_SETTINGS_Y)
    text("Shape: " + car.shape, 10, CAR_SETTINGS_Y + 20)
    text("Max Speed: " + car.maxSpeed, 10, CAR_SETTINGS_Y + 40)
    text("Acceleration: " + car.acceleration, 10, CAR_SETTINGS_Y + 60)
    text("Friction: " + car.friction, 10, CAR_SETTINGS_Y + 80)
    text("Steer Power: " + car.steerPower, 10, CAR_SETTINGS_Y + 100)
    text("Brake Power: " + car.brakePower, 10, CAR_SETTINGS_Y + 120)

    // DEFAULT CAR
    new CollisionRect(60, DEFAULT_CAR_Y + 20, 20, Math.PI/6).show();
    textSettings(20);
    text("Default car:", 10, DEFAULT_CAR_Y)
    
    // CAR COLOR
    textSettings(15);
    text("Red: " + red, 90, CAR_COLOR_Y + 15)
    text("Green: " + green, 90, CAR_COLOR_Y + 35)
    text("Blue: " + blue, 90, CAR_COLOR_Y + 55)
    text("Alpha: " + alpha, 90, CAR_COLOR_Y + 75)

    new CollisionRect(screenWidth/2, screenHeight/2, car.radius * editMod.radius, car.shape * editMod.shape).show(red, green, blue, alpha)
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




