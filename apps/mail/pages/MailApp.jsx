import { mailService } from "../services/mail.service.js";
import {MailCompose} from "../pages/MailCompose.jsx"
import {MailDetails} from "../pages/MailDetails.jsx"
import { MailList } from "../cmps/MailList.jsx";

const { Route, Switch } = ReactRouterDOM;
export class MailApp extends React.Component {
	state = { mails: [] };

	componentDidMount() {
		this.loadMails();
	}

    componentDidUpdate() {
		const mails = mailService.getMails();
		if (mails.length && mails.length !== this.state.mails.length) {
			this.loadMails();
		}
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
                <Switch>
                <Route component={MailCompose} path='/mail/compose'/>
                <Route component={MailDetails} path='/mail/:mailId'/>
				<MailList mails={mails} />
                </Switch>
			</section>
		);
	}
}
