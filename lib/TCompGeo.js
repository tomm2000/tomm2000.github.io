//========================================//
// LIBRARY WITH COMPOUND SHAPES
// REQUIRES p5.js, TPrimGeo.js
//========================================//

class CollisionRect {
    constructor(_centerX, _centerY, _radius, _shape, _rotation=0) {
        this.center = createVector(_centerX, _centerY);
        this.radius = _radius;
        this.shape = _shape;
        this.rotation = createVector(1, 0).rotate(_rotation);

        this.updatePoints();
    }

    updatePoints() {
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

    showAuto() {
        strokeWeight(4)
        stroke(255, 0, 0)
        this.borders[0].show();
        this.borders[0].showAuto();
        this.borders[1].showAuto();
        this.borders[2].showAuto();
        this.borders[3].showAuto();
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