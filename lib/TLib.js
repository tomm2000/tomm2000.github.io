//========================================//
// BASE LIBRARY WITH GENERAL FUNCTIONS
//========================================//

function vectorDistance(v1, v2) { // returns the distance between 2 vectors
    return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2));
}

function clamp(n, a, b) { // clamps a number between 2 others
    if(n < Math.min(a,b)) {
        n = Math.min(a,b);
    } else if(n > Math.max(a,b)) {
        n = Math.max(a,b);
    }
    return n;
}

//========================================//
// THE FOLLOWING FUNCTIONS REQUIRE P5.js
//========================================//
function textSettings(_size = 10, _color = 0, _strokeW = 0, _stroke = 0) { // various text settings merged into 1 functions
    textSize(_size);
    fill(_color);
    strokeWeight(_strokeW);
    stroke(_stroke);

    return null;
}
