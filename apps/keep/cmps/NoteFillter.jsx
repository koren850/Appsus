import { NoteService } from "../service/keep.service.js";
const { Link } = ReactRouterDOM;
export class NoteFillter extends React.Component {
	state = { ctg: null, textFillter: "" };

	componentDidMount() {}

	handleChange = ({ target }) => {
		if (target.name === "text") {
			this.setState({ textFillter: target.value }, () => {
				this.props.loadNotes(this.state.ctg, this.state.textFillter);
			});
			return;
		}
		const value = target.type === "number" ? +target.value : target.value;
		if (value === this.state.ctg) {
			this.setState(
				(prevState) => ({ ...prevState, ctg: null, textFillter: "" }),
				() => {
					this.props.loadNotes();
				}
			);
		} else {
			this.setState(
				(prevState) => ({ ...prevState, ctg: value, textFillter: "" }),
				() => {
					this.props.loadNotes(this.state.ctg, null);
				}
			);
		}
	};

	render() {
		const { textFillter } = this.state;
		return (
			<section>
				<Link className='fas plus' to='/keep/add'></Link>
				<input className='flex' placeholder='Enter Text' type='search' name='text' value={textFillter} onChange={this.handleChange} />
				<button id={`${this.props.ctg === "NoteTxt" ? "active-ctg" : ""}`} value='NoteTxt' onClick={this.handleChange} className='fillter-btn fas text'></button>
				<button id={`${this.props.ctg === "NoteImg" ? "active-ctg" : ""}`} value='NoteImg' onClick={this.handleChange} className='fillter-btn far image'></button>
				<button id={`${this.props.ctg === "NoteVideo" ? "active-ctg" : ""}`} value='NoteVideo' onClick={this.handleChange} className='fillter-btn fab video'></button>
				<button id={`${this.props.ctg === "NoteTodos" ? "active-ctg" : ""}`} value='NoteTodos' onClick={this.handleChange} className='fillter-btn fas list'></button>
			</section>
		);
	}
}
