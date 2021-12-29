import { storageService } from '../../../services/storage.service.js'
import { utilsService } from '../../../services/utils.service.js'
export const NoteService = {
    query,
    addNote,
}

const KEY = 'keepsDB';

const gNotes = [
    { id: utilsService.generateId(), type: "NoteTxt", isPinned: true, info: { txt: "Fullstack Me Baby!" }, style: { backgroundColor: "#0fd" } },
    { id: utilsService.generateId(), type: "NoteImg", isPinned: true, info: { url: "https://i.natgeofe.com/n/abf58ec8-ac78-4108-adbe-918fa5bda2e5/mountain-gorilla_2x3.jpg", title: "Bobi and Me" }, style: { backgroundColor: "#00d" } },
    { id: utilsService.generateId(), type: "NoteTodos", isPinned: true, info: { label: "Get my stuff together", todos: [{ txt: "Driving liscence", doneAt: null }, { txt: "Coding power", doneAt: 187111111 }] }, style: { backgroundColor: "#09d" } },
    { id: utilsService.generateId(), type: 'NoteVideo', isPinned: true, info: { url: 'https://www.youtube.com/embed/tMDw57CWH7U' }, style: { backgroundColor: "#39d" } }
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


function addNote(ctg, text, url, imgTitle, listLabel, todo, color) {
    if (todo && todo.length) var todos = todo.map(txt => ({ txt: txt, doneAt: null }))
    console.log(todos)
    var note;
    if (ctg === 'NoteTxt') note = { id: utilsService.generateId(), type: 'NoteTxt', isPinned: false, info: { txt: text }, style: { backgroundColor: color } };
    if (ctg === 'NoteImg') note = { id: utilsService.generateId(), type: 'NoteImg', isPinned: false, info: { url: url, title: imgTitle }, style: { backgroundColor: color } };
    if (ctg === 'NoteVideo') note = { id: utilsService.generateId(), type: 'NoteVideo', isPinned: false, info: { url: url }, style: { backgroundColor: color } }
    if (ctg === 'NoteTodos') note = { id: utilsService.generateId(), type: 'NoteTodos', isPinned: false, info: { label: listLabel, todos: todos }, style: { backgroundColor: color } };
    let notes = _loadFromStorage();
    notes.unshift(note);
    _saveToStorage(notes);
}


function _saveToStorage(items) {
    storageService.saveToStorage(KEY, items)
}
function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}
