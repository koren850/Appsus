import { storageService } from './storage.service.js'

export  const keepService = {
    gaga,
}

const KEY = 'keepsDB';


function _saveToStorage(items) {
    storageService.saveToStorage(KEY, items)
}
function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}
