import { storageService } from "../../../services/storage.service.js";
import { utilsService } from "../../../services/utils.service.js";

export const mailService = {
  query,
  getUser,
  getMailById,
  updateMail,
  addMail,
  getMails,
  checkDeletedFilter,
  deleteMail,
  getFilterBy,
};

const KEY = "mailsDB";
let gFilterBy;

function query(filterBy) {
  let mails = _loadFromStorage() || [];
  if (!mails || !mails.length) {
    mails = [
      {
        id: utilsService.generateId(),
        subject: "Missing My Weekends !!!",
        body: utilsService.makeLorem(30),
        isRead: false,
        isSent: false,
        isStar: false,
        isDraft: false,
        isDeleted: false,
        sentAt: new Date(),
        from: utilsService.getRandomName(),
        to: `${utilsService.getRandomName()}${utilsService.getRandomInt(
          1,
          2000
        )}@Jmail.com`,
      },
      {
        id: utilsService.generateId(),
        subject: "Sprint Number 3",
        body: utilsService.makeLorem(80),
        isRead: false,
        isSent: false,
        isStar: false,
        isDraft: false,
        isDeleted: false,
        sentAt: new Date(),
        from: utilsService.getRandomName(),
        to: `${utilsService.getRandomName()}${utilsService.getRandomInt(
          1,
          2000
        )}@Jmail.com`,
      },
      {
        id: utilsService.generateId(),
        subject: "Happy NEW YEAR !",
        body: utilsService.makeLorem(120),
        isRead: true,
        isSent: false,
        isStar: true,
        isDraft: false,
        isDeleted: false,
        sentAt: new Date(),
        from: utilsService.getRandomName(),
        to: `${utilsService.getRandomName()}${utilsService.getRandomInt(
          1,
          2000
        )}@Jmail.com`,
      },
      {
        id: utilsService.generateId(),
        subject: "Happy NEW YEAR !",
        body: utilsService.makeLorem(120),
        isRead: true,
        isSent: false,
        isStar: true,
        isDraft: false,
        isDeleted: false,
        sentAt: new Date(),
        from: utilsService.getRandomName(),
        to: `${utilsService.getRandomName()}${utilsService.getRandomInt(
          1,
          2000
        )}@Jmail.com`,
      },
      {
        id: utilsService.generateId(),
        subject: "Happy NEW YEAR !",
        body: utilsService.makeLorem(120),
        isRead: true,
        isSent: false,
        isStar: false,
        isDraft: false,
        isDeleted: false,
        sentAt: new Date(),
        from: utilsService.getRandomName(),
        to: `${utilsService.getRandomName()}${utilsService.getRandomInt(
          1,
          2000
        )}@Jmail.com`,
      },
      {
        id: utilsService.generateId(),
        subject: "Happy NEW YEAR !",
        body: utilsService.makeLorem(120),
        isRead: true,
        isSent: false,
        isStar: true,
        isDraft: false,
        isDeleted: false,
        sentAt: new Date(),
        from: utilsService.getRandomName(),
        to: `${utilsService.getRandomName()}${utilsService.getRandomInt(
          1,
          2000
        )}@Jmail.com`,
      },
      {
        id: utilsService.generateId(),
        subject: "Happy NEW YEAR !",
        body: utilsService.makeLorem(120),
        isRead: true,
        isSent: true,
        isStar: false,
        isDraft: false,
        isDeleted: false,
        sentAt: new Date(),
        from: utilsService.getRandomName(),
        to: "user@appsus.com",
      },
      {
        id: utilsService.generateId(),
        subject: "Happy NEW YEAR !",
        body: utilsService.makeLorem(120),
        isRead: true,
        isSent: false,
        isStar: true,
        isDraft: false,
        isDeleted: false,
        sentAt: new Date(),
        from: utilsService.getRandomName(),
        to: `${utilsService.getRandomName()}${utilsService.getRandomInt(
          1,
          2000
        )}@Jmail.com`,
      },
      {
        id: utilsService.generateId(),
        subject: "Happy NEW YEAR !",
        body: utilsService.makeLorem(120),
        isRead: true,
        isSent: true,
        isStar: false,
        isDraft: false,
        isDeleted: false,
        sentAt: new Date(),
        from: utilsService.getRandomName(),
        to: "user@appsus.com",
      },
    ];
  }
  _saveToStorage(mails);
  if (filterBy) mails = filterMails(filterBy, mails);
  gFilterBy = filterBy;
  return Promise.resolve(mails, filterBy);
}

function filterMails(filterBy, mails) {
  let filteredMails = mails.filter((mail) => mail[filterBy]);
  filteredMails = filteredMails.length
    ? filteredMails
    : mails.filter(
        (mail) =>
          mail.body.toLowerCase().includes(filterBy.toLowerCase()) ||
          mail.subject.toLowerCase().includes(filterBy.toLowerCase()) ||
          mail.to.toLowerCase().includes(filterBy.toLowerCase()) ||
          mail.from.toLowerCase().includes(filterBy.toLowerCase())  
      );
  if (filterBy.length === 1 && typeof filterBy === "object") {
    filteredMails = mails.filter((mail) => !mail[filterBy[0]]);
  }
  return filteredMails;
}

function checkDeletedFilter() {
  return gFilterBy === "isDeleted";
}

function getFilterBy() {
  if (!gFilterBy) gFilterBy = "";
  return gFilterBy;
}

function deleteMail(currMail) {
  const mails = _loadFromStorage();
  const idx = mails.findIndex((mail) => mail.id === currMail.id);
  mails.splice(idx, 1);
  _saveToStorage(mails);
}

function addMail(mail) {
  const mails = _loadFromStorage();
  mails.unshift(mail);
  _saveToStorage(mails);
}

function getMails() {
  let mails = _loadFromStorage();
  if (gFilterBy) mails = filterMails(gFilterBy, mails);
  return mails;
}

function getMailById(mailId) {
  const mails = _loadFromStorage();
  const mail = mails.find((mail) => mail.id === mailId);
  return mail;
}

function updateMail(mail) {
  const mails = _loadFromStorage();
  const mailIdx = mails.findIndex(
    (mailToUpdate) => mailToUpdate.id === mail.id
  );
  mails[mailIdx] = mail;
  _saveToStorage(mails);
  return Promise.resolve(mails);
}

function getUser() {
  const loggedinUser = {
    mail: "user@appsus.com",
    fullname: "Mahatma Appsus",
  };
  return loggedinUser;
}

function _saveToStorage(mails) {
  storageService.saveToStorage(KEY, mails);
}
function _loadFromStorage() {
  return storageService.loadFromStorage(KEY);
}
