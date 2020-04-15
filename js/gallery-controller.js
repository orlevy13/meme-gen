'use strict';

// Renders search terms randomly
function renderSearchKeywords() {
    const elList = document.querySelector('.search-terms');
    const elHiddenList = document.querySelector('.hidden-search-terms')
    var availabeKeywords = getAvailableKeywords();
    var fontSize;
    var strHTML = '';
    var strHTMLhidden = '';

    for (let i = 0; i < 20; i++) {
        fontSize = getRandomInt(12, 60);
        var idx = getRandomInt(0, availabeKeywords.length - 1)
        if (i >= 5) {
            // Only 5 words shown at all times
            strHTMLhidden += `<li onclick="onSearch('${availabeKeywords[idx]}')"
                style="font-size: ${fontSize}px">${availabeKeywords[idx]}</li>`;
            // to avoid repetition
            availabeKeywords.splice(idx, 1)
        } else strHTML += `<li onclick="onSearch('${availabeKeywords[idx]}')"
              style="font-size: ${fontSize}px">${availabeKeywords[idx]}</li>`;
    }
    elList.innerHTML = strHTML;
    elHiddenList.innerHTML = strHTMLhidden;
}

// Toggles the expanded search terms display
function toggleKeywords(elBtn) {
    document.querySelector('.hidden-search-terms').classList.toggle('hide');
    elBtn.innerText = (elBtn.innerText === 'Show more') ? 'Show less' : 'Show more';
}

// Renders input field to keyword searched
function renderSearchInput(keyword) {
    document.querySelector('.search-input').value = keyword;
    document.body.style = ('cursor: wait;');
    setTimeout(() => {
        document.body.style = ('cursor:;');
    }, 800);
}

// Search for keyword match,display matching images, if nothing found, display all
function onSearch(keyword) {
    renderSearchInput(keyword);//if user clicked and not typed
    keyword = keyword.toLowerCase().trim();
    setImgsForDisplay(keyword);
    const images = getImages();
    const isNothingFound = images.every(img => img.isHidden);
    if (isNothingFound) setAllImgsForDisplay();
    renderImgs();
}

// Translates menu, toggles screen 'hidden' att
function toggleMenu() {
    document.querySelector('.main-nav').classList.toggle('display-menu');
    document.querySelector('.screen').toggleAttribute('hidden');
}

// Revealing the editor and hiding the main page
function showEditor() {
    document.querySelector('.meme-editor').style = ('display: flex;');
    document.querySelector('.main-page').style = ('display:none;');
}

// The opposite of showEditor()
function hideEditor() {
    document.querySelector('.meme-editor').style = ('display: none;');
    document.querySelector('.main-page').style = ('display: block;');
    // closing the menu also
    document.querySelector('.main-nav').classList.remove('display-menu');
    document.querySelector('.screen').hidden = true;
    document.querySelector('.search-bar').scrollIntoView({
        behavior: 'smooth'
    });

}

// Renders the imgs to the gallery
function renderImgs() {
    const imgs = getImages();
    var strHTML = imgs.map(img => {
        if (img.isHidden) return;
        return `<img onclick="onImageClicked(this.dataset.id)" data-id="${img.id}" src="./${img.url}"></img>`;
    })
    document.querySelector('.gallery-container').innerHTML = strHTML.join('');
};

// Renders the options to datalist
function renderSearchOptions() {
    var addedKeywords = [];
    const imgs = getImages();
    var strHTML = imgs.map(img => {
        return img.keywords.map(word => {
            if (addedKeywords.includes(word)) return;
            addedKeywords.push(word);
            return `<option value="${word}">${word}</option>`;
        })
    })
    const elDatalist = document.querySelector('#keywords');
    elDatalist.innerHTML = strHTML.join('');
}

function scrollToAbout() {
    document.querySelector('.me').scrollIntoView({
        behavior: 'smooth'
    });
}