'use strict';

// Renders the imgs to the gallery instead of typing :)
function renderImgs() {
    var strHTML = gImgs.map(img => {
        return `<img onclick="onImageClicked(this.dataset.id)" data-id="${img.id}" src="./${img.url}"></img>`;
    })
    document.querySelector('.gallery-container').innerHTML = strHTML.join('');
};


var gImgs = [
    { id: 1, url: 'images/meme-imgs/1.jpg', keywords: ['angry', 'trump', 'politics', 'hand'] },
    { id: 2, url: 'images/meme-imgs/2.jpg', keywords: ['dog', 'cute', 'kiss', 'puppy'] },
    { id: 3, url: 'images/meme-imgs/3.jpg', keywords: ['dog', 'cute', 'baby', 'puppy', 'sleep'] },
    { id: 4, url: 'images/meme-imgs/4.jpg', keywords: ['cat', 'cute', 'sleep', 'tired', 'computer'] },
    { id: 5, url: 'images/meme-imgs/5.jpg', keywords: ['baby', 'cute', 'fist'] },
    { id: 6, url: 'images/meme-imgs/6.jpg', keywords: ['professor', 'hair', 'hands', 'funny'] },
    { id: 7, url: 'images/meme-imgs/7.jpg', keywords: ['baby', 'funny', 'surprised', 'cute'] },
    { id: 8, url: 'images/meme-imgs/8.jpg', keywords: ['wonka', 'smile', 'think', 'hat'] },
    { id: 9, url: 'images/meme-imgs/9.jpg', keywords: ['baby', 'evil smile', 'evil hand rub'] },
    { id: 10, url: 'images/meme-imgs/10.jpg', keywords: ['obama', 'politics', 'laugh', 'smile'] },
    { id: 11, url: 'images/meme-imgs/11.jpg', keywords: ['boxers', 'kiss', 'sports', 'weird'] },
    { id: 12, url: 'images/meme-imgs/12.jpg', keywords: ['wwyd', 'haim hecht', 'point', 'you'] },
    { id: 13, url: 'images/meme-imgs/13.jpg', keywords: ['salute', 'cheers', 'drink', 'congrats'] },
    { id: 14, url: 'images/meme-imgs/14.jpg', keywords: ['glasses', 'face', 'look', 'aw'] },
    { id: 15, url: 'images/meme-imgs/15.jpg', keywords: ['loser', 'zero', 'shame'] },
    { id: 16, url: 'images/meme-imgs/16.jpg', keywords: ['picard', 'face palm', 'laugh'] },
    { id: 17, url: 'images/meme-imgs/17.jpg', keywords: ['putin', 'politics', 'two', 'hands'] },
    { id: 18, url: 'images/meme-imgs/18.jpg', keywords: ['buzz lightyear', 'toy story', 'horizon'] },
    { id: 19, url: 'images/meme-imgs/19.jpg', keywords: ['wtf', 'shout', 'blame', 'look'] },
    { id: 20, url: 'images/meme-imgs/20.jpg', keywords: ['world', 'nature', 'women', 'smile'] },
    { id: 21, url: 'images/meme-imgs/21.jpg', keywords: ['hands', 'dr evil', 'double quote'] },
    { id: 22, url: 'images/meme-imgs/22.jpg', keywords: ['dance', 'funny', 'kids', 'happy'] },
    { id: 23, url: 'images/meme-imgs/23.jpg', keywords: ['trump', 'politics', 'teeth', 'face'] },
    { id: 24, url: 'images/meme-imgs/24.jpg', keywords: ['dog', 'stretch'] },
    { id: 25, url: 'images/meme-imgs/25.jpg', keywords: ['oprah', 'happy', 'win', 'smile', 'women'] }
];
