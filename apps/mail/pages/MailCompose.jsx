export class MailCompose extends React.Component {


    render() {

        return (<section className={'mail-compose container'}>
            <header className={'mail-compose line'}>New Message</header>
            <article className={'mail-compose line'}>To :</article>
            <article className={'mail-compose line'}>Cc :</article>
            <article className={'mail-compose line'}>Bcc :</article>
            <article>Subject :</article>
            <main></main>
            <footer>
            <button></button>
            <button className={'fas trash'}></button>
            </footer>
        </section>)
    }
}