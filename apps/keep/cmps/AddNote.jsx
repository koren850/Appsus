import { NoteService } from "../service/keep.service.js";

const { Link } = ReactRouterDOM;
export class AddNote extends React.Component {
	state = { ctg: "NoteTxt", info: { text: "", imgTitle: "", url: "", listLabel: "", color: "#ffffff" }, todo: [] };

	componentDidMount() {}

	addNote = () => {
		const { text, imgTitle, url, listLabel, color } = this.state.info;
		const { todo, ctg } = this.state;
		if (ctg === "NoteTxt") NoteService.addNote(ctg, text, null, null, null, null, color);
		else if (ctg === "NoteImg") NoteService.addNote(ctg, null, url, imgTitle, null, null, color);
		else if (ctg === "NoteVideo") NoteService.addNote(ctg, null, url, null, null, null, color);
		else if (ctg === "NoteTodos") NoteService.addNote(ctg, null, null, null, listLabel, todo, color);
		this.props.loadNotes();
		this.onGoBack();
	};

	handleChange = ({ target }, infotype, idx) => {
		if (infotype === "todo") {
			var todos = this.state.todo.slice();
			todos[idx] = target.value;
			this.setState((prevState) => ({ ...prevState, todo: todos }));
		} else this.setState((prevState) => ({ info: { ...prevState.info, [infotype]: target.value } }));
	};

	onGoBack = (ev) => {
		this.props.ev.history.push("/keep");
	};
	setCtg = (ctg) => {
		this.setState({ ctg });
	};
	addTodo = (todos) => {
		console.log(todos);
		todos.push("");
		// console.log(todo);
		this.setState({ todo: todos });
	};

	render() {
		const { ctg, info, todo } = this.state;
		return (
			<div>
				<Link className='add-note' to='/keep' />
				<form className='add-note-form'>
					<div className='flex'>
						<button type='button' onClick={() => this.setCtg("NoteTxt")} className='fas text add-note-ctg' id={`${ctg === "NoteTxt" ? "active-ctg" : ""}`}></button>
						<button type='button' onClick={() => this.setCtg("NoteImg")} className='far image add-note-ctg' id={`${ctg === "NoteImg" ? "active-ctg" : ""}`}></button>
						<button type='button' onClick={() => this.setCtg("NoteVideo")} className='fab video add-note-ctg' id={`${ctg === "NoteVideo" ? "active-ctg" : ""}`}></button>
						<button type='button' onClick={() => this.setCtg("NoteTodos")} className='fas list add-note-ctg' id={`${ctg === "NoteTodos" ? "active-ctg" : ""}`}></button>
					</div>
					{ctg === "NoteTxt" && <input onChange={(ev) => this.handleChange(ev, "text")} value={info.text} placeholder='enter text here' type='text' />}
					{ctg === "NoteImg" && <input onChange={(ev) => this.handleChange(ev, "imgTitle")} value={info.imgTitle} placeholder='enter img title here' type='text' />}
					{(ctg === "NoteImg" || ctg === "NoteVideo") && <input onChange={(ev) => this.handleChange(ev, "url")} value={info.url} placeholder='enter url here' type='text' />}
					{ctg === "NoteTodos" && (
						<div>
							<label htmlFor={"label"}>Enter list label: </label>
							<input onChange={(ev) => this.handleChange(ev, "listLabel")} value={info.listLabel} placeholder='enter list label here' type='text' id='label' />
						</div>
					)}
					{ctg === "NoteTodos" &&
						todo.map((t, idx) => {
							return (
								<div key={`todo-container${idx}`}>
									<label htmlFor={`todo-${idx}`}>Enter todo {idx + 1}: </label>
									<input key={`todo${idx}`} onChange={(ev) => this.handleChange(ev, "todo", idx)} value={todo[idx]} placeholder='enter todo here' type='text' id={`todo-${idx}`} />
								</div>
							);
						})}
					{ctg === "NoteTodos" && (
						<button type='button' onClick={() => this.addTodo(todo)}>
							add more todo
						</button>
					)}

					{ctg && <input onChange={(ev) => this.handleChange(ev, "color")} value={info.color} placeholder='enter background color here' type='color' />}
					{ctg && <button onClick={this.addNote}>Add Note</button>}
				</form>
			</div>
		);
	}
}
