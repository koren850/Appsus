import { mailService } from '../services/mail.service.js'
import {utilsService} from '../../../utils.service.js/'
import {swalService} from '../../../services/swal.service.js'
export class MailCompose extends React.Component {

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
            isDeleted:false,
            sentAt: new Date(),
            from: mailService.getUser().mail,
            to: values[0].value,
        }
        window.location.replace('/index.html#/mail');
        mailService.addMail(mail);
        swalService.userModal('success', 'Mail sent');
    }

    deleteMail=() => {
        swalService.checkAgain(this.deleteConfirm);
    }
    
    deleteConfirm =() => {
        window.location.replace('/index.html#/mail');
        swalService.userModal('error', 'Mail Deleted');
     }

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
            <button className={'mail-compose fas trash'} type="button" onClick={this.deleteMail}></button>
            </footer>
            </form>
        </section>)
    }
 }