export class NoteTodos extends React.Component {
	state = {};
	componentDidMount() {
		console.log(this.props.note.info.todos);
	}

	render() {
		return (
			<section>
				<div> {this.props.note.info.label}</div>
				<ul>
					{this.props.note.info.todos.map((todo, idx) => {
						return <li key={idx}>{todo.txt}</li>;
					})}
				</ul>
			</section>
		);
	}
}
