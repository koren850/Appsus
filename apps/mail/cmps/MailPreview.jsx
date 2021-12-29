import { MailTxt } from "./MailTxt.jsx";
import { mailService } from "../services/mail.service.js";
// const { Link } = ReactRouterDOM;

export class MailPreview extends React.Component {
  state = {
    mail: this.props.mail,
    isLongTxtShown: false,
  };

  componentWillUnmount() {
    this.setState({ isFocused: false });
  }

  updateIsRead = (currMail) => {
    currMail.isRead = true;
    mailService.updateMail(currMail);
    this.setState((prevState)=>({...prevState,mail:currMail}))    
  };

  setTxtShown = () => {
    this.setState({ isLongTxtShown: !this.state.isLongTxtShown });
  };

  handleFocus = (currMail) => {
    this.updateIsRead(currMail);
    this.setTxtShown();
  };

  toggleFavorite = (currMail) => {
    currMail.isStar = !currMail.isStar;
    mailService.updateMail(currMail);
    this.setState((prevState)=>({...prevState,mail:currMail}))
  };

  toggleIsRead = (currMail) => {
    currMail.isRead = !currMail.isRead;
    mailService.updateMail(currMail);
    this.setState((prevState)=>({...prevState,mail:currMail}))
  };



  render() {
    const currMail = { ...this.state.mail };
    console.log(currMail.isRead);
    const isReadClass = currMail.isRead ? "light" : "bold";
    const letterClass = currMail.isRead ? "letter-read" : "letter-unread";
    const isFavoriteClass = currMail.isStar ? "on" : "";
    return (
      <div className="mail-preview container" to={`/mail/${currMail.id}`}>
          {/* <h4>{currMail.to}</h4> */}
        <div
          className="mail-preview"
          onClick={() => this.handleFocus(currMail)}
        >
          <p className={`mail-preview title ${isReadClass}`}>
            {currMail.subject}
          </p>
          <MailTxt mail={currMail} isLongTxtShown={this.state.isLongTxtShown} />
        </div>
        <button className={`far ${letterClass}`}onClick={() => this.toggleIsRead(currMail)}></button>
        <button className={`fas star ${isFavoriteClass}`}onClick={() => this.toggleFavorite(currMail)}></button>
      </div>
    );
  }
}
