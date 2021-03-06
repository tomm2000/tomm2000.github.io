//========================================//
// LIBRARY WITH COMPOUND SHAPES
// REQUIRES p5.js, TPrimGeo.js
//========================================//

class CollisionRect { // A RECT WITH COLLISION FUNCTIONALITY
    constructor(_centerX, _centerY, _radius, _shape, _rotation=0) {
        this.center = createVector(_centerX, _centerY);
        this.radius = _radius;
        this.shape = _shape;
        this.rotation = _rotation;

        this.updatePoints();
    }

    updatePoints() { // UPDATES THE VERTEXES BASED ON THE CURRENT ROTATION AND CENTER
        this.tr = createVector(this.radius, 0).rotate(this.shape + this.rotation);
        this.tr.add(this.center);

        this.br = createVector(this.radius, 0).rotate(-this.shape + this.rotation);
        this.br.add(this.center);
        
        this.bl = createVector(this.radius, 0).rotate(this.shape + PI + this.rotation);
        this.bl.add(this.center);
        
        this.tl = createVector(this.radius, 0).rotate(-this.shape + PI + this.rotation);
        this.tl.add(this.center);
        

        this.borders = [];
        this.borders.push(new Line(this.tr.x, this.tr.y, this.br.x, this.br.y))
        this.borders.push(new Line(this.br.x, this.br.y, this.bl.x, this.bl.y))
        this.borders.push(new Line(this.bl.x, this.bl.y, this.tl.x, this.tl.y))
        this.borders.push(new Line(this.tl.x, this.tl.y, this.tr.x, this.tr.y))
    }

    show(r = 128, g = 128, b = 128, a = 255, strokeW = 1, strokeR = 0, strokeG = 0, strokeB = 0, showFront = true) { // DRAWS THE RECT
        if(showFront) {
            this.borders[0].show(4, 255, 0, 0);
        }
        fill(r, g, b, a);
        strokeWeight(strokeW);
        stroke(strokeR, strokeG, strokeB);
        beginShape();
        vertex(this.tr.x, this.tr.y);
        vertex(this.br.x, this.br.y);
        vertex(this.bl.x, this.bl.y);
        vertex(this.tl.x, this.tl.y);
        endShape(CLOSE);
    }

    move(_centerX=(this.center.x), _centerY=(this.center.x), _rotation=(this.rotation)) { // MOVES THE RECT TO ANOTHER POSITION
        this.center = createVector(_centerX, _centerY);
        this.rotation = _rotation;
        this.updatePoints();
    }

    isColliding(shape) { // CHECKS WETHER A LINE IS COLLIDING
        if(shape instanceof Line) {
            let coll = false;
            for(let i = 0; i < this.borders.length; i++) {
                if(this.borders[i].isColliding(shape))
                    coll = true;
            }
            return coll;
        } else {
            console.log("error, collision not implemented yet!")
            return false;
        }
    }

    toString() {
        return 'r: $(this.center.x), $(this.center.y) : $(this.radius), $(this.shape), $(this.rotation);'
    }
}