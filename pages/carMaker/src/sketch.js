const screenWidth = -10+ window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

const screenHeight = -85+ window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

const canvasX = 0;
const canvasY = 150;

const CAR_SETTINGS_Y = 20; // height of the car settings UI
const DEFAULT_CAR_Y = 180; // height of the default car UI
const CAR_COLOR_Y = 250; // height of the car color UI

let sliders;

let car = { // car object to edit
    radius: 10,
    shape: 2,
    maxSpeed: 10,
    acceleration: 5,
    friction: 5,
    steerPower: 2,
    brakePower: 5,
    color: {
        red: 0,
        green: 0,
        blue: 0,
        alpha: 0,
    }
};

let editMod = { // modification settings (not used here)
    radius: 2,
    shape: Math.PI/12,
    maxSpeed: 1,
    acceleration: 0.01,
    friction: 0.01,
    steerPower: Math.PI/200,
    brakePower: 1,
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

    const {red, green, blue, alpha} = sliders;

    red.position(canvasX, canvasY + CAR_COLOR_Y);
    red.style('width', '80px');
    
    green.position(canvasX, canvasY + CAR_COLOR_Y + 20);
    green.style('width', '80px');
    
    blue.position(canvasX, canvasY + CAR_COLOR_Y + 40);
    blue.style('width', '80px');
    
    alpha.position(canvasX, canvasY + CAR_COLOR_Y + 60);
    alpha.style('width', '80px');
}

function draw() {
    background(240);

    car.color.red = sliders.red.value();
    car.color.green = sliders.green.value();
    car.color.blue = sliders.blue.value();
    car.color.alpha = sliders.alpha.value();
    
    const {radius, shape, maxSpeed, acceleration, friction, steerPower, brakePower, color} = car;
    const {red, green, blue, alpha} = color;

    textSettings(20);
    // CAR SETTINGS
    text("Radius: " + radius, 10, CAR_SETTINGS_Y)
    text("Shape: " + shape, 10, CAR_SETTINGS_Y + 20)
    text("Max Speed: " + maxSpeed, 10, CAR_SETTINGS_Y + 40)
    text("Acceleration: " + acceleration, 10, CAR_SETTINGS_Y + 60)
    text("Friction: " + friction, 10, CAR_SETTINGS_Y + 80)
    text("Steer Power: " + steerPower, 10, CAR_SETTINGS_Y + 100)
    text("Brake Power: " + brakePower, 10, CAR_SETTINGS_Y + 120)

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

    new CollisionRect(screenWidth/2, screenHeight/2, radius * editMod.radius, shape * editMod.shape).show(red, green, blue, alpha)
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

function runDownload() {
    setAndDownloadData(tCarWriter(car));
}




