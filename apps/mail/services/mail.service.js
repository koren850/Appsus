import { storageService } from "../../../services/storage.service.js";
import { utilsService } from "../../../services/utils.service.js";

export const mailService = {
  query,
  getUser,
  getMailById,
  updateMail,
};

const KEY = "mailsDB";

function query() {
  let mails = _loadFromStorage() || [];
  if (mails && mails.length) return Promise.resolve(mails);
  mails = [
    {
      id: utilsService.generateId(),
      subject: "Missing My Weekends !!!",
      body: utilsService.makeLorem(30),
      isRead: false,
      isSent: false,
      isStar: false,
      isDeleted:false,
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
      isDeleted:false,
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
        isDeleted:false,
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
        isDeleted:false,
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
        isDeleted:false,
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
        isDeleted:false,
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
        isDeleted:false,
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
        isDeleted:false,
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
        isDeleted:false,
        sentAt: new Date(),
        from: utilsService.getRandomName(),
        to: `${utilsService.getRandomName()}${utilsService.getRandomInt(
          1,
          2000
        )}@Jmail.com`,
      },
  ];
  _saveToStorage(mails);
  return Promise.resolve(mails);
}

function getMailById(mailId) {
  const mails = _loadFromStorage();
  const mail = mails.find((mail) => mail.id === mailId);
  return mail;
}

function updateMail(mail) {
  const mails = _loadFromStorage();
  const mailIdx = mails.findIndex((mailToUpdate) => mailToUpdate.id === mail.id);
  mails[mailIdx] = mail;
  _saveToStorage(mails);
  return Promise.resolve(mails);
}

function getUser() {
  const loggedinUser = {
    email: "user@appsus.com",
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
