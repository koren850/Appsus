export class NoteVideo extends React.Component {
	state = {};
	componentDidMount() {
		console.log(this.props);
	}

	render() {
		return (
			<section>
				<div>video</div>
				{/* <iframe width='480' height='360' src={this.props.info.url}></iframe> */}
			</section>
		);
	}
}
