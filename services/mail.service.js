import { storageService } from "./storage.service.js";
import { utilsService } from "./utils.service.js";

export const mailService = {
  query,
};

const KEY = "mailsDB";


function query() {
    let mails = _loadFromStorage() || [];
  if (mails && mails.length) return Promis.resolve(mails);
  mails = [
    {
      id: utilsService.generateId(),
      subject: "Miss you!",
      body: "Would love to catch up sometimes",
      isRead: false,
      sentAt: Date.now(),
      to: `${utilsService.getRandomName()}${utilsService.getRandomInt(
        1,
        2000
      )}@Jmail.com`,
    },
    {
      id: utilsService.generateId(),
      subject: "Miss you!",
      body: "Would love to catch up sometimes",
      isRead: false,
      sentAt: Date.now(),
      to: `${utilsService.getRandomName()}${utilsService.getRandomInt(
        1,
        2000
      )}@Jmail.com`,
    },
  ];
  _saveToStorage(mails);
  return Promise.resolve(mails);
}

function _saveToStorage(mails) {
  storageService.saveToStorage(KEY, mails);
}
function _loadFromStorage() {
  return storageService.loadFromStorage(KEY);
}
