import { NoteService } from "../../service/keep.service.js";
export class NoteTodos extends React.Component {
	state = { ...this.props.note.info.todos };
	componentDidMount() {
		console.log(this.props.note);
		// this.props.loadNotes();
	}

	toggleTodo = (idx) => {
		this.setState(
			(prev) => ({ ...prev, [idx]: { txt: this.state[idx].txt, done: !this.state[idx].done } }),
			() => {
				NoteService.toggleTodoDone(this.state[idx].done, idx, this.props.note.id);
			}
		);
	};

	render() {
		const isHover = this.props.isHover;
		return (
			<div
				onMouseEnter={() => this.props.onMousetoggle(true)}
				onMouseLeave={() => this.props.onMousetoggle(false)}
				style={!isHover ? { backgroundColor: this.props.color } : { backgroundColor: this.props.color, boxShadow: `0px 0px 50px 5px ${this.props.color}` }}
				className={`note-preview note-todo`}>
				<div className='note-todo-label'> {this.props.note.info.label}</div>
				<ul className={"flex"}>
					{this.props.note.info.todos.map((todo, idx) => {
						return (
							<li key={idx} onClick={() => this.toggleTodo(idx)} className={`todos-li ${this.state[idx].done ? "done" : ""}`}>
								{todo.txt}
							</li>
						);
					})}
				</ul>
				{(this.props.note.isPinned || this.props.isHover) && (
					<button style={this.props.note.isPinned ? { color: "yellow" } : {}} onClick={(ev) => this.props.pin(ev, this.props.note.id)} className='fas pin' id='pin-note'></button>
				)}
				<div className='btn-container flex'>
					{this.props.isHover && <button onClick={(ev) => this.props.delete(ev, this.props.note.id)} className='fas trash' id='delete-note'></button>}
					{this.props.isHover && <button onClick={(ev) => this.props.duplicate(ev, this.props.note.id)} className='fas duplicate' id='duplicate-note'></button>}
					{this.props.isHover && <button onClick={(ev) => this.props.update(ev, this.props.note)} className='far edit' id='edit-note'></button>}
				</div>
			</div>
		);
	}
}
