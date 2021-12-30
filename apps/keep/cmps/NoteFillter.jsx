import { NoteService } from "../service/keep.service.js";
const { Link } = ReactRouterDOM;
export class NoteFillter extends React.Component {
	state = { filterBy: null, currFillter: "text" };

	componentDidMount() {}

	handleChange = ({ target }) => {
		const field = target.name;
		const value = target.type === "number" ? +target.value : target.value;
		this.setState(
			(prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }),
			() => {
				console.log("hello");
				// this.props.onSetFilter(this.state.filterBy);
			}
		);
	};

	setFillter = (fillter) => {
		NoteService.query(fillter);
	};

	render() {
		const { value } = this.state;
		return (
			<section>
				<Link className='fas plus' to='/keep/add'></Link>
				<input className='flex' placeholder='Enter Text' type='text' name='text' value={value} onChange={this.handleChange} />
				<button onClick={() => this.setFillter("NoteTxt")} className='fillter-btn fas text'></button>
				<button onClick={() => this.setFillter("NoteImg")} className='fillter-btn far image'></button>
				<button onClick={() => this.setFillter("NoteVideo")} className='fillter-btn fab video'></button>
				<button onClick={() => this.setFillter("NoteTodos")} className='fillter-btn fas list'></button>
			</section>
		);
	}
}
