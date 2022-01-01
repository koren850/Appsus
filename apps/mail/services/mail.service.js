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
  getSentTime,
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
        sentAt: new Date() -3000000,
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
        sentAt: new Date() - 15000000,
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
        sentAt: new Date() - 150000000,
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
        sentAt: new Date() - 300000000,
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
        sentAt: new Date() - 400000000,
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
        sentAt: new Date() - 4000000000,
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
        isDeleted: true,
        sentAt: new Date() - 1500000000000,
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
        isDraft: true,
        isDeleted: false,
        sentAt: new Date() - 40000000000,
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
        isRead: false,
        isSent: false,
        isStar: false,
        isDraft: false,
        isDeleted: false,
        sentAt: new Date() - 90000000000,
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

function getSentTime (time) {
    const dayjs = require('dayjs');
    let borodinoBattle = dayjs(time);
    let now = dayjs();
    let seconds = now.diff(borodinoBattle, 'seconds');
    if (seconds > 15) seconds = 'Few';
    let minutes = now.diff(borodinoBattle, 'minutes');
    if (minutes > 5) minutes = 'Few';
    let hours = now.diff(borodinoBattle, 'hours');
    if (hours > 3) hours = 'Few';
    let days = now.diff(borodinoBattle, 'days');
    if (days > 3) days = 'Few';
    let months = now.diff(borodinoBattle, 'months');
    if (months > 3) months = 'Few';
    let years = now.diff(borodinoBattle, 'years');
    if (years > 2) years = 'Few';
     if (years) return years + ' Years Ago...'
     else if (months) return months + ' Months Ago...'
     else if (days) return days + ' Days Ago...'
     else if (hours) return hours + ' Hours Ago...'
     else if (minutes) return minutes + ' Minutes Ago...'
     else if (seconds) return seconds + ' Seconds Ago...'
    else return 'Just Now...';
  }

function _saveToStorage(mails) {
  storageService.saveToStorage(KEY, mails);
}
function _loadFromStorage() {
  return storageService.loadFromStorage(KEY);
}
