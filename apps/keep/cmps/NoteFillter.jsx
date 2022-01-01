import { NoteService } from "../service/keep.service.js";
const { Link } = ReactRouterDOM;
export class NoteFillter extends React.Component {
	state = { ctg: null, textFillter: "" };

	componentDidMount() {}

	componentDidUpdate() {
		console.log("ctg:", this.state.ctg, "text:", this.state.textFillter);
	}

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
			<section className='keep-header'>
				<Link title='Add note' className='fas plus' to='/keep/add'></Link>
				<input className='text-fillter flex' placeholder='Filter by Text' type='search' name='text' value={textFillter} onChange={this.handleChange} />
				<button
					title='Filter by text'
					id={`${this.props.ctg === "NoteTxt" ? "active-ctg" : ""}`}
					value='NoteTxt'
					onClick={this.handleChange}
					className='fillter-btn fas text'></button>
				<button
					title='Filter by image'
					id={`${this.props.ctg === "NoteImg" ? "active-ctg" : ""}`}
					value='NoteImg'
					onClick={this.handleChange}
					className='fillter-btn far image'></button>
				<button
					title='Filter by video'
					id={`${this.props.ctg === "NoteVideo" ? "active-ctg" : ""}`}
					value='NoteVideo'
					onClick={this.handleChange}
					className='fillter-btn fab video'></button>
				<button
					title='Filter by list'
					id={`${this.props.ctg === "NoteTodos" ? "active-ctg" : ""}`}
					value='NoteTodos'
					onClick={this.handleChange}
					className='fillter-btn fas list'></button>
			</section>
		);
	}
}
