'use strict';

var gKeywords = { 'happy': 12, 'funny puk': 1 };
var gMeme;


// For the controller
function getMeme() {
    return gMeme;
}

// Returns the image url, under the premise that each image name is its ID
function getImgSrc(id) {
    return `images/meme-imgs/${id}.jpg`;
}

// Sets the txt of the line to the value passed in
function setLineTxt(val) {
    gMeme.lines[gMeme.selectedLineIdx].txt = val;
}

// Sets the gMeme to new obj with the img selected
function setCurrMeme(id) {
    gMeme = {
        selectedImgId: id,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'Text here',
                size: 40,
                font: 'Impact',
                align: 'left',
                fillColor: 'white',
                strokeColor: 'black',
                x: gCanvas.width / 2 - 80,
                y: 50
            },
            {
                txt: 'Another text',
                size: 40,
                font: 'Impact',
                align: 'left',
                fillColor: 'white',
                strokeColor: 'black',
                x: gCanvas.width / 2 - 80,
                y: null
            }
        ],
        lineCount: 2 // TODO: Increment this with each line added
    };
}

// Sets the Y of the second line
function setSecondLineY() {
    gMeme.lines[1].y = gCanvas.height - 20;
}

// Updates the font size for the selected line
function changeFontSize(val) {
    gMeme.lines[gMeme.selectedLineIdx].size += val;
}

// Updates the y axis coordinate
function moveLine(val) {
    gMeme.lines[gMeme.selectedLineIdx].y += val;
}

// Updates the selected line index(currently loops through)
function changeLine() {
    if (gMeme.lineCount === 1) {
        gMeme.selectedLineIdx = 0;
        return; // if theres 1 line, change to that line
    }
    if (gMeme.selectedLineIdx === gMeme.lineCount - 1) gMeme.selectedLineIdx = 0; // If its the last line
    else gMeme.selectedLineIdx++;
}

// Sets the fill color to selected line
function changeFillColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].fillColor = color;
}

// Sets the stroke color to selected line
function changeStrokeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = color;
}

// Deletes the selected line
function deleteLine() {
    if (gMeme.lineCount === 1) {
        gMeme.lines[gMeme.selectedLineIdx].txt = '';
        return; //if user tries to delete the only line exists, delete the txt inside
    };
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    gMeme.lineCount--;
    // if the line index isn't 0, decrement it, else assign 0
    if (gMeme.selectedLineIdx) gMeme.selectedLineIdx--;
    else gMeme.selectedLineIdx = 0;
}

// Adds new line, focus on new line
function addLine() {
    gMeme.lines.push(
        {
            txt: 'Text',
            size: 40,
            font: 'Impact',
            align: 'left',
            fillColor: 'white',
            strokeColor: 'black',
            x: 250,
            y: 150
        }
    )
    gMeme.lineCount++;
    gMeme.selectedLineIdx = gMeme.lineCount - 1;// The line added gets the focus
};

// Changes the font for all lines
function changeFont(font) {
    gMeme.lines.forEach(line => line.font = font);
}

// Sets the selected line to the line clicked
function selectLine(offsetX, offsetY) {
    const idx = gMeme.lines.findIndex(line => {
        return offsetX > line.x
            && offsetY < line.y + line.size
    });
    if (idx === -1) return;
    gMeme.selectedLineIdx = idx;
}