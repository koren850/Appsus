import { NotePreview } from "./NotePreview.jsx";
export function NoteList({ notes, loadNotes, onClickNote }) {
	if (!notes.length) return <h1>There are no notes to show</h1>;
	return (
		<section className='note-list flex'>
			{notes.map((note) => (
				<NotePreview onClickNote={onClickNote} loadNotes={loadNotes} key={note.id} note={note} />
			))}
		</section>
	);
}
