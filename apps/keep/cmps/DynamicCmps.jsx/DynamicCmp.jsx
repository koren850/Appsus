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

	function togglePin(ev, id) {
		ev.stopPropagation();
		NoteService.togglePin(id);
		loadNotes();
	}

	function send(ev, note) {
		ev.stopPropagation();
		if (note.type === "NoteImg" || note.type === "NoteVideo")
			window.location.replace(`#/mail/compose?title=${note.info.title.replace(" ", "+")}&subject=${note.info.url.replace(" ", "+")}`);
		if (note.type === "NoteTxt") window.location.replace(`#/mail/compose?title=Text+note&subject=${note.info.txt.replace(" ", "+")}`);
		if (note.type === "NoteTodos") {
			var todos = note.info.todos.map((todo, idx) => `${idx + 1}. ${todo.txt}%0D%0A`);
			console.log(todos);
			window.location.replace(`#/mail/compose?title=${note.info.label.replace(" ", "+")}&subject=${todos.join("")}`);
		}
	}

	function getCmp(note) {
		switch (note.type) {
			case "NoteTxt":
				return (
					<NoteTxt
						update={updateNote}
						duplicate={duplicateNote}
						delete={approveDelete}
						pin={togglePin}
						send={send}
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
						pin={togglePin}
						send={send}
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
						pin={togglePin}
						send={send}
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
						pin={togglePin}
						send={send}
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
