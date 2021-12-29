import { NoteService } from "../service/keep.service.js";
import { NoteList } from "../cmps/NoteList.jsx";
import { NoteFillter } from "../cmps/NoteFillter.jsx";
import { AddNote } from "../cmps/AddNote.jsx";

const { Route, Switch } = ReactRouterDOM;

export class KeepApp extends React.Component {
	state = { notes: [], add: false };

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

	render() {
		const { notes, add } = this.state;

		return (
			<section>
				<Route component={AddNote} exact path='/keep/add' />
				<header className='keep-header'>Keep app</header>
				<NoteFillter />
				<NoteList notes={notes} />
			</section>
		);
	}
}
