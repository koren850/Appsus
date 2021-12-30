export class NoteVideo extends React.Component {
	state = {};
	componentDidMount() {
		console.log(this.props.note.info.url);
	}

	render() {
		return (
			<div
				onMouseEnter={() => this.props.onMouseEnter(true)}
				onMouseLeave={() => this.props.onMouseLeave(false)}
				style={{ backgroundColor: this.props.color }}
				className={`note-preview note-video`}>
				<iframe width='480' height='360' src={this.props.note.info.url}></iframe>
				{this.props.isHover && <button onClick={() => this.props.delete(this.props.note.id)} className='fas trash' id='delete-note'></button>}
				{this.props.isHover && <button onClick={() => this.props.duplicate(this.props.note.id)} className='fas duplicate' id='duplicate-note'></button>}
			</div>
		);
	}
}
