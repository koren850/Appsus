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
      this.setState({ textShown: fullText.slice(0, 100) + "..." });
    } else {
      this.setState({ textShown: fullText.slice(0, 70) + "..." });
    }
  };

  render() {
      const currMail = this.props.mail;
    const { textShown } = this.state;
    const { Link } = ReactRouterDOM;
    const isReadClass = currMail.isRead ? "light" : "bold";
    const letterClass = currMail.isRead ? "letter-read" : "letter-unread";
    return (<article className={'mail-txt container'}>
{this.state.isLongTxtShown && <p className={`mail-preview title ${isReadClass}`}>{currMail.to}</p>}        {!textShown && <Loader />}
{this.state.isLongTxtShown && <p className={`mail-preview title ${isReadClass}`}>{currMail.subject}</p>}        {!textShown && <Loader />}
        {textShown && <p className={`mail-preview mail-txt ${isReadClass}`}>{textShown}</p>}
    <div>
        {this.state.isLongTxtShown && <button
    className={`far ${letterClass}`}
    onClick={() => this.props.toggleIsRead(currMail)}
    ></button>}
        {this.state.isLongTxtShown && <button
    className={`fas trash`}
    onClick={() => this.props.moveToDeleted(currMail)}
    ></button>}
        {this.state.isLongTxtShown && <Link  to={`/mail/${currMail.id}`}><button
    className={`fas expand`}></button></Link>}
    </div>
    </article>
    );
  }
}
