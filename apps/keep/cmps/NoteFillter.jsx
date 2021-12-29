export class NoteFillter extends React.Component {
	state = { filterBy: {}, currFillter: "text" };
	componentDidMount() {}

	handleChange = ({ target }) => {
		const field = target.name;
		const value = target.type === "number" ? +target.value : target.value;
		this.setState(
			(prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }),
			() => {
				console.log("hello");
				// this.props.onSetFilter(this.state.filterBy);
			}
		);
	};

	render() {
		const { value } = this.state;
		return (
			<section>
				<input
					className='flex'
					placeholder='Enter Text'
					type='text'
					name='text'
					value={value}
					onChange={this.handleChange}
				/>
				<button className='fas text'></button>
			</section>
		);
	}
}
