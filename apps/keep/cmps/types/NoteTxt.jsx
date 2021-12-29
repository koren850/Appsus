export class NoteTxt extends React.Component {
	state = {};
	componentDidMount() {}

	render() {
		return <div>{this.props.note.info.txt}</div>;
	}
}
