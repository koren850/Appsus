import { NoteService } from "../service/keep.service.js";
const { Link } = ReactRouterDOM;
export class NoteFillter extends React.Component {
	state = { filterBy: {}, currFillter: "text" };

	componentDidMount() {}

	handleChange = ({ target }) => {
		const field = "ctg";
		const value = target.type === "number" ? +target.value : target.value;
		if (value === this.state.filterBy[field]) {
			this.setState(
				(prevState) => ({ filterBy: { ...prevState.filterBy, [field]: null } }),
				() => {
					this.props.loadNotes();
				}
			);
		} else {
			this.setState(
				(prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }),
				() => {
					this.props.loadNotes(this.state.filterBy);
				}
			);
		}
	};

	render() {
		const { value } = this.state;
		return (
			<section>
				<Link className='fas plus' to='/keep/add'></Link>
				<input className='flex' placeholder='Enter Text' type='text' name='text' value={value} onChange={this.handleChange} />
				<button id={`${this.props.ctg === "NoteTxt" ? "active-ctg" : ""}`} value='NoteTxt' onClick={this.handleChange} className='fillter-btn fas text'></button>
				<button id={`${this.props.ctg === "NoteImg" ? "active-ctg" : ""}`} value='NoteImg' onClick={this.handleChange} className='fillter-btn far image'></button>
				<button id={`${this.props.ctg === "NoteVideo" ? "active-ctg" : ""}`} value='NoteVideo' onClick={this.handleChange} className='fillter-btn fab video'></button>
				<button id={`${this.props.ctg === "NoteTodos" ? "active-ctg" : ""}`} value='NoteTodos' onClick={this.handleChange} className='fillter-btn fas list'></button>
			</section>
		);
	}
}
