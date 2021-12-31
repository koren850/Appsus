import { NotePreview } from "./NotePreview.jsx";
export function NoteList({ notes, loadNotes, onClickNote }) {
	if (!notes.length) return <h1 className='no-notes'>There are no notes to show</h1>;
	return (
		<section className='note-list'>
			{notes.map((note) => (
				<NotePreview onClickNote={onClickNote} loadNotes={loadNotes} key={note.id} note={note} />
			))}
		</section>
	);
}
