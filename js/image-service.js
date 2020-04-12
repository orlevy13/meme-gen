'use strict';

// Renders the imgs to the gallery instead of typing :)
function renderImgs() {
    var strHTML = gImgs.map(img => {
        if (img.isHidden) return;
        return `<img onclick="onImageClicked(this.dataset.id)" data-id="${img.id}" src="./${img.url}"></img>`;
    })
    document.querySelector('.gallery-container').innerHTML = strHTML.join('');
};

// Renders the options to datalist
function renderOptions() {
    var addedKeywords = [];
    var strHTML = gImgs.map(img => {
        return img.keywords.map(word => {
            if (addedKeywords.includes(word)) return;
            addedKeywords.push(word);
            return `<option value="${word}">${word}</option>`;
        })
    })
    const elDatalist = document.querySelector('#keywords');
    elDatalist.innerHTML = strHTML.join('');
}

function getImages() {
    return gImgs;
};

// Filters the images that matches the keyword,entirely or partially
function setImgsForDisplay(keyword) {
    gImgs.forEach(img => {
        img.isHidden = true;
        var isMatch = img.keywords.some(word => {
            return (word.substr(0, keyword.length) === keyword)
        })
        if (isMatch) {
            img.isHidden = false;
            return;
        }
    })
}

// Enables display for all imgs
function setAllImgsForDisplay() {
    gImgs.forEach(img => img.isHidden = false);
}

var gImgs = [
    { isHidden: false, id: 1, url: 'images/meme-imgs/1.jpg', keywords: ['angry', 'trump', 'politics', 'hand'] },
    { isHidden: false, id: 2, url: 'images/meme-imgs/2.jpg', keywords: ['dog', 'cute', 'kiss', 'puppy'] },
    { isHidden: false, id: 3, url: 'images/meme-imgs/3.jpg', keywords: ['dog', 'cute', 'baby', 'puppy', 'sleep'] },
    { isHidden: false, id: 4, url: 'images/meme-imgs/4.jpg', keywords: ['cat', 'cute', 'sleep', 'tired', 'computer'] },
    { isHidden: false, id: 5, url: 'images/meme-imgs/5.jpg', keywords: ['baby', 'cute', 'fist'] },
    { isHidden: false, id: 6, url: 'images/meme-imgs/6.jpg', keywords: ['professor', 'hair', 'hands', 'funny'] },
    { isHidden: false, id: 7, url: 'images/meme-imgs/7.jpg', keywords: ['baby', 'funny', 'surprised', 'cute'] },
    { isHidden: false, id: 8, url: 'images/meme-imgs/8.jpg', keywords: ['wonka', 'smile', 'think', 'hat'] },
    { isHidden: false, id: 9, url: 'images/meme-imgs/9.jpg', keywords: ['baby', 'evil', 'smile', 'hand', 'rub'] },
    { isHidden: false, id: 10, url: 'images/meme-imgs/10.jpg', keywords: ['obama', 'politics', 'laugh', 'smile'] },
    { isHidden: false, id: 11, url: 'images/meme-imgs/11.jpg', keywords: ['boxers', 'kiss', 'sports', 'weird'] },
    { isHidden: false, id: 12, url: 'images/meme-imgs/12.jpg', keywords: ['wwyd', 'what', 'haim', 'hecht', 'point', 'you'] },
    { isHidden: false, id: 13, url: 'images/meme-imgs/13.jpg', keywords: ['salute', 'cheers', 'drink', 'congrats'] },
    { isHidden: false, id: 14, url: 'images/meme-imgs/14.jpg', keywords: ['glasses', 'face', 'look', 'aw'] },
    { isHidden: false, id: 15, url: 'images/meme-imgs/15.jpg', keywords: ['loser', 'zero', 'shame'] },
    { isHidden: false, id: 16, url: 'images/meme-imgs/16.jpg', keywords: ['picard', 'face', 'palm', 'laugh'] },
    { isHidden: false, id: 17, url: 'images/meme-imgs/17.jpg', keywords: ['putin', 'politics', 'two', 'hands'] },
    { isHidden: false, id: 18, url: 'images/meme-imgs/18.jpg', keywords: ['buzz', 'lightyear', 'toy', 'story', 'horizon'] },
    { isHidden: false, id: 19, url: 'images/meme-imgs/19.jpg', keywords: ['wtf', 'shout', 'blame', 'look'] },
    { isHidden: false, id: 20, url: 'images/meme-imgs/20.jpg', keywords: ['world', 'nature', 'women', 'smile'] },
    { isHidden: false, id: 21, url: 'images/meme-imgs/21.jpg', keywords: ['hands', 'dr', 'evil', 'double', 'quote'] },
    { isHidden: false, id: 22, url: 'images/meme-imgs/22.jpg', keywords: ['dance', 'funny', 'kids', 'happy'] },
    { isHidden: false, id: 23, url: 'images/meme-imgs/23.jpg', keywords: ['trump', 'politics', 'teeth', 'face'] },
    { isHidden: false, id: 24, url: 'images/meme-imgs/24.jpg', keywords: ['dog', 'stretch'] },
    { isHidden: false, id: 25, url: 'images/meme-imgs/25.jpg', keywords: ['oprah', 'happy', 'win', 'smile', 'women'] }
];