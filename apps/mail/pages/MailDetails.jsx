import { mailService } from "../services/mail.service.js";
import { swalService } from "../../../services/swal.service.js";
export class MailDetails extends React.Component {
	moveToDeleted = (currMail) => {
		swalService.checkAgain(this.deleteConfirm, currMail);
	};

	deleteConfirm = (currMail) => {
		currMail.isDeleted = true;
		mailService.updateMail(currMail);
		this.setState({ mail: currMail });
		swalService.userModal("error", "Mail Deleted");
		window.location.replace("/mail");
		this.props.loadMails();
	};

	sendAsNote = (subject) => {
		window.location.replace(`#/keep/add?content=${subject.replace(" ", "+")}`);
	};

	render() {
		const { Link } = ReactRouterDOM;
		const { mailId } = this.props.ev.match.params;
		const currMail = mailService.getMailById(mailId);
		const sentAt = mailService.getSentTime(currMail.sentAt);
		return (
			<section className={"mail-details container layout"}>
				<div className={"layout-container flex-column"}>
					<header className={"mail-details line layout"}>Reading Message</header>
					<article className={"mail-details line layout"}>
						<p>Subject : {currMail.subject}</p>
					</article>
					<article className={"mail-details line layout"}>
						<p>
							From : <span>{currMail.from}</span>, to <span>&lt;{currMail.to}&gt;</span>
							<span className={"mail-details-time"}>{sentAt}</span>
						</p>
					</article>
					<article className={"layout main-txt"}>{currMail.body}</article>
					<footer className={"mail-details btn"}>
						<button className={"mail-details fas trash"} title={"Delete This Mail"} type='button' onClick={() => this.moveToDeleted(currMail)}></button>
						<Link className={"mail-details fas compress"} title={"Exit Full View"} to='/mail'></Link>
						<button className={"mail-details fas note-send"} title={"Send as note"} type='button' onClick={() => this.sendAsNote(currMail.body)}></button>
					</footer>
				</div>
			</section>
		);
	}
}
