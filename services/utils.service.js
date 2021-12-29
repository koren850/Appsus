export const utilsService = {
    getRandomColor,
    getRandomName,
    getRandomInt,
    generateId,
    makeLorem
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomName(length = 4) {
    var str = 'abcdefghijklmnopqrstuvwxyz';
    var randomWord = '';
    for (var i = 0; i < length; i++) {
        var randIdx = parseInt(Math.random() * str.length)
        randomWord += str.charAt(randIdx);
        if (!i) randomWord = randomWord.toUpperCase();
    }
    return randomWord
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateId(genLength = 5, str = 'abcdefghijklmnopqrst0123456789uvwxyzABCDEFGHIJKLMNOPQRSTUVWKYZ') {
    var res = '';
    var randIdx = 0;
    for (var i = 0; i < genLength; i++) {
        randIdx = Math.floor(Math.random() * str.length);
        res += str.charAt(randIdx);
    }
    return res;
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = '';
    while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}