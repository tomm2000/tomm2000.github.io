//=======================================================================================================================//
// THIS LIBRARY IS USED TO STORE DATA INTO A FILE AND DOWNLOAD IT
// THE RAW TEXT WILL BE STORED IN rawData
//=======================================================================================================================//

var rawData = ''; // raw text data to download

// downloads the rawData into a file
function downloadData(filename) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(rawData));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

// parses an array of strings into a single string (with multiple lines)
function ArrayToString(input) {
    let output = '';
    for(let i = 0; i < input.length; i++) {
        output = output + input[i] + '\n';
    }
    return output;
}

// parses an array and downloads
function setAndDownloadData(input, fileName = 'car.tcar') {
    rawData = ArrayToString(input);
    downloadData(fileName);
}

// directly downlaods the input text
function setAndDownloadRawData(input, fileName = 'car.tcar') {
    rawData = input;
    downloadData(fileName);
}

// sets the raw data
function setRawData(input) {
    rawData = input;
}