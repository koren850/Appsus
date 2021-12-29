import { storageService } from './storage.service.js'

export  const mailService = {
    gaga,
}

const KEY = 'mailsDB';


function _saveToStorage(mails) {
    storageService.saveToStorage(KEY, mails)
}
function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}
