import { MailTxt } from "./MailTxt.jsx";
import { mailService } from "../services/mail.service.js";
import {swalService} from "../../../services/swal.service.js";

export class MailPreview extends React.Component {
  state = {
    mail: this.props.mail,
    isLongTxtShown: false,
    time:this.props.mail.sentAt,
  }
  
  moveToDeleted = (currMail) => {
    swalService.checkAgain(this.deleteConfirm, currMail);
}

 deleteConfirm =(currMail) => {
    currMail.isDeleted = true;
    mailService.updateMail(currMail);
    this.setState({mail:currMail});
    swalService.userModal('error', 'Mail Deleted');
 }

  componentDidMount() {
    this.timeInterval = setInterval(this.setTime,5000);
  }

  componentWillUnmount() {
    this.setState({ isFocused: false });
    clearInterval(this.timeInterval);
  }

  updateIsRead = (currMail) => {
    currMail.isRead = true;
    mailService.updateMail(currMail);
    this.setState((prevState) => ({ ...prevState, mail: currMail }));
  };

  toggleHover = () => {
    this.setState({ isLongTxtShown: !this.state.isLongTxtShown });
  };

  handleFocus = (currMail) => {
      currMail.isRead = !currMail.isRead;
    mailService.updateMail(currMail);
    this.setState({mail : currMail});
  };

  toggleFavorite = (currMail) => {
    currMail.isStar = !currMail.isStar;
    mailService.updateMail(currMail);
    this.setState((prevState) => ({ ...prevState, mail: currMail }));
  };

  toggleIsRead = (currMail) => {
    currMail.isRead = !currMail.isRead;
    mailService.updateMail(currMail);
    this.setState((prevState) => ({ ...prevState, mail: currMail }));
  };

  setTime=()=> {
    const diff = this.getSentTime(this.props.mail.sentAt);
    if (this.state.time !== diff) this.setState((prevState) => ({...prevState,time:diff}))
  }

  getSentTime = (time) => {
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

  render() {
    const currMail = { ...this.state.mail };
    const isReadClass = currMail.isRead ? "light" : "bold";
    const isFavoriteClass = currMail.isStar ? "on" : "";
    const sentTime = this.getSentTime(currMail.sentAt);
    return (
    // !currMail.isDeleted && !this.state.showDeleted && 
    <div onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} className="mail-preview container" to={`/mail/${currMail.id}`}>
        <button
          className={`fas star ${isFavoriteClass}`}
          onClick={() => this.toggleFavorite(currMail)}
        ></button>
        <p className={isReadClass}>{currMail.from}</p>
        <div
          className="mail-preview"
          >
          <MailTxt mail={currMail} isLongTxtShown={this.state.isLongTxtShown} 
            toggleIsRead={this.toggleIsRead}
            moveToDeleted={this.moveToDeleted}
            />
        </div>
            <p>{sentTime}</p>
      </div>)}}
