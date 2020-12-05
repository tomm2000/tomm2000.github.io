// THIS LIBRARY IS USED TO PARSE ARRAY TEXT DATA INTO .tgeo DATA (stored in geoData), AND VICE-VERSA
// REQUIRES TGeo.js
// setAndDownloadData(tGeoWriter(array)); <- TO DOWNLOAD .tgeo DATA, REQUIRES TWriter

const GEO_INFO = [
                    '/point => p: x, y;',
                    '/line => l: x1, y1 : x2, y2;',
                    '/circle => c: x, y : r;',
                    '/comment => / text',
                    '/'
                ]
const TYPE_LENGTH = 1; // how long is a data type declaration, ex("c:" to declare a circle is 1 length)

// calculates the geo data, and return
function getGeoData() {
    return tGeoReader(getCompleteData())
}

// takes array text as input, outputs geo data array
function tGeoReader(input) {
    let output = [];

    let maxLines = input.length;
    for(let i = 0; i < maxLines; i++) {
        switch (input[i].charAt(0)) {
            case '/':
                break;
        
            case 'p':
                let p = pointReader(input[i].substring(TYPE_LENGTH + 1, input[i].length+1));
                output.push(new Point(p.x, p.y));
                break;

            case 'l':
                let l = lineReader(input[i].substring(TYPE_LENGTH + 1, input[i].length+1));
                output.push(new Line(l[0].x, l[0].y, l[1].x, l[1].y));
                break;

            case 'c':
                let c = circleReader(input[i].substring(TYPE_LENGTH + 1, input[i].length+1));
                output.push(new Circle(c[0].x, c[0].y, c[1]));
                break;

            default:
                console.log('parse error');
                break;
        }
    }
    return output;
}

// takes as input a tgeo data array and parses it into an array of text
function tGeoWriter(input) {
    let output = [];
    output.push(GEO_INFO);
    for(let i = 0; i < input.length; i++) {
        output.push(input[i].toString());
    }
    return output;
}

// parses a line of text into point geo data [p: x,y;]
function pointReader(input) {
    let x = '';
    let c = input.charAt(0);
    let i = 0;

    while(c != ',') {
        c = input.charAt(i);
        x = x + c;
        i++;
    }

    let y = '';
    while(c != ';') {
        c = input.charAt(i);
        y = y + c;
        i++;
    }
    return createVector(parseInt(x), parseInt(y));
}

// parses a line of text into line geo data [l: x1,y1,x2,y2;]
function lineReader(input) {
    output = [];
    let c = input.charAt(0);
    let i = 0;

    let x1 = '';
    while(c != ',') {
        c = input.charAt(i);
        x1 = x1 + c;
        i++;
    }

    let y1 = '';
    while(c != ':') {
        c = input.charAt(i);
        y1 = y1 + c;
        i++;
    }

    let x2 = '';
    while(c != ',') {
        c = input.charAt(i);
        x2 = x2 + c;
        i++;
    }

    let y2 = '';
    while(c != ';') {
        c = input.charAt(i);
        y2 = y2 + c;
        i++;
    }

    return [createVector(parseInt(x1), parseInt(y1)), createVector(parseInt(x2), parseInt(y2))];
}

// parses a line of text into circle geo data [c: x,y,r;]
function circleReader(input) {
    output = [];
    let c = input.charAt(0);
    let i = 0;

    let x = '';
    while(c != ',') {
        c = input.charAt(i);
        x = x + c;
        i++;
    }

    let y = '';
    while(c != ':') {
        c = input.charAt(i);
        y = y + c;
        i++;
    }

    let r = '';
    while(c != ';') {
        c = input.charAt(i);
        r = r + c;
        i++;
    }

    return [createVector(parseInt(x), parseInt(y)), parseInt(r).toFixed(2)];
}