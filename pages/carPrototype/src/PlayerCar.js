class PlayerCar extends Car {
    constructor(_radius=20, _size=(PI/6)) {
        super(_radius, _size);
    }

    control() {
        if(keyIsDown(65)) { // D
            this.steerRight();
        }
        if(keyIsDown(68)) { // A
            this.steerLeft();
        }

        if(keyIsDown(80)) { // A
            this.ghost = true;
        }
    
        if(keyIsDown(87)) { // W
            this.accelerate();
    
        } else if(keyIsDown(83)) { // S
            this.reverse();
    
        } else if(keyIsDown(32)) { // SPACE
            this.brake();
    
        } else {
            this.idle();
        }
    }
}