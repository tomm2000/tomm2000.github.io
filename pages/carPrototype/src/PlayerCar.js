//========================================//
// CLASS THAT MANAGES A PLAYER CONTROLLED CAR
// REQUIRES p5.js, TPrimGeo.js, TCompGeo.js, TLib.js
//========================================//

class PlayerCar extends Car {
    constructor() {
        super();
    }

    control() { // checks keyboard inputs and sends control info to the car class (super)
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