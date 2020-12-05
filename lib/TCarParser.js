// THIS LIBRARY IS USED TO PARSE ARRAY TEXT DATA INTO .tcar DATA (stored in carData), AND VICE-VERSA
// setAndDownloadData(tGeoWriter(array)); <- TO DOWNLOAD .tgeo DATA, REQUIRES TWriter

const CAR_INFO = [
        '//ra: [num] (radius)',
        '//sh: [num] (shape)',
        '//ms: [num] (max speed)',
        '//ac: [num] (acceleration)',
        '//fr: [num] (friction)',
        '//sp: [num] (steer power)',
        '//bp: [num] (brake power)',
        '//cr|cg|cb|ca: [0-255] (color red|green|blue|alpha)',
                ]
const ID_LENGTH = 2; // how long is a data type declaration, ex("c:" to declare a circle is 1 length)

// calculates the geo data, and return
function getCarData() {
    return tCarReader(getCompleteData());
}

// takes array text as input, outputs geo data array
function tCarReader(input) {

    let carData = { // stored car data
        radius: undefined,
        shape: undefined,
        maxSpeed: undefined,
        acceleration: undefined,
        friction: undefined,
        steerPower: undefined,
        brakePower: undefined,
        color: {
            red: undefined,
            green: undefined,
            blue: undefined,
            alpha: undefined,
        },
    };

    let maxLines = input.length;
    for(let i = 0; i < maxLines; i++) {

        let id = input[i].substring(0, ID_LENGTH);
        if(id == '//') {
            continue;
        }

        let n = ID_LENGTH;
        let m = input.length -2;
        while(input[i].charAt(n) == ' ' || input[i].charAt(n) == ':') {
            n++;
        }

        let val = input[i].substring(n, m);

        switch(id) {
            case 'ra':
                carData.radius = parseInt(val);
                break;
            case 'sh':
                carData.shape = parseInt(val);
                break;
            case 'ms':
                carData.maxSpeed = parseInt(val);
                break;
            case 'ac':
                carData.acceleration = parseInt(val);
                break;
            case 'fr':
                carData.friction = parseInt(val);
                break;
            case 'sp':
                carData.steerPower = parseInt(val);
                break;
            case 'bp':
                carData.brakePower = parseInt(val);
                break;
            case 'cr':
                carData.color.red = parseInt(val);
                break;
            case 'cg':
                carData.color.green = parseInt(val);
                break;
            case 'cb':
                carData.color.blue = parseInt(val);
                break;
            case 'ca':
                carData.color.alpha = parseInt(val);
                break;
        }
    }
    return carData;
}

// takes as input a tcar object and parses it into an array of text
function tCarWriter(input = this.carData) {
    let output = [...CAR_INFO];
    output.push('ra: '+ input.radius);
    output.push('sh: '+ input.shape);
    output.push('ms: '+ input.maxSpeed);
    output.push('ac: '+ input.acceleration);
    output.push('fr: '+ input.friction);
    output.push('sp: '+ input.steerPower);
    output.push('bp: '+ input.brakePower);
    output.push('cr: '+ input.color.red);
    output.push('cg: '+ input.color.green);
    output.push('cb: '+ input.color.blue);
    output.push('ca: '+ input.color.alpha);
    return output;
}