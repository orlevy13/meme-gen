'use strict';

var gCanvas;
var gCtx;
var gImgAspectRatio;
var gIsMouseDown = false;
var gCurrLineDrag;


// Sets size of canvas and basic variables
function onInit() {
    renderImgs();
    renderSearchOptions();
    renderSearchKeywords();
    gCanvas = document.querySelector('#my-canvas');
    if (window.innerWidth > 600) gCanvas.width = 600;
    else gCanvas.width = 300;
    gCtx = gCanvas.getContext('2d');
    // Line below prevents scrolling on canvas
    gCanvas.addEventListener("touchmove", function (event) { event.preventDefault() });
    var canvasHammer = new Hammer(gCanvas);
    canvasHammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    // The 'if' is here to check if 'panstart' actually detected a mouseclick
    canvasHammer.on('panstart', function () { if (!gIsMouseDown) selectLine(event.offsetX, event.offsetY) });
    canvasHammer.on('pan', function () { handleTouch(event) });
    window.addEventListener('resize', resizeCanvas);
};

// Handles touch events
function handleTouch(ev) {
    if (ev.type === 'pointermove') {
        if (gCurrLineDrag === -1) return;
        dragLine(ev, gCurrLineDrag);
        drawLinesTxt();
    }
    // Equivalent of mouseup
    if (ev.type === 'pointerup') return onDragEnd();
}

// Sets the canvas size in accordance to screen size
function resizeCanvas() {
    if (window.innerWidth < 600 && gCanvas.width === 600) {
        gCanvas.width = 300;
    } else if (window.innerWidth > 600 && gCanvas.width === 300) {
        gCanvas.width = 600;
    }
    drawLinesTxt();
}

// Highlights the current line
function highlightLine() {
    const meme = getMeme();
    const line = meme.lines[meme.selectedLineIdx];
    if (!line) return;
    gCtx.beginPath()
    gCtx.strokeStyle = '#000000';
    gCtx.lineWidth = 1
    gCtx.fillStyle = '#4c4c4c4a'
    //lineWidth isn't accurate hence the weird math
    gCtx.rect(line.x - line.lineWidth * 1.1 / 2 - 10, line.y - line.size, line.lineWidth * 1.1 + 20, line.size + 10);
    gCtx.stroke();
    gCtx.fill();
}

// Draws the image of the gMeme, calcs the image aspect ratio
function drawImg() {
    let img = new Image();
    const meme = getMeme();
    img.src = getImgSrc(meme.selectedImgId);
    img.onload = () => {
        gImgAspectRatio = img.height / img.width;
        gCanvas.height = gCanvas.width * gImgAspectRatio;
        resizeCanvas();
        onSetSecondLineY();//This is here because until this moment I can't position the 
        // second line since the height of the canvas is unknown(line should be at the bottom)
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height); //img,x,y,width,height
    };
};

// Sets the second line Y axis
function onSetSecondLineY() {
    setSecondLineY();
}

// Draws text by the paramaters passed
function drawText(text, x, y, align, size, font, fill, stroke) {
    gCtx.strokeStyle = stroke;
    gCtx.lineWidth = 2;
    gCtx.fillStyle = fill;
    gCtx.font = `${size}px ${font}`;
    gCtx.textAlign = align;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
};

// Getting text input, updates model, displaying it on canvas
function onUserType(val) {
    setLineTxt(val);
    drawLinesTxt();
};

// Sets a new meme with the image and displays editor
function onImageClicked(id) {
    setCurrMeme(id);
    drawImg();
    showEditor();
    window.scroll(0, 0);
}

// Draws all lines on the canvas
function drawLinesTxt(isHighlighted = true) {
    let img = new Image();
    const meme = getMeme();
    if (!meme) return;
    const lines = meme.lines;
    img.src = getImgSrc(meme.selectedImgId);
    img.onload = () => {
        gImgAspectRatio = img.height / img.width;
        gCanvas.height = gCanvas.width * gImgAspectRatio;
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        lines.forEach((line, idx) => {
            onSetLineWidth(idx);
            drawText(line.txt, line.x, line.y, line.align, line.size, line.font, line.fillColor, line.strokeColor);
        });
        if (isHighlighted) highlightLine();
    };
}

// This sets the gMeme.lines.lineWidth, to keep track of the line size
function onSetLineWidth(lineIdx) {
    setLineWidth(lineIdx);
}

// Updates new font size in the model, Draws with new size
function onChangeFontSize(val) {
    changeFontSize(val);
    drawLinesTxt();
}

// Updates y coordinate in the model, Draws at new location
function onMoveLine(val) {
    moveLine(val);
    drawLinesTxt()
}

// Upadtes selectedLineIdx,renders input field to match line text
function onChangeLine() {
    changeLine();
    drawLinesTxt();
    renderInputField();
}

// Sets the new fill color, redraws everything
function onChangeFillColor(color) {
    changeFillColor(color);
    drawLinesTxt();
}

// Deletes selected line, redraws everything
function onDeleteLine() {
    deleteLine();
    drawLinesTxt();
    renderInputField();
}

// Adds new line
function onAddLine() {
    addLine();
    drawLinesTxt();
    renderInputField();
}

// Changes font, redraws everything
function onChangeFont(font) {
    changeFont(font);
    drawLinesTxt();
}

// Changes stroke color, redraws everything
function onChangeStrokeColor(color) {
    changeStrokeColor(color);
    drawLinesTxt();
}

// Sets selectedLine = gCurrLineDrag, Sets gIsMouseDown to true
function onStartDrag(ev) {
    selectLine(ev.offsetX, ev.offsetY);
    gIsMouseDown = true;
    drawLinesTxt();
}

// Sets the line coordinates same as mouse coordinates
function onDrag(ev) {
    if (!gIsMouseDown || gCurrLineDrag === -1) return;
    gCanvas.style = ('cursor: move;')
    dragLine(ev, gCurrLineDrag);
    drawLinesTxt();
}

//Trigger-body.onmouseup, Sets the currLineDrag to -1 and gIsMouseDown false,renders input field
function onDragEnd() {
    gCurrLineDrag = -1;
    gIsMouseDown = false;
    if (!getMeme()) return;
    renderInputField();
    gCanvas.style = ('cursor:;')
}

// Downloads the image
function onDownload(elLink) {
    const imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent;
}

//Prepares image for upload/download and shows buttons
function onPublish(elForm, ev) {
    ev.preventDefault();
    drawLinesTxt(false);
    const elLoader = document.querySelector('.sk-circle');
    elLoader.classList.toggle('hide');
    setTimeout(() => {
        uploadImg(elForm, ev);
        elLoader.classList.toggle('hide');
    }, 2000);

    setTimeout(() => {
        document.querySelector('.download-button').hidden = true;
        document.querySelector('.share-facebook').hidden = true;
    }, 8000);
}

// Renders input field with the current line text
function renderInputField() {
    const elInput = document.querySelector('input[name="lineText"]');
    const meme = getMeme();
    if (!meme.lineCount) {
        elInput.value = '';
        elInput.disabled = true;
        elInput.style = ('background-color: #929292;')
        return;
    }
    elInput.disabled = false;
    elInput.style = ('background-color: #ffffff;');
    elInput.value = meme.lines[meme.selectedLineIdx].txt;
    elInput.focus();
}