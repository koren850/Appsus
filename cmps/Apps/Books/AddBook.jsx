import { BookService } from "../../../services/book.service.js";
import { eventBusService } from "../../../services/event-bus.service.js";
export class AddBook extends React.Component {
	state = {
		bookName: "",
		bookList: "",
	};

	handleChange = ({ target }) => {
		const value = target.value;
		this.setState((prevState) => ({ ...prevState, bookName: value }));
	};
	addBook = (ev) => {
		ev.preventDefault();
		BookService.getBookFromApi(this.state.bookName).then((list) => {
			this.createList(list);
		});
	};
	createList = (list) => {
		this.setState((prev) => ({ ...prev, bookList: list }));
	};

	addBookFromList = (book) => {
		BookService.addBook(book)
			.then(() => {
				this.props.loadBooks();
			})
			.then(() => {
				eventBusService.emit("user-msg", {
					txt: `Book ${book.volumeInfo.title || ""} is Added !`,
					type: "happy",
					link: book.id,
				});
			});
	};

	render() {
		const { bookName, bookList } = this.state;
		return (
			<div className='add-book'>
				<form onSubmit={this.addBook}>
					<label htmlFor='add-book'>Add Book:</label>
					<input
						value={bookName}
						placeholder='Enter Book name'
						type='text'
						id='add-book'
						name='name'
						onChange={this.handleChange}
					/>
					<button>Add book</button>
				</form>
				{bookList && bookList.totalItems !== 0 && (
					<ul className='book-list-api'>
						{bookList.items.map((item) => {
							return (
								<li key={item.id}>
									{item.volumeInfo.title} <button onClick={() => this.addBookFromList(item)}>+</button>
								</li>
							);
						})}
					</ul>
				)}
			</div>
		);
	}
}
