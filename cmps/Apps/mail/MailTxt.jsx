import {Loader} from '../../Loader.jsx'
export class MailTxt extends React.Component {
	state = { textShown: "", isLongTxtShown: false };
	componentDidMount() {
		this.showLongText();
	}

	showLongText = () => {
		var fullText = this.props.mail.body;
		if (fullText.length < 100) this.setState({ textShown: fullText });
		else if (!this.state.isLongTxtShown) {
			this.setState({ textShown: fullText.slice(0, 100)});
			console.log("more");
		} else {
            this.setState({ textShown: fullText});
			console.log("less");
		}
	};



	render() {
        const {textShown} = this.state;
		return (
			<React.Fragment>
                {!textShown && <Loader/>}
				{textShown && <p>{textShown}</p>}
            </React.Fragment>
		);
	}
}
