<<<<<<< HEAD
import { mailService } from "../services/mail.service.js";
import { utilsService } from "../../../services/utils.service.js";
import { swalService } from "../../../services/swal.service.js";
=======
import { mailService } from '../services/mail.service.js'
import {utilsService} from '../../../services/utils.service.js'
import {swalService} from '../../../services/swal.service.js'
>>>>>>> 6f5ce0dbed71ebe87aa94f681f85946c892264b9
export class MailCompose extends React.Component {
	createMail = (ev) => {
		ev.preventDefault();
		const values = Array.from(ev.target);
		const mail = {
			id: utilsService.generateId(),
			subject: values[1].value,
			body: values[3].value,
			isRead: false,
			isSent: true,
			isStar: false,
			isDeleted: false,
			sentAt: new Date(),
			from: mailService.getUser().mail,
			to: values[0].value,
		};
		window.location.replace("/index.html#/mail");
		mailService.addMail(mail);
		swalService.userModal("success", "Mail sent");
	};

<<<<<<< HEAD
	deleteMail = () => {
		swalService.checkAgain(this.deleteConfirm);
	};
=======
    createMail =(ev) => {
        ev.preventDefault();
        const values = Array.from(ev.target);
        const mail = {
            id: utilsService.generateId(),
            subject: values[1].value,
            body: values[3].value,
            isRead: false,
            isSent: true,
            isStar: false,
            isDraft: false,
            isDeleted:false,
            sentAt: new Date(),
            from: mailService.getUser().mail,
            to: values[0].value,
        }
        window.location.replace('/index.html#/mail');
        mailService.addMail(mail);
        swalService.userModal('success', 'Mail sent');
    }
>>>>>>> 6f5ce0dbed71ebe87aa94f681f85946c892264b9

	deleteConfirm = () => {
		window.location.replace("/index.html#/mail");
		swalService.userModal("error", "Mail Deleted");
	};

<<<<<<< HEAD
	render() {
		return (
			<section className={"mail-compose container"}>
				<header className={"mail-compose line"}>New Message</header>
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
						<button className={"mail-compose fas trash"} type='button' onClick={this.deleteMail}></button>
					</footer>
				</form>
			</section>
		);
	}
}
=======
    render() {

        return (<section className={'mail-compose container'}>
            <header className={'mail-compose line'}>New Message</header>
            <form onSubmit={this.createMail}>
            <article className={'mail-compose line'}><label htmlFor="to">To :</label><input type="email" id="to" placeholder="Example@Jmail.com."/></article>
            <article className={'mail-compose line'}><label htmlFor="cc">Title :</label><input type="text" id="cc" placeholder="Example Example Eat's FalaFel..."/></article>
            <article className={'mail-compose line'}><label htmlFor="bcc">Bcc :</label><input type="text" id="bcc" placeholder="Example@Jmail.com , ExampleFather@Jmail.com ,ExampleBaby@Jmail.com."/></article>
            <article><label htmlFor="subject">Subject :</label><textarea id="subject"/></article>
            <main></main>
            <footer>
            <button className={'mail-compose send'}>Send</button>
            <button className={'mail-compose far edit'}></button>
            <button className={'mail-compose fas trash'} type="button" onClick={this.deleteMail}></button>
            </footer>
            </form>
        </section>)
    }
 }
>>>>>>> 6f5ce0dbed71ebe87aa94f681f85946c892264b9
