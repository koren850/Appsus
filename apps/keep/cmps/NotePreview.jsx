import { DynamicCmp } from "./DynamicCmps.jsx/DynamicCmp.jsx";
export class NotePreview extends React.Component {
	state = { isHover: false };

	componentDidMount() {}

	onMousetoggle = (val) => {
		this.setState({ isHover: val });
	};

	render() {
		const { isHover } = this.state;
		return (
			<DynamicCmp
				loadNotes={this.props.loadNotes}
				onMouseEnter={() => this.onMousetoggle(true)}
				onMouseLeave={() => this.onMousetoggle(false)}
				isHover={isHover}
				note={this.props.note}
			/>
		);
	}
}
// export function NotePreview({ note }) {
// 	return <DynamicCmp note={note} />;
// }
