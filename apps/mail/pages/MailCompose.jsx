import { mailService } from "../services/mail.service.js";
import { utilsService } from "../../../services/utils.service.js";
import { swalService } from "../../../services/swal.service.js";
export class MailCompose extends React.Component {
	state = { isDraft: false, mail: { to: "", title: "", subject: "", id: utilsService.generateId() } };

	componentDidMount() {
		console.log(this.props);
		const urlSearchParams = new URLSearchParams(this.props.location.search);
		if (urlSearchParams.get("to") || urlSearchParams.get("title") || urlSearchParams.get("subject") || urlSearchParams.get("id")) {
			this.setState((prev) => ({
				...prev,
				mail: {
					...prev.mail,
					to: urlSearchParams.get("to"),
					title: urlSearchParams.get("title"),
					subject: urlSearchParams.get("subject"),
					id: urlSearchParams.get("id") || utilsService.generateId(),
				},
			}));
		}
	}

	handleChange = ({ target }) => {
		const field = target.name;
		const value = target.value;
		this.setState((prevState) => ({ ...prevState, mail: { ...prevState.mail, [field]: value } }));
	};

	createMail = (ev) => {
		ev.preventDefault();
		const values = Array.from(ev.target);
		let emptyValue;
		values.map(({ value }, idx) => {
			if (this.state.isDraft || idx > 3 || idx === 2) return;
			if (!value) {
				if (emptyValue) return;
				switch (idx) {
					case 0:
						emptyValue = "Destiny Cant Be Empty !";
						return;
					case 1:
						emptyValue = "Title Cant Be Empty !";
						return;
					case 3:
						emptyValue = "Body Cant Be Empty !";
						return;
				}
			}
		});
		if (emptyValue) return swalService.userModal("warning", emptyValue);
		const mail = {
			id: this.state.mail.id,
			subject: values[1].value,
			body: values[3].value,
			isRead: true,
			isSent: true,
			isStar: false,
			isDraft: false,
			isDeleted: false,
			sentAt: new Date(),
			from: mailService.getUser().mail,
			to: values[0].value,
		};
		if (this.state.isDraft) {
			console.log(this.state.isDraft);
			mail.isDraft = true;
			mailService.addMail(mail);
			swalService.userModal("success", "Draft Added");
			this.setState({ isDraft: false });
			return;
		}
		window.location.replace("#/mail");
		mailService.addMail(mail);
		swalService.userModal("success", "Mail sent");
	};

	deleteMail = () => {
		swalService.checkAgain(this.deleteConfirm);
	};

	deleteConfirm = () => {
		window.location.replace("#/mail");
		swalService.userModal("error", "Mail Deleted");
	};
	sendAsNote = () => {
		window.location.replace(`#/keep/add?content=${this.state.mail.subject.replace(" ", "+")}`);
	};

	render() {
		const { to, title, subject } = this.state.mail;
		return (
			<section className={"mail-compose container"}>
				<header className={"mail-compose line layout"}>
					<span>New Message :</span>
				</header>
				<form onSubmit={this.createMail}>
					<article className={"mail-compose line layout"}>
						<label htmlFor='to'>To :</label>
						<input value={to} name='to' onChange={this.handleChange} type='email' id='to' placeholder='Example@Jmail.com.' />
					</article>
					<article className={"mail-compose line layout"}>
						<label htmlFor='cc'>Title :</label>
						<input value={title} name='title' onChange={this.handleChange} type='text' id='cc' placeholder="Example Example Eat's FalaFel..." />
					</article>
					<article className={"mail-compose line layout"}>
						<label htmlFor='bcc'>Bcc :</label>
						<input type='text' id='bcc' placeholder='Example@Jmail.com , ExampleFather@Jmail.com ,ExampleBaby@Jmail.com.' />
					</article>
					<section className={"mail-compose line layout"}>
						<article className={"layout"}>
							<label htmlFor='subject'>Subject :</label>
							<textarea value={subject} onChange={this.handleChange} name='subject' id='subject' />
						</article>
					</section>
					<footer className={"flex"} id={"center"}>
						<button className={"send far sent-btn"}></button>
						<button className={"far draft-btn"} onClick={() => this.setState({ isDraft: true })}></button>
						<button className={"far trash"} type='button' onClick={this.deleteMail}></button>
						<button className={"fas note-send"} type='button' onClick={this.sendAsNote}></button>
					</footer>
				</form>
			</section>
		);
	}
}
