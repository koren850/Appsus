import { storageService } from '../../../services/storage.service.js'
import { utilsService } from '../../../services/utils.service.js'
export const NoteService = {
    query,
    addNote,
    deleteNote,
    duplicateNote,
    updateNote,
    toggleTodoDone,
    _fillterByText,
    togglePin
}

const KEY = 'notesDB';

const gNotes = [{ id: "FKjVb", type: "NoteTxt", isPinned: false, info: { txt: "צ'ימיצ'נגה" }, style: { backgroundColor: "#2a48a2" } }, { id: "jgESj", type: "NoteVideo", isPinned: false, info: { url: "https://www.youtube.com/watch?v=8miIgQqz8Co", title: "איך מכינים קרוטונים" }, style: { backgroundColor: "#809631" } }, { id: "JO7Rz", type: "NoteTxt", isPinned: false, info: { txt: "!יקיר האח" }, style: { backgroundColor: "#c392a4" } }, { id: "Wx3ra", type: "NoteTxt", isPinned: false, info: { txt: "דרבוקה (לפעמים נקרא גם טרבוקה) היא סוג של תוף יד. הדרבוקה היא כלי הקשה מהמזרח התיכון, השייך למשפחת תופי הגביע או הכד. מקור השם דרבוקה בא מהשפה הערבית בשם \"דראב\" (\"להכות\") הדרבוקות היו עשויות מחרס ועליו מתוחה פיסת עור, אך עם הזמן החלו להופיע דרבוקות שגופן עשוי מתכת וראשן פלסטיק. הדרבוקות נפוצות גם היום במזרח התיכון ולאחרונה גם בשאר העולם.  בין הסוגים השונים של הדרבוקות ניתן למצוא את הדרבוקה הטורקית, הדוהולה המצרית גדולת הממדים, וגרסאות נוספות של הדרבוקה נמצאות במדינות רבות באגן הים התיכון, כולל ארמניה, יוון, בולגריה והונגריה.  הדרבוקה היא כלי נגינה פופולרי במדינות רבות ובהן ישראל, ולו בשל הקלות שבה ניתן לנגן עליה וללמוד מקצבים פשוטים.  שני הצלילים העיקרים שאפשר להפיק מדרבוקה הם צליל עמוק הנוצר ממכה במרכז התוף וצליל גבוה הנוצר ממכה בדפנות הדרבוקה. פרט לאלה, ניתן להפיק צלילים ממכות על החרס או המתכת." }, style: { backgroundColor: "#7e8d11" } }, { id: "03ajm", type: "NoteTxt", isPinned: false, info: { txt: "Muchacho burrito!" }, style: { backgroundColor: "#37a0c3" } }, { id: "ld0s8", type: "NoteVideo", isPinned: false, info: { url: "https://www.youtube.com/watch?v=SuyMosFR5Bs", title: "Pantera" }, style: { backgroundColor: "#21c050" } }, { id: "ytMey", type: "NoteVideo", isPinned: false, info: { url: "https://www.youtube.com/watch?v=s4gBChg6AII", title: "Wow" }, style: { backgroundColor: "#2133c0" } }, { id: "FTIoT", type: "NoteVideo", isPinned: false, info: { url: "https://www.youtube.com/watch?v=LHAgUebnlXI", title: "lobster" }, style: { backgroundColor: "#2133c0" } }, { id: "b7hZO", type: "NoteTodos", isPinned: false, info: { label: "stuff to do", "todos": [{ txt: "do", done: true }, { txt: "dodo", done: false }, { txt: "todotodotodotodo", done: false }, { txt: "do do do do", done: true }] }, style: { backgroundColor: "#bcbf18" } }, { id: "76ynU", type: "NoteImg", isPinned: true, info: { url: "https://xnet.ynet.co.il/PicServer5/2020/08/23/10193721/2_6_f.jpg", title: "בורקס פיצה וואלאק משהו מטורף" }, style: { backgroundColor: "#522753" } }, { id: "qTz2C", type: "NoteImg", isPinned: false, info: { url: "https://medias.hashulchan.co.il/www/uploads/2018/10/DSF0602-am-e1541509220471-600x600-1545305862.jpg", title: "קרפלך" }, style: { backgroundColor: "#ab5454" } }, { id: "VqJJ6", type: "NoteTodos", isPinned: true, info: { label: "tomorrow", "todos": [{ txt: "do react", done: false }, { txt: "eat", done: false }, { txt: "sleep", done: true }, { txt: "more react", done: false }, { txt: "die", done: false }, { txt: "help", done: false }, { txt: "please", done: true }] }, style: { backgroundColor: "#2d9ca4" } }, { id: "ngPa3", type: "NoteImg", isPinned: false, info: { url: "https://qph.fs.quoracdn.net/main-qimg-98754868da5162f5379ea2380e195831-lq", title: "Dream physique" }, style: { backgroundColor: "#a1c51b" } }, { id: "3kcoJ", type: "NoteImg", isPinned: false, info: { url: "https://htgetrid.com/assets/uploads/2018/11/vyhuhol.jpg", title: "דסמן המושק" }, style: { backgroundColor: "#1bc56d" } }, { id: "N579l", type: "NoteImg", isPinned: false, info: { url: "https://i.redd.it/mqa2kbvdum261.png", title: "New phone who dis?" }, style: { backgroundColor: "#5e2647" } }, { id: "1fdDk", type: "NoteImg", isPinned: false, info: { url: "https://i.scdn.co/image/ab67616d0000b273f8eb848f748e17c8b37ea19a", title: "What da dog doin?" }, style: { backgroundColor: "#8e9013" } }, { id: "5KWFV", type: "NoteImg", isPinned: false, info: { url: "https://www.thespruceeats.com/thmb/-o0W1_Td2SFqBXwfrPuThC-LGkY=/2533x2533/smart/filters:no_upscale()/steamed-lobster-5097205-hero-06ab15ae53234b0ea162b60d54e57856.jpg", title: "OdEd" }, style: { backgroundColor: "#d11010" } }, { id: "Fyboa", type: "NoteVideo", isPinned: false, info: { url: "https://www.youtube.com/watch?v=CTmD4kDG4k0", title: "מרסדס" }, style: { backgroundColor: "#c93636" } }, { id: "YsfUP", type: "NoteVideo", isPinned: false, info: { url: "https://www.youtube.com/watch?v=lgTbQlfOSKE", title: "sharks" }, style: { backgroundColor: "#c93636" } }, { id: "0kceB", type: "NoteVideo", isPinned: false, info: { url: "https://www.youtube.com/watch?v=IK7eKtBw_yA", title: "מלך האריות נשבע" }, style: { backgroundColor: "#c93636" } }, { id: "HKLfR", type: "NoteTxt", isPinned: true, info: { txt: "Fullstack Me Baby!" }, style: { backgroundColor: "#0fd777" } }, { id: "Jo3BS", type: "NoteImg", isPinned: true, info: { url: "https://i.natgeofe.com/n/abf58ec8-ac78-4108-adbe-918fa5bda2e5/mountain-gorilla_2x3.jpg", title: "Bobi and Me" }, style: { backgroundColor: "#06760d" } }, { id: "QkGNw", type: "NoteTodos", isPinned: true, info: { label: "Get my stuff together", "todos": [{ txt: "Driving liscence", done: false }, { txt: "Coding power", done: true }] }, style: { backgroundColor: "#09876d" } }]



function query(ctg = null, textFilter = null) {
    let notes = _loadFromStorage()
    if (!notes || !notes.length) {
        notes = gNotes
        notes = getPinned(notes)
        _saveToStorage(notes)
        console.log('from json')

    }
    else console.log('from storage')
    notes = getPinned(notes)
    // if (!filterBy) return Promise.resolve({ notes })
    let filteredNotes = _filteredByCtg(notes, ctg)
    if (textFilter) filteredNotes = _fillterByText(filteredNotes, textFilter, ctg)
    return Promise.resolve({ notes: filteredNotes, ctg: ctg, textFilter })
}

function getPinned(notes) {
    notes.map((note, idx) => {
        if (note.isPinned) {
            var currPin = notes.splice(idx, 1)
            notes.unshift(...currPin)
        }
        return note
    })
    return notes
}

function togglePin(id) {
    let notes = _loadFromStorage()
    var note = getNoteById(id)
    notes[note.currIdx].isPinned = !notes[note.currIdx].isPinned;
    _saveToStorage(notes)
}

function _fillterByText(filteredNotes, txt) {
    // console.log(txt, ctg)
    console.log(filteredNotes)
    let textFilltered = filteredNotes.filter(note => {
        if (note.type === 'NoteTxt' && (note.info.txt.toLowerCase().includes(txt.toLowerCase()))) return note
        if ((note.type === 'NoteImg' || note.type === 'NoteVideo') && (note.info.title.toLowerCase().includes(txt.toLowerCase()))) return note
        if (note.type === 'NoteTodos' && (note.info.label.toLowerCase().includes(txt.toLowerCase()) || note.info.todos.some(todo => todo.txt.toLowerCase().includes(txt.toLowerCase())))) return note
    })
    return textFilltered
}


function _filteredByCtg(notes, ctg) {
    if (!ctg) return notes
    return notes.filter(note => note.type === ctg)
}



function addNote(ctg, text, url, imgTitle, listLabel, todo, color) {
    if (todo && todo.length) var todos = todo.map(txt => ({ txt: txt, doneAt: false }))
    let note;
    if (ctg === 'NoteTxt') note = { id: utilsService.generateId(), type: ctg, isPinned: false, info: { txt: text }, style: { backgroundColor: color } };
    if (ctg === 'NoteImg' || ctg === 'NoteVideo') note = { id: utilsService.generateId(), type: ctg, isPinned: false, info: { url: url, title: imgTitle }, style: { backgroundColor: color } };
    if (ctg === 'NoteTodos') note = { id: utilsService.generateId(), type: ctg, isPinned: false, info: { label: listLabel, todos: todos }, style: { backgroundColor: color } };
    let notes = _loadFromStorage();
    notes.unshift(note);
    _saveToStorage(notes);
}

function updateNote(id, ctg, text, url, imgTitle, listLabel, todo, color) {
    console.log(ctg)
    if (todo && todo.length) var todos = todo.map(txt => ({ txt: txt, doneAt: null }))
    let note;
    let idx = getNoteById(id)
    if (ctg === 'NoteTxt') note = { id: utilsService.generateId(), type: ctg, isPinned: false, info: { txt: text }, style: { backgroundColor: color } };
    if (ctg === 'NoteImg' || ctg === 'NoteVideo') note = { id: utilsService.generateId(), type: ctg, isPinned: false, info: { url: url, title: imgTitle }, style: { backgroundColor: color } };
    if (ctg === 'NoteTodos') note = { id: utilsService.generateId(), type: ctg, isPinned: false, info: { label: listLabel, todos: todos }, style: { backgroundColor: color } };
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

function toggleTodoDone(val, idx, id) {
    const notes = _loadFromStorage()
    var note = getNoteById(id)
    console.log(notes[note.currIdx].info.todos[idx].done)
    notes[note.currIdx].info.todos[idx].done = val
    _saveToStorage(notes)
}


function _saveToStorage(items) {
    storageService.saveToStorage(KEY, items)
}
function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}
