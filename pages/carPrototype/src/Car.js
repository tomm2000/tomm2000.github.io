class Car {
    constructor(_radius=20, _shape=(PI/6)) { // shape must be an angle: 0 < angle < PI/2

        // CAR POSITIONS INFO
        this.center = createVector(screenWidth/2, screenHeight/2);
        this.direction = 0;
        //this.colliding = false;

        // CAR shape INFO
        this.radius = _radius;
        this.shape = _shape;

        // CAR PERFORMANCE STATS
        this.speed = 0;
        this.maxSpeed = 10;
        this.acceleration = 0.05;
        this.friction = 0.05;
        this.rotationSpeed = PI/100;
        this.brakeForce = 5;

        // CAR COLLISION BOX
        this.stepSize = 1;
        this.collisionBox = new CollisionRect(this.center.x, this.center.y, _radius, _shape);
        this.ghost = false;
    }

    show() {
        // DRAW CAR
        this.collisionBox.show();

        // DISPLAY INFO
        textSettings(10)
        text('speed: ' + Number(this.speed).toFixed(1), this.center.x-20, this.center.y-this.radius - 5)
        text('pos: '+ Number(this.center.x).toFixed(2) + ", " + Number(this.center.y).toFixed(2), this.center.x-20, this.center.y-this.radius - 15)
    }

    move(_shapes=[]) {
        let absSpeed = Math.abs(this.speed)
        let steps = Math.floor(absSpeed/this.stepSize)
        let lastStep = absSpeed - steps;

        for(let i = 0; i < steps+1; i++) {
            let mov;
            if(i < steps) {
                mov = createVector(this.stepSize, 0).rotate(this.direction).mult(Math.sign(this.speed));
            } else {
                mov = createVector(lastStep, 0).rotate(this.direction).mult(Math.sign(this.speed));
            }  
            this.center.add(mov);
            this.collisionBox.move(this.center.x, this.center.y, this.direction);

            if (this.checkCollision(shapes) && !this.ghost) {
                this.speed = 0;
                this.center.sub(mov.mult(1.5));
                this.collisionBox.move(this.center.x, this.center.y, this.direction);
            }
        }
        this.ghost = false;

    }

    steerRight() {
        this.direction += (Math.sign(this.speed) * -this.rotationSpeed * min(map(Math.abs(this.speed), 0, 5, 0, 1), 1));
    }

    steerLeft() {
        this.direction += (Math.sign(this.speed) * this.rotationSpeed * min(map(Math.abs(this.speed), 0, 5, 0, 1), 1));
    }

    accelerate() {
        if(this.speed <= this.maxSpeed)
            this.speed += this.acceleration;

        if(this.speed > this.maxSpeed)
            this.speed = this.maxSpeed;
    }

    reverse() {
        if(this.speed >= -this.maxSpeed/2)
            this.speed -= this.acceleration /2;
        if(this.speed < -this.maxSpeed/2)
            this.speed = -this.maxSpeed/2;
    }

    brake() {
        if(Math.abs(this.speed) > 0.1)
            this.speed -= this.acceleration * this.brakeForce * Math.sign(this.speed);
        else
            this.speed = 0;
    }

    idle() {
        if(Math.abs(this.speed) > 0.1)
            this.speed -= this.friction * Math.sign(this.speed);
        else
            this.speed = 0;
    }

    follow() {
        return this.center.copy().mult(-1).add(createVector(screenWidth/2, screenHeight/2));
    }

    checkCollision(shapes) {
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

    loadCarData(data) {     
        let editMod = {
            radius: 2,
            shape: Math.PI/12,
            maxSpeed: 1,
            acceleration: 0.01,
            friction: 0.01,
            steerPower: Math.PI/200,
            brakePower: 0.5,
        }

        this.radius = data.radius * editMod.radius;
        this.shape = data.shape * editMod.shape;
        this.maxSpeed = data.maxSpeed * editMod.maxSpeed;
        this.acceleration = data.acceleration * editMod.acceleration;
        this.friction = data.friction * editMod.friction;
        this.steerPower = data.steerPower * editMod.steerPower;
        this.brakePower = data.brakePower * editMod.brakePower;

        this.collisionBox = new CollisionRect(this.center.x, this.center.y, this.radius, this.shape);
    }
}