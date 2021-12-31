export class NoteTxt extends React.Component {
	state = {};
	componentDidMount() {}

	render() {
		const isHover = this.props.isHover;
		return (
			<div
				onMouseEnter={() => this.props.onMousetoggle(true)}
				onMouseLeave={() => this.props.onMousetoggle(false)}
				style={!isHover ? { backgroundColor: this.props.color } : { backgroundColor: this.props.color, boxShadow: `0px 0px 50px 5px ${this.props.color}` }}
				className={`note-preview note-text`}>
				{this.props.note.info.txt}
				{isHover && <button onClick={(ev) => this.props.delete(ev, this.props.note.id)} className='fas trash' id='delete-note'></button>}
				{isHover && <button onClick={(ev) => this.props.duplicate(ev, this.props.note.id)} className='fas duplicate' id='duplicate-note'></button>}
				{isHover && <button onClick={(ev) => this.props.update(ev, this.props.note)} className='far edit' id='edit-note'></button>}
			</div>
		);
	}
}
