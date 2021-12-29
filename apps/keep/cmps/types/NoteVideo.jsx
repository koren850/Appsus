export class NoteVideo extends React.Component {
	state = {};
	componentDidMount() {}

	render() {
		return (
			<div style={{ backgroundColor: this.props.color }} className={`note-preview note-video`}>
				<iframe width='480' height='360' src={this.props.note.info.url}></iframe>
			</div>
		);
	}
}
