import { storageService } from './storage.service.js'

export const NoteService = {
    query,
}

const KEY = 'keepsDB';

const gNotes = [
    { id: "n101", type: "NoteTxt", isPinned: true, info: { txt: "Fullstack Me Baby!" } },
    { id: "n102", type: "NoteImg", info: { url: "http://some-img/me", title: "Bobi and Me" }, style: { backgroundColor: "#00d" } },
    { id: "n103", type: "NotTodos", info: { label: "Get my stuff together", todos: [{ txt: "Driving liscence", doneAt: null }, { txt: "Coding power", doneAt: 187111111 }] } }
];

function query(filterBy = null) {
    let notes = _loadFromStorage()
    if (!notes || !notes.length) {
        notes = gNotes
        _saveToStorage(notes)
        console.log('from json')
    }
    else console.log('from storage')
    if (!filterBy) return Promise.resolve(notes)
    const filteredBooks = _getFilteredBooks(notes, filterBy)
    return Promise.resolve(filteredBooks)

}

function _saveToStorage(items) {
    storageService.saveToStorage(KEY, items)
}
function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}
