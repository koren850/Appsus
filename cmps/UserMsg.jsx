import { eventBusService } from "../services/event-bus.service.js";

export class UserMsg extends React.Component {
	state = {
		msg: null,
	};

	removeEventBus = null;
	timeoutId = null;

	componentDidMount() {
		this.removeEventBus = eventBusService.on("user-msg", (msg) => {
			clearTimeout(this.timeoutId);
			this.setState({ msg }, this.onAutoClose);
		});
	}

	onAutoClose = () => {
		this.timeoutId = setTimeout(() => {
			this.onCloseMsg();
		}, 3000);
	};

	onCloseMsg = () => {
		clearTimeout(this.timeoutId);
		this.setState({ msg: null });
	};

	componentWillUnmount() {
		this.removeEventBus();
	}

	render() {
		const { msg } = this.state;
		if (!msg) return <React.Fragment></React.Fragment>;
		return (
			<div className={`user-msg ${msg.type}`}>
				<button onClick={this.onCloseMsg}>X</button>
				<h2>{msg.txt}</h2>
				{msg.link && <a href={`/#/book/${msg.link}`}>Check it Out</a>}
			</div>
		);
	}
}
