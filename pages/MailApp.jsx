import { mailService } from "../services/mail.service.js";
import { MailList } from "../cmps/Apps/mail/MailList.jsx";

export class MailApp extends React.Component {
	state = { mails: [] };

	componentDidMount() {
		this.loadMails();
	}

	loadMails = () => {
		mailService.query().then((mails) => {
			this.setState((prevState) => ({ ...prevState, mails }));
		});
	};

	render() {
		const { mails } = this.state;
		return (
			<section>
				<header className={`mail-header`}></header>
				<MailList mails={mails} />
			</section>
		);
	}
}
