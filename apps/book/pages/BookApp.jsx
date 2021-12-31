import { BookService } from "../services/book.service.js";
import { BookList } from "../cmps/BookList.jsx";
import { BookFilter } from "../cmps/BookFilter.jsx";
import { AddBook } from "../cmps/AddBook.jsx";
import { BookDetails } from "./BookDetails.jsx";

const { Route, Switch } = ReactRouterDOM;
export class BookApp extends React.Component {
	state = { books: [], filterBy: null };

	componentDidMount() {
		this.loadBooks();
	}

	loadBooks = () => {
		const { filterBy } = this.state;
		BookService.query(filterBy).then((books) => {
			this.setState((prev) => ({ ...prev, books }));
		});
	};

	onSetFilter = (filterBy) => {
		this.setState({ filterBy }, this.loadBooks);
	};

	render() {
		const { books } = this.state;
		return (
			<section>
				<header className='book-header'>
					<AddBook loadBooks={this.loadBooks} />
				</header>
				{this.props.match.path === "/book" && <BookFilter filterBy={this.state.filterBy} onSetFilter={this.onSetFilter} />}
				<Switch>
					<Route component={BookDetails} path='/book/:bookId' />
					<BookList books={books} />
				</Switch>
			</section>
		);
	}
}
