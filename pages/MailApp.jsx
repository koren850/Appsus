import { mailService } from "../services/mail.service.js";
export class MailApp extends React.Component {
	state = {};
	componentDidMount() {
		console.log("mounted");
	}

	render() {
		return <div>MailApp app</div>;
	}
}
