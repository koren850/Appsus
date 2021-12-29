import { DynamicCmp } from "./DynamicCmps.jsx/DynamicCmp.jsx";
export function NotePreview({ note }) {
	return <DynamicCmp note={note} />;
}
