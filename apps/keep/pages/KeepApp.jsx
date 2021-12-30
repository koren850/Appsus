import { NoteService } from "../service/keep.service.js";
import { NoteList } from "../cmps/NoteList.jsx";
import { NoteFillter } from "../cmps/NoteFillter.jsx";
import { AddNote } from "../cmps/AddNote.jsx";

const { Route, Switch } = ReactRouterDOM;

export class KeepApp extends React.Component {
	state = { notes: [], add: false, currNoteUpdate: null };

	componentDidMount() {
		console.log("mounted");
		console.log(NoteService);
		console.log(this.props.location.pathname);
		if (this.props.location.pathname === "/keep/add") this.setState({ add: true });
		this.loadNotes();
	}
	componentDidUpdate() {
		if (!this.state.add && this.props.location.pathname === "/keep/add") this.setState({ add: true });
		if (this.state.add && this.props.location.pathname === "/keep") this.setState({ add: false }, this.loadNotes());
	}

	loadNotes = () => {
		// const { filterBy } = this.state;
		NoteService.query().then((notes) => {
			this.setState({ notes, add: false });
		});
	};

	onClickNote = (ev, note) => {
		ev.stopPropagation();
		this.setState({ currNoteUpdate: note });
		window.location.replace("/index.html#/keep/update");
	};

	render() {
		const { notes } = this.state;

		return (
			<section>
				<Switch>
					<Route component={(ev) => <AddNote loadNotes={this.loadNotes} ev={ev} />} exact path='/keep/add' />
					<Route component={(ev) => <AddNote note={this.state.currNoteUpdate} loadNotes={this.loadNotes} ev={ev} />} exact path='/keep/update' />
				</Switch>
				<header className='keep-header'>Keep app</header>
				<NoteFillter />
				<NoteList onClickNote={this.onClickNote} loadNotes={this.loadNotes} notes={notes} />
			</section>
		);
	}
}
