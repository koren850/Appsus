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
};

const KEY = "mailsDB";
let gFilterBy;

function checkDeletedFilter() {
    return (gFilterBy === 'isDeleted')
}

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
        to: 'user@appsus.com',
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
        to: 'user@appsus.com',
      },
    ];
  }
  _saveToStorage(mails);
  if (filterBy) mails = filterMails(filterBy, mails);
  console.log(mails)
  gFilterBy = filterBy;
  return Promise.resolve(mails, filterBy);
}

function filterMails(filterBy, mails) {
  let filteredMails = mails.filter((mail) => mail[filterBy]);
  filteredMails = filteredMails
    ? filteredMails
    : filterBy === "isSent!"
    ? mails.filter((mail) => !mail.isSent)
    : mails.filter(
        (mail) =>
          mail.body.contains(filterBy) || mail.subject.contains(filterBy)
      );
      return filteredMails;
}

function addMail(mail) {
  const mails = _loadFromStorage();
  mails.unshift(mail);
  _saveToStorage(mails);
}

function getMails() {
   let mails = _loadFromStorage();
   if (gFilterBy) mails = filterMails(gFilterBy,mails);
   console.log(mails.length)
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
