//=======================================================================================================================//
// THIS LIBRARY IS USED TO READ -TEXT- FROM A FILE
// THE RAW TEXT WILL BE STORED IN rawData, AND THE TEXT LINE STORED IN AN ARRAY WILL BE STORED IN completedData
// dataRead IS true IF THE FILE HAS BEEN READ, FALSE OTHERWISE (DEFAULT)
// <input type="file" onchange="readFile(this)"> THIS MUST BE ADDED IN THE BODY OF HTML FILE
//=======================================================================================================================//

var rawData = '';   // raw text data
var completeData = []; // text array data
var dataRead = false; // has the file been read already?

// returns the raw data
function getRawData() {
    return rawData;
}

// calculates the array data and returns it
function getCompleteData() {
    completeData = stringToArray(rawData);
    return completeData;
}

// reads the file data, and stores it as raw text data in rawData
function readFile(input) {
    let file = input.files[0];
  
    let reader = new FileReader();
  
    reader.readAsText(file);
  
    reader.onload = function() {
      rawData = reader.result;
      dataRead = true;
    };
  
    reader.onerror = function() {
      console.log(reader.error);
    };
}

// counts how many lines are in a raw text
function countLines(input) {
    let c = 1;
    for(let i = 0; i < input.length; i++) {
        if(input.charAt(i) == '\n')
            c++;
    }
    return c;
}

// transforms raw text data into array text
function stringToArray(input) {
    let lastChar = 0;
    let output = [];

    for(let i = 0; i < input.length; i++) {
        if(input.charAt(i) == '\n'){
            output.push(input.substring(lastChar, i))
            lastChar = i+1;
        }
    }
    return output;
}
