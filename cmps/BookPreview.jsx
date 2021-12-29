const { Link } = ReactRouterDOM;

export function BookPreview({ book }) {
	function currencySymbolConverter(book) {
		let symbol = "";
		switch (book.listPrice.currencyCode) {
			case "EUR":
				symbol = "€";
				break;
			case "ILS":
				symbol = "₪";
				break;
			case "USD":
				symbol = "$";
				break;
		}
		return symbol;
	}

	return (
		<Link className='clean-link' to={`/book/${book.id}`}>
			<div className='book-preview'>
				<h2>title: {book.title}</h2>
				<img src={book.thumbnail} alt='' />
				<h2>
					price: {book.listPrice.amount}
					{currencySymbolConverter(book)}
				</h2>
			</div>
		</Link>
	);
}
