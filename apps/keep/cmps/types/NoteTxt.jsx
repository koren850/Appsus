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
				<span>{this.props.note.info.txt}</span>
				{(this.props.note.isPinned || this.props.isHover) && (
					<button
						title='Pin note'
						style={this.props.note.isPinned ? { color: "yellow" } : {}}
						onClick={(ev) => this.props.pin(ev, this.props.note.id)}
						className='fas pin'
						id='pin-note'></button>
				)}
				<div className='btn-container flex'>
					{isHover && <button title='Delete note' onClick={(ev) => this.props.delete(ev, this.props.note.id)} className='fas trash' id='delete-note'></button>}
					{isHover && <button title='Duplicate note' onClick={(ev) => this.props.duplicate(ev, this.props.note.id)} className='fas duplicate' id='duplicate-note'></button>}
					{isHover && <button title='Update note' onClick={(ev) => this.props.update(ev, this.props.note)} className='far edit' id='edit-note'></button>}
				</div>
			</div>
		);
	}
}
