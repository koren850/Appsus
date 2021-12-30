import { storageService } from '../../../services/storage.service.js'
import { utilsService } from '../../../services/utils.service.js'
export const NoteService = {
    query,
    addNote,
    deleteNote,
    duplicateNote,
    updateNote
}

const KEY = 'keepsDB';

const gNotes = [
    { id: utilsService.generateId(), type: "NoteTxt", isPinned: true, info: { txt: "Fullstack Me Baby!" }, style: { backgroundColor: "#0fd777" } },
    { id: utilsService.generateId(), type: "NoteImg", isPinned: true, info: { url: "https://i.natgeofe.com/n/abf58ec8-ac78-4108-adbe-918fa5bda2e5/mountain-gorilla_2x3.jpg", title: "Bobi and Me" }, style: { backgroundColor: "#06760d" } },
    { id: utilsService.generateId(), type: "NoteTodos", isPinned: true, info: { label: "Get my stuff together", todos: [{ txt: "Driving liscence", done: false }, { txt: "Coding power", done: false }] }, style: { backgroundColor: "#09876d" } },
    { id: utilsService.generateId(), type: 'NoteVideo', isPinned: true, info: { url: 'https://www.youtube.com/embed/tMDw57CWH7U' }, style: { backgroundColor: "#34569d" } }
];

function query(filterBy = null) {
    let notes = _loadFromStorage()
    if (!notes || !notes.length) {
        notes = gNotes
        _saveToStorage(notes)
        console.log('from json')
    }
    else console.log('from storage')
    if (!filterBy) return Promise.resolve({ notes: notes })
    const filteredNotes = _getFilteredNotes(notes, filterBy)
    console.log(filteredNotes)
    return Promise.resolve({ notes: filteredNotes, ctg: filterBy.ctg })

}
function _getFilteredNotes(notes, filterBy) {
    return notes.filter(note => note.type === filterBy.ctg)
}



function addNote(ctg, text, url, imgTitle, listLabel, todo, color) {
    if (todo && todo.length) var todos = todo.map(txt => ({ txt: txt, doneAt: false }))
    let note;
    if (ctg === 'NoteTxt') note = { id: utilsService.generateId(), type: 'NoteTxt', isPinned: false, info: { txt: text }, style: { backgroundColor: color } };
    if (ctg === 'NoteImg') note = { id: utilsService.generateId(), type: 'NoteImg', isPinned: false, info: { url: url, title: imgTitle }, style: { backgroundColor: color } };
    if (ctg === 'NoteVideo') note = { id: utilsService.generateId(), type: 'NoteVideo', isPinned: false, info: { url: url }, style: { backgroundColor: color } }
    if (ctg === 'NoteTodos') note = { id: utilsService.generateId(), type: 'NoteTodos', isPinned: false, info: { label: listLabel, todos: todos }, style: { backgroundColor: color } };
    let notes = _loadFromStorage();
    notes.unshift(note);
    _saveToStorage(notes);
}

function updateNote(id, ctg, text, url, imgTitle, listLabel, todo, color) {
    console.log(id)
    if (todo && todo.length) var todos = todo.map(txt => ({ txt: txt, doneAt: null }))
    let note;
    let idx = getNoteById(id)
    if (ctg === 'NoteTxt') note = { id: utilsService.generateId(), type: 'NoteTxt', isPinned: false, info: { txt: text }, style: { backgroundColor: color } };
    if (ctg === 'NoteImg') note = { id: utilsService.generateId(), type: 'NoteImg', isPinned: false, info: { url: url, title: imgTitle }, style: { backgroundColor: color } };
    if (ctg === 'NoteVideo') note = { id: utilsService.generateId(), type: 'NoteVideo', isPinned: false, info: { url: url }, style: { backgroundColor: color } }
    if (ctg === 'NoteTodos') note = { id: utilsService.generateId(), type: 'NoteTodos', isPinned: false, info: { label: listLabel, todos: todos }, style: { backgroundColor: color } };
    let notes = _loadFromStorage();
    notes.splice(idx.currIdx, 1, note)
    _saveToStorage(notes);
}


function deleteNote(id) {
    console.log(getNoteById(id))
    const noteData = getNoteById(id)
    const notes = _loadFromStorage()
    notes.splice(noteData.currIdx, 1)
    _saveToStorage(notes)
}



function duplicateNote(id) {
    const noteData = getNoteById(id)
    noteData.note.id = utilsService.generateId()
    const notes = _loadFromStorage()
    notes.splice(noteData.currIdx, 0, noteData.note)
    _saveToStorage(notes)
}

function getNoteById(noteId) {
    const notes = _loadFromStorage()
    let currIdx;
    var note = notes.find((note, idx) => {
        if (noteId === note.id) {
            currIdx = idx
        }
        return noteId === note.id
    })
    return ({ note, currIdx })
}


function _saveToStorage(items) {
    storageService.saveToStorage(KEY, items)
}
function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}
