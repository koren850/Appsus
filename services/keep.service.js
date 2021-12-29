import { storageService } from './storage.service.js'

export const keepService = {
    gaga,
}

const KEY = 'keepsDB';

const gNotes = [
    { id: "n101", type: "note-txt", isPinned: true, info: { txt: "Fullstack Me Baby!" } },
    { id: "n102", type: "note-img", info: { url: "http://some-img/me", title: "Bobi and Me" }, style: { backgroundColor: "#00d" } },
    { id: "n103", type: "note-todos", info: { label: "Get my stuff together", todos: [{ txt: "Driving liscence", doneAt: null }, { txt: "Coding power", doneAt: 187111111 }] } }
];

function _saveToStorage(items) {
    storageService.saveToStorage(KEY, items)
}
function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}
