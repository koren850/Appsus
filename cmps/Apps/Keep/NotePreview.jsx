export function NotePreview({ note }) {
	return (
		<div className='book-preview'>
			<h2>title: {note.title}</h2>
			<img src={note.thumbnail} alt='' />
			<h2>
				price: {note.listPrice.amount}
				{currencySymbolConverter(note)}
			</h2>
		</div>
	);
}
