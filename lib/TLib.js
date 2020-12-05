function vectorDistance(v1, v2) {
    return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2));
}

function minDistance(center, shapes) {
    let minDist = Number.MAX_SAFE_INTEGER;

    for(let i = 0; i < shapes.length; i++) {
        let d = vectorDistance(center, shapes[i].pos) - (shapes[i].radius)
        minDist = Math.min(d, minDist);
    }

    return minDist;
}

function textSettings(_size = 10, _color = 0, _strokeW = 0, _stroke = 0) {
    textSize(_size);
    fill(_color);
    strokeWeight(_strokeW);
    stroke(_stroke);

    return null;
}

function clamp(n, a, b) {
    if(n < Math.min(a,b)) {
        n = Math.min(a,b);
    } else if(n > Math.max(a,b)) {
        n = Math.max(a,b);
    }
    return n;
}