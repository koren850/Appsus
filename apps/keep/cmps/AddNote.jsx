import { NoteService } from "../service/keep.service.js";
import { swalService } from "../../../services/swal.service.js";

const { Link } = ReactRouterDOM;
export class AddNote extends React.Component {
	state = { update: false, ctg: this.props.ctg, info: { text: "", imgTitle: "", url: "", listLabel: "", color: "#ffffff" }, todo: [] };

	componentDidMount() {
		const urlSearchParams = new URLSearchParams(this.props.ev.location.search);
		if (urlSearchParams.get("content")) {
			this.setState((prev) => ({ ...prev, ctg: "NoteTxt", info: { ...prev.info, text: urlSearchParams.get("content") } }));
		}
		console.log(urlSearchParams.get("ctg"));
		var note = this.props.note;
		console.log(note);
		if (note)
			this.setState({
				id: note.id,
				update: true,
				ctg: note.type,
				info: { text: note.info.txt, imgTitle: note.info.title, url: note.info.url, listLabel: note.info.label, color: note.style.backgroundColor },
				todo: note.info.todos && note.info.todos.map((todo) => todo.txt),
			});
	}

	componentDidUpdate() {}

	addNote = (ev, action) => {
		ev.preventDefault();
		const { text, imgTitle, url, listLabel, color } = this.state.info;
		const { todo, ctg, id } = this.state;
		if (ctg === "NoteTxt") {
			action === "add" ? NoteService.addNote(ctg, text, null, null, null, null, color) : NoteService.updateNote(id, ctg, text, null, null, null, null, color);
		} else if (ctg === "NoteImg" || ctg === "NoteVideo")
			action === "add" ? NoteService.addNote(ctg, null, url, imgTitle, null, null, color) : NoteService.updateNote(id, ctg, null, url, imgTitle, null, null, color);
		else if (ctg === "NoteTodos")
			action === "add" ? NoteService.addNote(ctg, null, null, null, listLabel, todo, color) : NoteService.updateNote(id, ctg, null, null, null, listLabel, todo, color);
		this.props.loadNotes();
		if (action === "update") {
			swalService.userModal(undefined, "Note updated ");
		} else if (action === "add") {
			swalService.userModal(undefined, "Note added ");
		}
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
		this.setState({ todo: todos });
	};

	render() {
		const { ctg, info, todo, update } = this.state;
		return (
			<div>
				<Link className='add-note' to='/keep' />
				<form style={{ backgroundColor: info.color }} className='add-note-form'>
					<div className='flex'>
						{!update && (
							<button
								title='Add text note'
								type='button'
								onClick={() => this.setCtg("NoteTxt")}
								className='fas text add-note-ctg'
								id={`${ctg === "NoteTxt" ? "active-ctg" : ""}`}></button>
						)}
						{!update && (
							<button
								title='Add image note'
								type='button'
								onClick={() => this.setCtg("NoteImg")}
								className='far image add-note-ctg'
								id={`${ctg === "NoteImg" ? "active-ctg" : ""}`}></button>
						)}
						{!update && (
							<button
								title='Add video note'
								type='button'
								onClick={() => this.setCtg("NoteVideo")}
								className='fab video add-note-ctg'
								id={`${ctg === "NoteVideo" ? "active-ctg" : ""}`}></button>
						)}
						{!update && (
							<button
								title='Add list note'
								type='button'
								onClick={() => this.setCtg("NoteTodos")}
								className='fas list add-note-ctg'
								id={`${ctg === "NoteTodos" ? "active-ctg" : ""}`}></button>
						)}
					</div>
					{ctg === "NoteTxt" && <textarea className='note-text-add' onChange={(ev) => this.handleChange(ev, "text")} value={info.text} placeholder='enter text here' type='text' />}
					{(ctg === "NoteImg" || ctg === "NoteVideo") && (
						<input onChange={(ev) => this.handleChange(ev, "imgTitle")} value={info.imgTitle} placeholder='enter img title here' type='text' />
					)}
					{(ctg === "NoteImg" || ctg === "NoteVideo") && <input onChange={(ev) => this.handleChange(ev, "url")} value={info.url} placeholder='enter url here' type='text' />}
					{ctg === "NoteTodos" && (
						<div>
							<label htmlFor={"label"}>{!update ? "Enter list label: " : "List label: "} </label>
							<input onChange={(ev) => this.handleChange(ev, "listLabel")} value={info.listLabel} placeholder={"enter list label here"} type='text' id='label' />
						</div>
					)}
					{ctg === "NoteTodos" &&
						todo.map((nul, idx) => {
							return (
								<div key={`todo-container${idx}`}>
									<label htmlFor={`todo-${idx}`}>
										{!update ? "Enter todo: " : "Todo: "} {idx + 1}:{" "}
									</label>
									<input
										key={`todo${idx}`}
										onChange={(ev) => this.handleChange(ev, "todo", idx)}
										value={todo[idx]}
										placeholder={"enter todo here"}
										type='text'
										id={`todo-${idx}`}
									/>
								</div>
							);
						})}
					{ctg === "NoteTodos" && (
						<button type='button' onClick={() => this.addTodo(todo)}>
							add more todo
						</button>
					)}

					{ctg && (
						<div className='color-container'>
							<div id='color' className='fas color'></div>
							<input onChange={(ev) => this.handleChange(ev, "color")} value={info.color} type='color' />
						</div>
					)}
					{ctg && !update && (
						<button type='submit' onClick={(ev) => this.addNote(ev, "add")}>
							Add Note
						</button>
					)}
					{ctg && update && (
						<button type='submit' onClick={(ev) => this.addNote(ev, "update")}>
							Update Note
						</button>
					)}
				</form>
			</div>
		);
	}
}
