import { NoteService } from "../services/keep.service.js";
import { NoteList } from "../cmps/Apps/Keep/NoteList.jsx";

export class KeepApp extends React.Component {
	state = { notes: [] };

	componentDidMount() {
		console.log("mounted");
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
				<header className='keep-header'></header>
				<div>KeepApp app</div>
				<NoteList notes={notes} />
			</section>
		);
	}
}
