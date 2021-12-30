import { mailService } from '../services/mail.service.js';
export class MailDetails extends React.Component {

    render() {
    const { Link } = ReactRouterDOM;
        const {mailId} = this.props.match.params;
        const currMail = mailService.getMailById(mailId);
        return (<section className={'mail-compose container'}>
        <header className={'mail-compose line'}>Reading Message</header>
        <article className={'mail-compose line'}><p>Subject : {currMail.subject}</p></article>
        <article className={'mail-compose line'}><p>From : {currMail.from}, to <span>&lt;{currMail.to}&gt;</span></p></article>
        <article>{currMail.body}</article>
        <main></main>
        <footer>
        <button className={'mail-compose fas trash'} type="button" onClick={this.deleteMail}></button>
        <Link className={'mail-compose fas expand'} to="/mail"></Link>
        </footer>
    </section>)
    }
}