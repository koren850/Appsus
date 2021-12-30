export class NoteImg extends React.Component {
	state = {};
	componentDidMount() {}

	render() {
		return (
			<div
				onMouseEnter={() => this.props.onMouseEnter(true)}
				onMouseLeave={() => this.props.onMouseLeave(false)}
				style={{ backgroundColor: this.props.color }}
				className={"note-preview note-img"}>
				<h2>{this.props.note.info.title}</h2>
				<img src={this.props.note.info.url} alt='' />
				{this.props.isHover && <button onClick={() => this.props.delete(this.props.note.id)} className='fas trash' id='delete-note'></button>}
				{this.props.isHover && <button onClick={() => this.props.duplicate(this.props.note.id)} className='fas duplicate' id='duplicate-note'></button>}
			</div>
		);
	}
}
