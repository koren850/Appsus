export class NoteVideo extends React.Component {
	state = {};
	componentDidMount() {
		console.log(this.props.note.type);
	}

	emedUrl = (url) => {
		return url.replace("https://www.youtube.com/watch?v=", "");
	};

	render() {
		return (
			<div
				onMouseEnter={() => this.props.onMousetoggle(true)}
				onMouseLeave={() => this.props.onMousetoggle(false)}
				style={{ backgroundColor: this.props.color }}
				className={`note-preview note-video`}>
				<h2 className='video-label'>{this.props.note.info.title}</h2>
				<iframe
					width='300'
					height='400'
					style={{ border: `20px solid ${this.props.note.style.backgroundColor}`, borderTop: 0, borderWidth: "0px 20px 2.5rem" }}
					frameBorder='3'
					allow='autoplay; enctypted-media'
					allowFullScreen
					title='video'
					src={`https://www.youtube.com/embed/${this.emedUrl(this.props.note.info.url)}`}></iframe>
				{this.props.isHover && <button onClick={(ev) => this.props.delete(ev, this.props.note.id)} className='fas trash' id='delete-note'></button>}
				{this.props.isHover && <button onClick={(ev) => this.props.duplicate(ev, this.props.note.id)} className='fas duplicate' id='duplicate-note'></button>}
				{this.props.isHover && <button onClick={(ev) => this.props.update(ev, this.props.note)} className='far edit' id='edit-note'></button>}
			</div>
		);
	}
}
