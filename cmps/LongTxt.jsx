export class LongTxt extends React.Component {
	state = { textShown: "", isLongTxtShown: false };
	componentDidMount() {
		this.showLongText();
	}

	showLongText = (ev) => {
		var fullText = this.props.text;
		if (fullText.length < 100) this.setState({ textShown: fullText });
		else if (!this.state.isLongTxtShown) {
			this.setState({ textShown: fullText.slice(0, 100), isLongTxtShown: true });
			console.log("more");
			if (ev) ev.target.innerText = "more....";
		} else {
			console.log("less");
			this.setState({ textShown: fullText, isLongTxtShown: false });
			if (ev) ev.target.innerText = "less...";
		}
	};

	render() {
		return (
			<p>
				{this.state.textShown} <button onClick={this.showLongText}>more...</button>
			</p>
		);
	}
}
