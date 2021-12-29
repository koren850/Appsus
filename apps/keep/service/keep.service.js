import { storageService } from '../../../services/storage.service.js'

export const NoteService = {
    query,
}

const KEY = 'keepsDB';

const gNotes = [
    { id: "n101", type: "NoteTxt", isPinned: true, info: { txt: "Fullstack Me Baby!" } },
    { id: "n102", type: "NoteImg", info: { url: "https://i.natgeofe.com/n/abf58ec8-ac78-4108-adbe-918fa5bda2e5/mountain-gorilla_2x3.jpg", title: "Bobi and Me" }, style: { backgroundColor: "#00d" } },
    { id: "n103", type: "NoteTodos", info: { label: "Get my stuff together", todos: [{ txt: "Driving liscence", doneAt: null }, { txt: "Coding power", doneAt: 187111111 }] } },
    { id: "n103", type: 'NoteVideo', info: { url: 'https://www.youtube.com/watch?v=sGXHJvEttpE&t=13s' } }
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
