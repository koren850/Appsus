import { NoteService } from "../service/keep.service.js";
import { NoteList } from "../cmps/NoteList.jsx";
import { NoteFillter } from "../cmps/NoteFillter.jsx";
import { AddNote } from "../cmps/AddNote.jsx";
import { NotePreview } from "../cmps/NotePreview.jsx";

const { Route, Switch } = ReactRouterDOM;

export class KeepApp extends React.Component {
	state = { notes: [], add: false, currNoteUpdate: null, ctg: null };

	componentDidMount() {
		console.log("mounted");
		if (this.props.location.pathname === "/keep/add") this.setState({ add: true });
		this.loadNotes();
	}
	componentDidUpdate() {
		if (!this.state.add && this.props.location.pathname === "/keep/add") this.setState({ add: true });
		if (this.state.add && this.props.location.pathname === "/keep") this.setState({ add: false }, this.loadNotes());
	}

	loadNotes = (filterBy = null, txtFillter = null) => {
		// const { filterBy } = this.state;
		NoteService.query(filterBy, txtFillter).then((notes) => {
			this.setState({ notes: notes.notes, add: false, ctg: notes.ctg });
		});
	};

	onClickNote = (ev, note) => {
		ev.stopPropagation();
		this.setState({ currNoteUpdate: note });
		window.location.replace("#/keep/update");
	};

	render() {
		const { notes, ctg } = this.state;

		return (
			<section>
				<Switch>
					<Route component={(ev) => <AddNote loadNotes={this.loadNotes} ev={ev} ctg={ctg} />} exact path='/keep/add' />
					<Route component={(ev) => <AddNote note={this.state.currNoteUpdate} loadNotes={this.loadNotes} ev={ev} />} exact path='/keep/update' />
				</Switch>
				<NoteFillter loadNotes={this.loadNotes} ctg={ctg} />
				<section className='note-list'>
					{notes.map((note) => {
						if (note.isPinned) return <NotePreview onClickNote={this.onClickNote} loadNotes={this.loadNotes} key={note.id} note={note} />;
					})}
				</section>
				<hr></hr>
				<NoteList onClickNote={this.onClickNote} loadNotes={this.loadNotes} notes={notes} />
			</section>
		);
	}
}
