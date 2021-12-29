import { NoteTxt } from "./NoteTxt.jsx";
export function NotePreview({ note, type }) {
	let noteCmp = "";
	if (type === "NoteTxt") noteCmp = "NoteTxt";
	if (type === "NoteVideo") noteCmp = "NoteVideo";
	if (type === "NoteImg") noteCmp = "NoteImg";
	if (type === "NoteTodos") noteCmp = "NoteTodos";
	return (
		<section>
			<div className={`note-preview-${note.type}`}>
				{noteCmp === "NoteTxt" && <NoteTxt />}
				{noteCmp === "NoteVideo" && <NoteTxt />}
				{noteCmp === "NoteImg" && <NoteTxt />}
				{noteCmp === "NoteTodos" && <NoteTxt />}
			</div>
		</section>
	);
}
