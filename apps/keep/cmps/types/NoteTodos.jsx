export class NoteTodos extends React.Component {
	state = {};
	componentDidMount() {}

	render() {
		return (
			<div
				onMouseEnter={() => this.props.onMousetoggle(true)}
				onMouseLeave={() => this.props.onMousetoggle(false)}
				style={{ backgroundColor: this.props.color }}
				className={`note-preview note-todo`}>
				<div> {this.props.note.info.label}</div>
				<ul className={"flex"}>
					{this.props.note.info.todos.map((todo, idx) => {
						return <li key={idx}>{todo.txt}</li>;
					})}
				</ul>
				{this.props.isHover && <button onClick={(ev) => this.props.delete(ev, this.props.note.id)} className='fas trash' id='delete-note'></button>}
				{this.props.isHover && <button onClick={(ev) => this.props.duplicate(ev, this.props.note.id)} className='fas duplicate' id='duplicate-note'></button>}
				{this.props.isHover && <button onClick={(ev) => this.props.update(ev, this.props.note)} className='far edit' id='edit-note'></button>}
			</div>
		);
	}
}
