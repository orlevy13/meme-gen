'use strict';

var gMeme;


function getMeme() {
    return gMeme;
}

// Returns the image url, under the premise that each image name is its ID
function getImgSrc(id) {
    return `images/meme-imgs/${id}.jpg`;
}

// Sets the txt of the line to the value passed in
function setLineTxt(val) {
    if (gMeme.selectedLineIdx === null) return;
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
                align: 'center',
                fillColor: 'white',
                strokeColor: 'black',
                x: gCanvas.width / 2,
                y: 50,
                lineWidth: null
            },
            {
                txt: 'Another Text',
                size: 40,
                font: 'Impact',
                align: 'center',
                fillColor: 'white',
                strokeColor: 'black',
                x: gCanvas.width / 2,
                y: null,
                lineWidth: null
            }
        ],
        lineCount: 2
    };
}

// Sets the lines width
function setLineWidth(lineIdx) {
    if (!gMeme.lineCount) return;
    const txtChars = gMeme.lines[lineIdx].txt.split('');
    const width = txtChars.length * gMeme.lines[lineIdx].size / 2.2;
    gMeme.lines[lineIdx].lineWidth = width;
}

// Sets the Y of the second line
function setSecondLineY() {
    gMeme.lines[1].y = gCanvas.height - 20;
}

// Updates the font size for the selected line
function changeFontSize(val) {
    if (!gMeme.lineCount) return;
    if (gMeme.lines[gMeme.selectedLineIdx].size <= 5 && val < 0) return;
    gMeme.lines[gMeme.selectedLineIdx].size += val;
}

// Updates the y axis coordinate
function moveLine(val) {
    if (!gMeme.lineCount) return;
    gMeme.lines[gMeme.selectedLineIdx].y += val;
}

// Updates the selected line index(currently loops through)
function changeLine() {
    if (!gMeme.lineCount) return;
    if (gMeme.lineCount === 1) {
        gMeme.selectedLineIdx = 0;
        return; // if theres 1 line, change to that line
    }
    if (gMeme.selectedLineIdx === gMeme.lineCount - 1) gMeme.selectedLineIdx = 0; // If its the last line
    else gMeme.selectedLineIdx++;
}

// Sets the fill color to selected line
function changeFillColor(color) {
    if (!gMeme.lineCount) return;
    gMeme.lines[gMeme.selectedLineIdx].fillColor = color;
}

// Sets the stroke color to selected line
function changeStrokeColor(color) {
    if (!gMeme.lineCount) return;
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = color;
}

// Deletes the selected line
function deleteLine() {
    if (!gMeme.lineCount) return;
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    gMeme.lineCount--;
    gMeme.selectedLineIdx = (gMeme.lineCount) ? 0 : null;
}

// Adds new line, focus on new line
function addLine() {
    gMeme.lines.push(
        {
            txt: 'Text',
            size: 40,
            font: 'Impact',
            align: 'center',
            fillColor: 'white',
            strokeColor: 'black',
            x: gCanvas.width / 2,
            y: gCanvas.height / 2,
            lineWidth: null
        }
    )
    gMeme.lineCount++;
    gMeme.selectedLineIdx = gMeme.lineCount - 1;// The line added gets the focus
};

// Changes the font for all lines
function changeFont(font) {
    if (!gMeme.lineCount) return;
    gMeme.lines.forEach(line => line.font = font);
}

// Sets the selected line to the line clicked
function selectLine(offsetX, offsetY) {
    const idx = getLineIdx(offsetX, offsetY);
    gCurrLineDrag = idx;
    if (idx === -1) return;
    gMeme.selectedLineIdx = idx;
}

// Returns the idx of line, if not found returns -1
function getLineIdx(x, y) {
    return gMeme.lines.findIndex(line => {
        return x > line.x - line.lineWidth / 2 &&
            x < line.x + line.lineWidth / 2 &&
            y < line.y &&
            y > line.y - line.size
    });
}

// Sets line pos to mouse pos
function dragLine(ev, lineIdx) {
    if (ev.offsetX < 2 || ev.offsetX > gCanvas.width - 2 ||
        ev.offsetY < 2 || ev.offsetY > gCanvas.height - 2) return onDragEnd();

    gMeme.lines[lineIdx].x = ev.offsetX;
    gMeme.lines[lineIdx].y = ev.offsetY;
}