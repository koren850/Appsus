import { NoteService } from "../service/keep.service.js";
const { Link } = ReactRouterDOM;
export class AddNote extends React.Component {
	state = { type: {} };
	componentDidMount() {
		console.log("hello");
	}
	onGoBack = () => {
		this.props.location.pathname = "/keep";
	};

	render() {
		return (
			<div onClick={this.onGoBack}>
				<Link className='add-note' to='/keep' />
				<form className='add-note-form'>
					<div className='flex'>
						<button className='fas text add-note-ctg'></button>
						<button className='far image add-note-ctg'></button>
						<button className='fab video add-note-ctg'></button>
						<button className='fas list add-note-ctg'></button>
					</div>
					<input placeholder='enter text here' type='text' />
				</form>
			</div>
		);
	}
}
