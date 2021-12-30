import { DynamicCmp } from "./DynamicCmps.jsx/DynamicCmp.jsx";
import { AddNote } from "../cmps/AddNote.jsx";
export class NotePreview extends React.Component {
	state = { isHover: false };

	componentDidMount() {}

	onMousetoggle = (val) => {
		this.setState({ isHover: val });
	};

	render() {
		const { isHover } = this.state;
		return <DynamicCmp click={this.props.onClickNote} loadNotes={this.props.loadNotes} onMousetoggle={this.onMousetoggle} isHover={isHover} note={this.props.note} />;
	}
}
// export function NotePreview({ note }) {
// 	return <DynamicCmp note={note} />;
// }
