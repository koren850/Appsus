export class NoteImg extends React.Component {
	state = {};
	componentDidMount() {}

	render() {
		return <img className='note-img' src={this.props.note.info.url} alt='' />;
	}
}
