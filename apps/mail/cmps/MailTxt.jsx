import { Loader } from "../../../cmps/Loader.jsx";
export class MailTxt extends React.Component {
  state = { textShown: "", isLongTxtShown: false,};

  componentDidMount() {
    this.showLongText();
  }

  componentDidUpdate() {
      if (this.state.isLongTxtShown !== this.props.isLongTxtShown) {
          this.setState((prevState) => ({...prevState, isLongTxtShown:this.props.isLongTxtShown}),()=>this.showLongText())
      }
  }

  showLongText = () => {
    var fullText = this.props.mail.body;
    if (fullText.length < 100) this.setState({ textShown: fullText });
    else if (!this.state.isLongTxtShown) {
      this.setState({ textShown: fullText.slice(0, 40) + "..." });
    } else {
      this.setState({ textShown: fullText.slice(0, 200) + "..." });
    }
  };

//   moveToDeleted = (currMail) => {
//       s
//   }

  render() {
      const currMail = this.props.mail;
    const { textShown } = this.state;
    const isReadClass = currMail.isRead ? "light" : "bold";
    const letterClass = currMail.isRead ? "letter-read" : "letter-unread";
    return (
      <React.Fragment>
{this.state.isLongTxtShown && <p className={`mail-preview title ${isReadClass}`}>{currMail.subject}</p>}        {!textShown && <Loader />}
        {textShown && <p className={`mail-preview mail-txt ${isReadClass}`}>{textShown}</p>}
        {this.state.isLongTxtShown && <button
    className={`far ${letterClass}`}
    onClick={() => this.props.toggleIsRead(currMail)}
  ></button>}
        {this.state.isLongTxtShown && <button
    className={`fas trash`}
    onClick={() => this.moveToDeleted(currMail)}
  ></button>}
      </React.Fragment>
    );
  }
}
