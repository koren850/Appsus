import { LongTxt } from "../../../cmps/LongTxt.jsx";
import { BookService } from "../../../services/book.service.js";
import { ReviewAdd } from "./ReviewAdd.jsx";
import { eventBusService } from "../../../services/event-bus.service.js";

const { Link } = ReactRouterDOM;

export class BookDetails extends React.Component {
	state = {
		book: null,
	};

	componentDidMount() {
		console.log("done");
		this.loadBook();
	}
	componentDidUpdate(prevProps, prevState) {
		console.log(prevProps.match.params);
		if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
			this.loadBook();
		}
	}

	loadBook = () => {
		const { bookId } = this.props.match.params;
		console.log("bookId in bookDetails", bookId);
		BookService.getBookById(bookId).then((book) => {
			if (!book) return this.props.history.push("/");
			this.setState({ book });
		});
	};

	checkBookPageCount = (pageCount) => {
		console.log(pageCount);
		if (pageCount > 500) return "Long reading";
		else if (pageCount > 200) return "Decent Reading";
		else if (pageCount < 100) return "Light Reading";
		else return;
	};

	checkBookPulishDate = (publishedDate) => {
		var date = new Date();
		var year = date.getFullYear();
		if (year - publishedDate > 10) return "Veteran Book";
		else if (year - publishedDate <= 1) return "New!";
	};

	getPriceColor = (price) => {
		console.log(price);
		if (price > 150) return "high";
		else if (price <= 20) return "low";
	};
	onGoBack = () => {
		this.props.history.push("/book");
	};

	getReviews = (book) => {
		if (!book) return;
		if (!book.reviews || book.reviews === []) return <p>no reviews yet</p>;
		var books = book.reviews.map((review, idx) => {
			return (
				<div key={idx}>
					<div>Review by:{review.name}</div>
					<div>Rate:{review.rate}</div>
					<div>Date:{review.date}</div>
					<div>review:{review.review}</div>
					<button onClick={() => this.ondeleteReview(idx, book)}>Delete review</button>
				</div>
			);
		});
		return books;
	};

	ondeleteReview = (idx, book) => {
		BookService.deleteReview(idx, book);
		eventBusService.emit("user-msg", { txt: `Review was deleted!`, type: "danger" });
		this.loadBook();
	};

	render() {
		const { book } = this.state;

		if (!book) return <div>hello</div>;
		return (
			<div className='book-details'>
				<h4>Id:{book.id}</h4>
				<h4>Title:{book.title}</h4>
				<h4>Authors:{book.authors.map((auth) => ` ${auth}`)}</h4>
				<h4>
					PublishedDate:{book.publishedDate} {this.checkBookPulishDate(book.publishedDate)}
				</h4>
				<h4>Description:</h4>
				<LongTxt text={book.description} />
				<h4>
					Page count:{book.pageCount} {this.checkBookPageCount(book.pageCount)}{" "}
				</h4>
				<h1 className='low'>{book.listPrice.isOnSale ? "ON SALE!" : ""}</h1>
				<h4>Categories:{book.categories.map((cat) => ` ${cat}`)}</h4>
				<img src={book.thumbnail} alt='' />
				<h4>Language:{book.language}</h4>
				<h4 className={this.getPriceColor(book.listPrice.amount)}>
					Price:{book.listPrice.amount}
					{book.listPrice.currencyCode}
				</h4>
				<div>
					<Link to={`/book/${BookService.getNearBookId(book.id, 1)}`}>Next book</Link>
				</div>
				<div>
					<Link to={`/book/${BookService.getNearBookId(book.id, -1)}`}>Previous book</Link>
				</div>
				<ReviewAdd book={book} render={this.loadBook} />
				<h4>{this.getReviews(book)}</h4>
				<button className='primary-btn' onClick={this.onGoBack}>
					Go back
				</button>
			</div>
		);
	}
}
