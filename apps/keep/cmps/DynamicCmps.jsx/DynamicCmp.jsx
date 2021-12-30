import { NoteTxt } from "../types/NoteTxt.jsx";
import { NoteVideo } from "../types/NoteVideo.jsx";
import { NoteImg } from "../types/NoteImg.jsx";
import { NoteTodos } from "../types/NoteTodos.jsx";
import { NoteService } from "../../service/keep.service.js";
export function DynamicCmp({ note, onMouseEnter, onMouseLeave, isHover, loadNotes }) {
	function deleteNote(id) {
		NoteService.deleteNote(id);
		loadNotes();
	}

	function duplicateNote(id) {
		NoteService.duplicateNote(id);
		loadNotes();
	}

	function getCmp(note) {
		switch (note.type) {
			case "NoteTxt":
				return (
					<NoteTxt
						duplicate={duplicateNote}
						delete={deleteNote}
						onMouseEnter={onMouseEnter}
						onMouseLeave={onMouseLeave}
						isHover={isHover}
						note={note}
						color={note.style.backgroundColor}
					/>
				);
			case "NoteImg":
				return (
					<NoteImg
						duplicate={duplicateNote}
						delete={deleteNote}
						onMouseEnter={onMouseEnter}
						onMouseLeave={onMouseLeave}
						isHover={isHover}
						note={note}
						color={note.style.backgroundColor}
					/>
				);
			case "NoteTodos":
				return (
					<NoteTodos
						duplicate={duplicateNote}
						delete={deleteNote}
						onMouseEnter={onMouseEnter}
						onMouseLeave={onMouseLeave}
						isHover={isHover}
						note={note}
						color={note.style.backgroundColor}
					/>
				);

			case "NoteVideo":
				return (
					<NoteVideo
						duplicate={duplicateNote}
						delete={deleteNote}
						onMouseEnter={onMouseEnter}
						onMouseLeave={onMouseLeave}
						isHover={isHover}
						note={note}
						color={note.style.backgroundColor}
					/>
				);
			default:
				return <React.Fragment></React.Fragment>;
		}
	}
	return getCmp(note);
}
