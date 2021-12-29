import { NoteTxt } from "./types/NoteTxt.jsx";
import { NoteVideo } from "./types/NoteVideo.jsx";
import { NoteImg } from "./types/NoteImg.jsx";
import { NoteTodos } from "./types/NoteTodos.jsx";
export function NotePreview({ note }) {
	const type = note.type;
	console.log(type);

	return (
		<section>
			<div className={`note-preview-${note.type}`}>
				{type === "NoteTxt" && <NoteTxt note={note} />}
				{type === "NoteVideo" && <NoteVideo note={note} />}
				{type === "NoteImg" && <NoteImg note={note} />}
				{type === "NoteTodos" && <NoteTodos note={note} />}
			</div>
		</section>
	);
}
