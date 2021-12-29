export const utilsService = {
    getRandomColor,
    getRandomName,
    getRandomInt,
    generateId,
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
        randIdx = Math.floor(Math.random()*str.length);
        res += str.charAt(randIdx);
    }
    return res;
}