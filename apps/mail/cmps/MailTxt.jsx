import { Loader } from "../../../cmps/Loader.jsx";
export class MailTxt extends React.Component {
	state = { textShown: "", isLongTxtShown: false };

	componentDidMount() {
		this.showLongText();
	}

	componentDidUpdate() {
		if (this.state.isLongTxtShown !== this.props.isLongTxtShown) {
			this.setState(
				(prevState) => ({ ...prevState, isLongTxtShown: this.props.isLongTxtShown }),
				() => this.showLongText()
			);
		}
	}

	showLongText = () => {
		var fullText = this.props.mail.body;
		if (fullText.length < 100) this.setState({ textShown: fullText });
		else if (!this.state.isLongTxtShown) {
			this.setState({ textShown: fullText.slice(0, 100) + "..." });
		} else {
			this.setState({ textShown: fullText.slice(0, 60) + "..." });
		}
	};

	sendAsNote = ({ to, subject, body, id }) => {
		console.log("fa");
		window.location.replace(`#/mail/compose?to=${to.replace(" ", "+")}&title=${subject.replace(" ", "+")}&subject=${body.replace(" ", "+")}&id=${id.replace(" ", "+")}`);
	};

	render() {
		const currMail = this.props.mail;
		const { textShown } = this.state;
		const { Link } = ReactRouterDOM;
		const isReadClass = currMail.isRead ? "light" : "bold";
		const letterClass = currMail.isRead ? "letter-read" : "letter-unread";
		return (
			<article className={"mail-txt container"}>
                <div className={'mail-txt txt-container'}>
				{this.state.isLongTxtShown && (
                    <p className={`mail-preview title ${isReadClass}`} title={"Sender Mail"}>
						{currMail.to}
					</p>
				)}{" "}
				{!textShown && <Loader />}
				{this.state.isLongTxtShown && (
                    <p className={`mail-preview title ${isReadClass}`} title={"Title"}>
						{currMail.subject}
					</p>
				)}{" "}
				{!textShown && <Loader />}
				{textShown && (
					<p className={`mail-preview mail-txt ${isReadClass}`} title={"Few Text Line"}>
						{textShown}
					</p>
				)}
                </div>
				<div className={"hover-btns"}>
					<div className={"first-two"}>
						{this.state.isLongTxtShown && <button className={`far ${letterClass}`} onClick={() => this.props.toggleIsRead(currMail)} title={"Toggle Reading"}></button>}
						{this.state.isLongTxtShown && <button className={`fas trash`} title={"Delete This Mail"} onClick={() => this.props.moveToDeleted(currMail)}></button>}
					</div>
					<div className={"first-two"}>
						{this.state.isLongTxtShown && (
							<Link to={`/mail/${currMail.id}`}>
								<button title={"Full Screen View"} className={`fas expand`}></button>
							</Link>
						)}
						{this.state.isLongTxtShown && currMail.isDraft && <button onClick={() => this.sendAsNote(currMail)} title={"Edit Draft"} className={`fas edit`}></button>}
						{this.state.isLongTxtShown && !currMail.isDraft && <button onClick={() => this.sendAsNote(currMail)} title={"Reply Mail"} className={`fas reply`}></button>}
					</div>
				</div>
			</article>
		);
	}
}
