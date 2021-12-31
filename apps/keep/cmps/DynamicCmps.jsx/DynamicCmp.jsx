import { NoteTxt } from "../types/NoteTxt.jsx";
import { NoteVideo } from "../types/NoteVideo.jsx";
import { NoteImg } from "../types/NoteImg.jsx";
import { NoteTodos } from "../types/NoteTodos.jsx";
import { NoteService } from "../../service/keep.service.js";
import { swalService } from "../../../../services/swal.service.js";

export function DynamicCmp({ note, onMousetoggle, isHover, loadNotes, click }) {
	function deleteNote(id) {
		NoteService.deleteNote(id);
		loadNotes();
	}

	function approveDelete(ev, id) {
		ev.stopPropagation();
		swalService.checkAgain(deleteNote, id);
	}

	function duplicateNote(ev, id) {
		ev.stopPropagation();
		NoteService.duplicateNote(id);
		loadNotes();
		swalService.userModal(undefined, "Note duplicated ");
	}
	function updateNote(ev, note) {
		console.log(note);
		click(ev, note);
		ev.stopPropagation();
	}

	function getCmp(note) {
		switch (note.type) {
			case "NoteTxt":
				return (
					<NoteTxt
						update={updateNote}
						duplicate={duplicateNote}
						delete={approveDelete}
						onMousetoggle={onMousetoggle}
						isHover={isHover}
						note={note}
						color={note.style.backgroundColor}
					/>
				);
			case "NoteImg":
				return (
					<NoteImg
						update={updateNote}
						duplicate={duplicateNote}
						delete={approveDelete}
						onMousetoggle={onMousetoggle}
						isHover={isHover}
						note={note}
						color={note.style.backgroundColor}
					/>
				);
			case "NoteTodos":
				return (
					<NoteTodos
						update={updateNote}
						duplicate={duplicateNote}
						delete={approveDelete}
						onMousetoggle={onMousetoggle}
						isHover={isHover}
						note={note}
						color={note.style.backgroundColor}
					/>
				);

			case "NoteVideo":
				return (
					<NoteVideo
						update={updateNote}
						duplicate={duplicateNote}
						delete={approveDelete}
						onMousetoggle={onMousetoggle}
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
