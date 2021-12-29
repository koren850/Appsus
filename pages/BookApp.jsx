import { BookService } from "../services/book.service.js";
import { BookList } from "../cmps/Apps/Books/BookList.jsx";
import { BookFilter } from "../cmps/Apps/Books/BookFilter.jsx";
import { AddBook } from "../cmps/Apps/Books/AddBook.jsx";

export class BookApp extends React.Component {
	state = { books: [], filterBy: null };

	componentDidMount() {
		this.loadBooks();
		console.log("book app mounted!");
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
				<header className='main-header'>
					<AddBook loadBooks={this.loadBooks} />
				</header>
				<BookFilter filterBy={this.state.filterBy} onSetFilter={this.onSetFilter} />
				<BookList books={books} />
			</section>
		);
	}
}
