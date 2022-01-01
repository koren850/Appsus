import { mailService } from "../services/mail.service.js";
import { utilsService } from "../../../services/utils.service.js";
import { swalService } from "../../../services/swal.service.js";
export class MailCompose extends React.Component {

    state = { isDraft: false }

	createMail = (ev) => {
        ev.preventDefault();
		const values = Array.from(ev.target);
        let emptyValue;
        values.map(({value}, idx) => {
            if (this.state.isDraft || idx > 3 || idx === 2) return;
            if (!value) {
                if (emptyValue) return;
                    switch (idx) {
                    case 0:emptyValue = 'Destiny Cant Be Empty !';
                    return;
                    case 1:emptyValue = 'Title Cant Be Empty !';
                    return;
                    case 3:emptyValue = 'Body Cant Be Empty !';
                    return;
                }
            }
        })
        if (emptyValue) return swalService.userModal('warning', emptyValue);
        const mail = {
            id: utilsService.generateId(),
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
            console.log(this.state.isDraft)
             mail.isDraft = true;
             mailService.addMail(mail);
		swalService.userModal("success", "Draft Added");
        this.setState({isDraft:false});
        return
            }
		window.location.replace("/index.html#/mail");
		mailService.addMail(mail);
		swalService.userModal("success", "Mail sent");
	}

    deleteMail = () => {
        swalService.checkAgain(this.deleteConfirm);
    }

	deleteConfirm = () => {
		window.location.replace("/index.html#/mail");
		swalService.userModal("error", "Mail Deleted");
	};

	render() {
		return (
			<section className={"mail-compose container"}>
				<header className={"mail-compose line"}><span>New Message :</span></header>
				<form onSubmit={this.createMail}>
					<article className={"mail-compose line"}>
						<label htmlFor='to'>To :</label>
						<input type='email' id='to' placeholder='Example@Jmail.com.' />
					</article>
					<article className={"mail-compose line"}>
						<label htmlFor='cc'>Title :</label>
						<input type='text' id='cc' placeholder="Example Example Eat's FalaFel..." />
					</article>
					<article className={"mail-compose line"}>
						<label htmlFor='bcc'>Bcc :</label>
						<input type='text' id='bcc' placeholder='Example@Jmail.com , ExampleFather@Jmail.com ,ExampleBaby@Jmail.com.' />
					</article>
					<article>
						<label htmlFor='subject'>Subject :</label>
						<textarea id='subject' />
					</article>
					<main></main>
					<footer>
						<button className={"mail-compose send"}>Send</button>
						<button className={"mail-compose far edit"} onClick={()=>this.setState({isDraft:true})}></button>
						<button className={"mail-compose fas trash"} type='button' onClick={this.deleteMail}></button>
					</footer>
				</form>
			</section>
		);
	}
}
