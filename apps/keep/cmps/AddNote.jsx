import { NoteService } from "../service/keep.service.js";

const { Link } = ReactRouterDOM;
export class AddNote extends React.Component {
	state = { ctg: null, info: { text: "", imgTitle: "", url: "", listLabel: "", color: "#ffffff" }, todo: [] };
	componentDidMount() {
		console.log("hello");
	}

	addNote = (ctg) => {
		const { text, imgTitle, url, listLabel, color } = this.state.info;
		const { todo } = this.state;
		if (ctg === "NoteTxt") NoteService.addNoteTxt(text, color);
		if (ctg === "NoteImg") NoteService.addNoteImg(url, imgTitle, color);
		if (ctg === "NoteVideo") NoteService.addNoteVideo(url, color);
		if (ctg === "NoteTodos") NoteService.addNoteTodos(listLabel, todo, color);
	};

	handleChange = ({ target }, infotype, idx) => {
		if (infotype === "todo") {
			var todos = this.state.todo.slice();
			todos[idx] = target.value;
			this.setState((prevState) => ({ ...prevState, todo: todos }));
		} else this.setState((prevState) => ({ info: { ...prevState.info, [infotype]: target.value } }));
	};

	onGoBack = () => {
		this.props.location.pathname = "/keep";
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
			<div onClick={this.onGoBack}>
				<Link className='add-note' to='/keep' />
				<form onSubmit={this.addNote} className='add-note-form'>
					<div className='flex'>
						<button onClick={() => this.setCtg("NoteTxt")} className='fas text add-note-ctg'></button>
						<button onClick={() => this.setCtg("NoteImg")} className='far image add-note-ctg'></button>
						<button onClick={() => this.setCtg("NoteVideo")} className='fab video add-note-ctg'></button>
						<button onClick={() => this.setCtg("NoteTodos")} className='fas list add-note-ctg'></button>
					</div>
					{ctg === "NoteTxt" && (
						<input
							onChange={(ev) => this.handleChange(ev, "text")}
							value={info.text}
							placeholder='enter text here'
							type='text'
						/>
					)}
					{ctg === "NoteImg" && (
						<input
							onChange={(ev) => this.handleChange(ev, "imgTitle")}
							value={info.imgTitle}
							placeholder='enter img title here'
							type='text'
						/>
					)}
					{(ctg === "NoteImg" || ctg === "NoteVideo") && (
						<input
							onChange={(ev) => this.handleChange(ev, "url")}
							value={info.url}
							placeholder='enter url here'
							type='text'
						/>
					)}
					{ctg === "NoteTodos" && (
						<input
							onChange={(ev) => this.handleChange(ev, "listLabel")}
							value={info.listLabel}
							placeholder='enter list label here'
							type='text'
						/>
					)}
					{ctg === "NoteTodos" &&
						todo.map((t, idx) => {
							return (
								<input
									key={idx}
									onChange={(ev) => this.handleChange(ev, "todo", idx)}
									value={todo[idx]}
									placeholder='enter todo here'
									type='text'
								/>
							);
						})}
					{ctg === "NoteTodos" && (
						<button type='button' onClick={() => this.addTodo(todo)}>
							add more todo
						</button>
					)}

					{ctg && (
						<input
							onChange={(ev) => this.handleChange(ev, "color")}
							value={info.color}
							placeholder='enter background color here'
							type='color'
						/>
					)}

					<button>Add Note</button>
				</form>
			</div>
		);
	}
}
