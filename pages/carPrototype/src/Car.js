//========================================//
// CLASS THAT MANAGES A GENERIC CAR
// REQUIRES p5.js, TPrimGeo.js, TCompGeo.js, TLib.js
//========================================//

class Car {
    constructor() { // shape must be an angle: 0 < angle < PI/2

        // CAR POSITIONS INFO
        this.center = createVector(screenWidth/2, screenHeight/2);
        this.direction = 0;
        this.speed = 0;

        // CAR SETTINGS
        this.settings = {
            radius: 20,
            shape: Math.PI/6,
            maxSpeed: 10,
            acceleration: 0.05,
            friction:0.05,
            steerPower: Math.PI/100,
            brakePower: 5,
            color: {
                red: 128,
                green: 128,
                blue: 128,
                alpha: 255,
            }
        }

        // CAR COLLISION BOX
        this.stepSize = 1;
        this.collisionBox = new CollisionRect(this.center.x, this.center.y, this.settings.radius, this.settings.shape);
        this.ghost = false;
    }

    show() { // DRAWS THE CAR ON THE CANVAS
        // DESTRUCTORING
        const {radius, shape, maxSpeed, acceleration, friction, steerPower, brakePower, color} = this.settings;
        const {red, green, blue, alpha} = color;

        // DRAW CAR
        this.collisionBox.show(red, green, blue, alpha);

        // DISPLAY INFO
        textSettings(10)
        text('speed: ' + Number(this.speed).toFixed(1) + " / " + maxSpeed, this.center.x-20, this.center.y-radius - 5)
        text('pos: '+ Number(this.center.x).toFixed(2) + ", " + Number(this.center.y).toFixed(2), this.center.x-20, this.center.y-radius - 15)
    }

    move(_shapes=[]) { // MOVES THE CAR (parameter is collision shapes)

        let absSpeed = Math.abs(this.speed)
        let steps = Math.floor(absSpeed/this.stepSize) // HOW MANY STEPS THE CAR WILL NEED TO MOVE x DISTANCE==speed
        let lastStep = absSpeed - steps;

        for(let i = 0; i < steps+1; i++) { // MOVES THE CAR stepSize UNITS FORWARDS FOR X STEPS
            let mov;
            if(i < steps) { // normal unitary steps (== to stepSize)
                mov = createVector(this.stepSize, 0).rotate(this.direction).mult(Math.sign(this.speed));
            } else { // last step (< stepsize)
                mov = createVector(lastStep, 0).rotate(this.direction).mult(Math.sign(this.speed));
            }  

            // moves the car forward/backwards
            this.center.add(mov);
            this.collisionBox.move(this.center.x, this.center.y, this.direction);

            if (this.checkCollision(shapes) && !this.ghost) { // moves the car in opposite direction if a collision accours
                this.speed = 0;
                this.center.sub(mov.mult(1.5));
                this.collisionBox.move(this.center.x, this.center.y, this.direction);
                break;
            }
        }
        this.ghost = false;

    }

    // THE NEXT FUNCTIONS HANDLE MOVEMENT INPUTS
    steerRight() {
        let s = this.settings;
        this.direction += (Math.sign(this.speed) * -s.steerPower * min(map(Math.abs(this.speed), 0, 5, 0, 1), 1));
    }

    steerLeft() {
        let s = this.settings;
        this.direction += (Math.sign(this.speed) * s.steerPower * min(map(Math.abs(this.speed), 0, 5, 0, 1), 1));
    }

    accelerate() {
        let s = this.settings;
        this.speed += s.acceleration;
        this.speed = Math.min(this.speed, s.maxSpeed);
    }

    reverse() {
        let s = this.settings;
        this.speed -= s.acceleration/2;
        this.speed = Math.max(this.speed, -s.maxSpeed/2);
    }

    brake() {
        let s = this.settings;
        if(Math.abs(this.speed) > 0.1)
            this.speed -= s.acceleration * s.brakePower * Math.sign(this.speed);
        else
            this.speed = 0;
    }

    idle() {
        let s = this.settings;
        if(Math.abs(this.speed) > 0.1)
            this.speed -= s.friction * Math.sign(this.speed);
        else
            this.speed = 0;
    }

    follow() { // RETURNS A VECTOR THAT CAN BE USED IN translate() TO FOLLOW THIS CAR
        return this.center.copy().mult(-1).add(createVector(screenWidth/2, screenHeight/2));
    }

    checkCollision(shapes) { // CHECKS COLLISIONS WITH THE PASSED COLLISION SHAPES (returns boolean)
        let coll = false;

        for(let i = 0; i < shapes.length; i++) {
            if(shapes[i] instanceof Line) {
                if(this.collisionBox.isLineColliding(shapes[i])) {
                    coll = true;
                }
            }
        }

        return coll;
    }

    loadCarData(data) {    // LOADS CAR DATA FROM A .tcar object
        let s = this.settings;

        let editMod = {
            radius: 2,
            shape: Math.PI/12,
            maxSpeed: 1,
            acceleration: 0.01,
            friction: 0.01,
            steerPower: Math.PI/200,
            brakePower: 0.5,
        };

        s.radius = data.radius * editMod.radius;
        s.shape = data.shape * editMod.shape;
        s.maxSpeed = data.maxSpeed * editMod.maxSpeed;
        s.acceleration = data.acceleration * editMod.acceleration;
        s.friction = data.friction * editMod.friction;
        s.steerPower = data.steerPower * editMod.steerPower;
        s.brakePower = data.brakePower * editMod.brakePower;

        s.color = data.color;

        this.collisionBox = new CollisionRect(this.center.x, this.center.y, s.radius, s.shape);
    }
}