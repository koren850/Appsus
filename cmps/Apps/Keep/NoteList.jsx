import { NotePreview } from "./NotePreview.jsx";
export function NoteList({ notes }) {
	if (!notes.length) return <h1>There are no books to show</h1>;
	return (
		<section className='note-list'>
			{notes.map((note) => (
				<NotePreview key={note.id} note={note} />
			))}
		</section>
	);
}
