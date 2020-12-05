//========================================//
// LIBRARY WITH COMPOUND SHAPES
// REQUIRES p5.js, TPrimGeo.js
//========================================//

class CollisionRect {
    constructor(_centerX, _centerY, _radius, _shape, _rotation=0) {
        this.center = createVector(_centerX, _centerY);
        this.radius = _radius;
        this.shape = _shape;
        this.rotation = _rotation;

        this.updatePoints();
    }

    updatePoints() {
        let tr = createVector(this.radius, 0).rotate(this.shape + this.rotation);
        tr.add(this.center);

        let br = createVector(this.radius, 0).rotate(-this.shape + this.rotation);
        br.add(this.center);
        
        let bl = createVector(this.radius, 0).rotate(this.shape + PI + this.rotation);
        bl.add(this.center);
        
        let tl = createVector(this.radius, 0).rotate(-this.shape + PI + this.rotation);
        tl.add(this.center);
        

        this.borders = [];
        this.borders.push(new Line(tr.x, tr.y, br.x, br.y))
        this.borders.push(new Line(br.x, br.y, bl.x, bl.y))
        this.borders.push(new Line(bl.x, bl.y, tl.x, tl.y))
        this.borders.push(new Line(tl.x, tl.y, tr.x, tr.y))
    }

    showAuto() {
        strokeWeight(4)
        stroke(255, 0, 0)
        this.borders[0].show();
        this.borders[0].showAuto();
        this.borders[1].showAuto();
        this.borders[2].showAuto();
        this.borders[3].showAuto();
    }
    
    show() {
        this.borders[0].show();
        this.borders[1].show();
        this.borders[2].show();
        this.borders[3].show();
    }

    move(_centerX=(this.center.x), _centerY=(this.center.x), _rotation=(this.rotation)) {
        this.center = createVector(_centerX, _centerY);
        this.rotation = _rotation;
        this.updatePoints();
    }

    toString() {
        return 'r: $(this.center.x), $(this.center.y) : $(this.radius), $(this.shape), $(this.rotation);'
    }

    isLineColliding(line) {
        let coll = false;
        for(let i = 0; i < this.borders.length; i++) {
            if(this.borders[i].IsIntersectingLine(line))
                coll = true;
        }
        return coll;
    }
}