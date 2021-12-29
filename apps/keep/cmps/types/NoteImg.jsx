export class NoteImg extends React.Component {
	state = {};
	componentDidMount() {}

	render() {
		return (
			<div style={{ backgroundColor: this.props.color }} className={"note-preview note-img"}>
				<h2>{this.props.note.info.title}</h2>
				<img src={this.props.note.info.url} alt='' />
			</div>
		);
	}
}
