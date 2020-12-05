//========================================//
// LIBRARY WITH BASIC SHAPES
// REQUIRES p5.js
//========================================//

class Point {
    constructor(x, y) {
        this.pos = createVector(x, y);
    }
    show(red = 0, green = 0, blue = 0, alpha = 255) {
        strokeWeight(0);
        fill(red, green, blue, alpha);
        ellipse(this.pos.x, this.pos.y, 4, 4);
    }

    toString() {
        return "p: " + this.pos.x + ", " + this.pos.y + ";";
    }
}

class Line {
    constructor(x1, y1, x2, y2) {
        this.pos1 = createVector(x1, y1)
        this.pos2 = createVector(x2, y2)
    }

    show(strokeW = 2, strokeR = 0, strokeG = 0, strokeB = 0, strokeA = 255) {
        strokeWeight(strokeW);
        stroke(strokeR, strokeG, strokeB, strokeA);
        line(this.pos1.x, this.pos1.y, this.pos2.x, this.pos2.y);
    }

    toString() {
        return "l: " + this.pos1.x + ", " + this.pos1.y + " : " + this.pos2.x + ", " + this.pos2.y + ";";
    }

    isColliding(shape) {
        if(shape instanceof Line) {
            let a = this.pos1;
            let b = this.pos2;
            let c = shape.pos1;
            let d = shape.pos2;

            let denominator = ((b.x - a.x) * (d.y - c.y)) - ((b.y - a.y) * (d.x - c.x));
            let numerator1 = ((a.y - c.y) * (d.x - c.x)) - ((a.x - c.x) * (d.y - c.y));
            let numerator2 = ((a.y - c.y) * (b.x - a.x)) - ((a.x - c.x) * (b.y - a.y));

            // Detect coincident lines (has a problem, read below)
            if(denominator == 0)
                return numerator1 == 0 && numerator2 == 0;

            let r = numerator1 / denominator;
            let s = numerator2 / denominator;

            return (r >= 0 && r <= 1) && (s >= 0 && s <= 1);
        } else {
            console.log("error, collision not implemented yet!")
            return false;
        }
    }
}

class Circle {
    constructor(x, y, r) {
        this.pos = createVector(x, y);
        this.radius = r;
    }
    show(red = 200, green = 200, blue = 200, alpha = 255, strokeW = 1, strokeR = 0, strokeG = 0, strokeB = 0, strokeA = 255) {
        strokeWeight(strokeW);
        stroke(strokeR, strokeG, strokeB, strokeA)
        fill(red, green, blue, alpha);
        ellipse(this.pos.x, this.pos.y, this.radius*2);
    }
    toString() {
        return "c: " + this.pos.x + ", " + this.pos.y + " : " + Number((this.radius).toFixed(3)) + ";";
    }
}