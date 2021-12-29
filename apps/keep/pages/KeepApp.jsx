import { NoteService } from "../service/keep.service.js";
import { NoteList } from "../cmps/NoteList.jsx";
import { NoteFillter } from "../cmps/NoteFillter.jsx";

export class KeepApp extends React.Component {
	state = { notes: [] };

	componentDidMount() {
		console.log("mounted");
		this.loadNotes();
	}

	loadNotes = () => {
		// const { filterBy } = this.state;
		NoteService.query().then((notes) => {
			this.setState((prev) => ({ ...prev, notes }));
		});
	};

	render() {
		const { notes } = this.state;
		return (
			<section>
				<header className='keep-header'>Keep app</header>
				<NoteFillter />
				<NoteList notes={notes} />
			</section>
		);
	}
}
