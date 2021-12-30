import { NoteTxt } from "../types/NoteTxt.jsx";
import { NoteVideo } from "../types/NoteVideo.jsx";
import { NoteImg } from "../types/NoteImg.jsx";
import { NoteTodos } from "../types/NoteTodos.jsx";
export function DynamicCmp({ note }) {
	function getCmp(note) {
		switch (note.type) {
			case "NoteTxt":
				return <NoteTxt note={note} color={note.style.backgroundColor} />;
			case "NoteImg":
				return <NoteImg note={note} color={note.style.backgroundColor} />;
			case "NoteTodos":
				return <NoteTodos note={note} color={note.style.backgroundColor} />;

			case "NoteVideo":
				return <NoteVideo note={note} color={note.style.backgroundColor} />;
			default:
				return <React.Fragment></React.Fragment>;
		}
	}
	return getCmp(note);
}
