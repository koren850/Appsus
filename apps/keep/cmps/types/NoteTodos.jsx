export class NoteTodos extends React.Component {
	state = {};
	componentDidMount() {}

	render() {
		return (
			<section
				onMouseEnter={() => this.props.onMouseEnter(true)}
				onMouseLeave={() => this.props.onMouseLeave(false)}
				style={{ backgroundColor: this.props.color }}
				className={`note-preview note-todo flex`}>
				<div> {this.props.note.info.label}</div>
				<ul className={"flex"}>
					{this.props.note.info.todos.map((todo, idx) => {
						return <li key={idx}>{todo.txt}</li>;
					})}
				</ul>
				{this.props.isHover && <button onClick={() => this.props.delete(this.props.note.id)} className='fas trash' id='delete-note'></button>}
				{this.props.isHover && <button onClick={() => this.props.duplicate(this.props.note.id)} className='fas duplicate' id='duplicate-note'></button>}
			</section>
		);
	}
}
