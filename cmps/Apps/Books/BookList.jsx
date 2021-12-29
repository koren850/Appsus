import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books }) {
	if (!books.length) return <h1>There are no books to show</h1>;
	return (
		<section className='book-list'>
			{books.map((book) => (
				<BookPreview key={book.id} book={book} />
			))}
		</section>
	);
}
