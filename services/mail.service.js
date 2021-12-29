import { storageService } from "./storage.service.js";
import { utilsService } from "./utils.service.js";

export const mailService = {
  query,
  getUser,
};

const KEY = "mailsDB";


function query() {
    let mails = _loadFromStorage() || [];
  if (mails && mails.length) return Promis.resolve(mails);
  mails = [
    {
      id: utilsService.generateId(),
      subject: "Missing My Weekends !!!",
      body: "Would love to catch up sometimes",
      isRead: false,
      isSent: false,
      isStar: false,
      sentAt: Date.now(),
      to: `${utilsService.getRandomName()}${utilsService.getRandomInt(
        1,
        2000
      )}@Jmail.com`,
    },
    {
      id: utilsService.generateId(),
      subject: "Sprint Number 3",
      body: "Would love to catch up sometimes",
      isRead: false,
      isSent: false,
      isStar: false,
      sentAt: Date.now(),
      to: `${utilsService.getRandomName()}${utilsService.getRandomInt(
        1,
        2000
      )}@Jmail.com`,
    },
    {
      id: utilsService.generateId(),
      subject: "Happy NEW YEAR !",
      body: "Would love to catch up sometimes",
      isRead: true,
      isSent: false,
      isStar: true,
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

function getUser() {
    const loggedinUser = {
        email: 'user@appsus.com',
        fullname: 'Mahatma Appsus'
    }
    return loggedinUser;
}

function _saveToStorage(mails) {
  storageService.saveToStorage(KEY, mails);
}
function _loadFromStorage() {
  return storageService.loadFromStorage(KEY);
}
