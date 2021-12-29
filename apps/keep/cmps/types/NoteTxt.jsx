export class NoteTxt extends React.Component {
	state = {};
	componentDidMount() {}

	render() {
		return (
			<div style={{ backgroundColor: this.props.color }} className={`note-preview note-text`}>
				{this.props.note.info.txt}
			</div>
		);
	}
}
