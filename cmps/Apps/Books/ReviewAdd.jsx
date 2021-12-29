import { BookService } from "../../../services/book.service.js";
import { eventBusService } from "../../../services/event-bus.service.js";

export class ReviewAdd extends React.Component {
	state = {
		review: {
			name: "",
			rate: "",
			date: new Date().toISOString().split("T")[0],
			text: "",
		},
	};

	inputRef = React.createRef();

	componentDidMount() {
		this.inputRef.current.focus();
	}

	handleChange = ({ target }) => {
		const field = target.name;
		const value = target.type === "number" ? +target.value : target.value;
		this.setState((prevState) => ({ review: { ...prevState.review, [field]: value } }));
	};

	onSubmit = (ev) => {
		ev.preventDefault();
		const { review } = this.state;
		const bookId = this.props.book.id;
		console.log(review, bookId);
		BookService.addReview(bookId, review);
		eventBusService.emit("user-msg", { txt: `Review by ${review.name} was added!`, type: "happy" });
		this.props.render();
	};
	render() {
		return (
			<section className='review-add'>
				<h1>Post your review:</h1>
				<form onSubmit={this.onSubmit}>
					<div className='name'>
						<label htmlFor='by-name'>Name:</label>
						<input
							ref={this.inputRef}
							onChange={this.handleChange}
							placeholder='Enter name'
							name='name'
							type='text'
							id='by-name'
						/>
					</div>
					<div className='rate'>
						<label htmlFor='rate'>Rate:</label>
						<select onChange={this.handleChange} name='rate' id='rate'>
							<option value='1'>⭐</option>
							<option value='2'>⭐⭐</option>
							<option value='3'>⭐⭐⭐</option>
							<option value='4'>⭐⭐⭐⭐</option>
							<option value='5'>⭐⭐⭐⭐⭐</option>
						</select>
					</div>
					<div className='date'>
						<label htmlFor='date'>Read date:</label>
						<input value={this.state.review.date} onChange={this.handleChange} name='date' type='date' id='date' />
					</div>
					<div className='review'>
						<label htmlFor='review'>Review:</label>
						<textarea onChange={this.handleChange} id='review' name='review' placeholder='Enter review'></textarea>
					</div>
					<button className='primary-btn '>Add review</button>
				</form>
			</section>
		);
	}
}
