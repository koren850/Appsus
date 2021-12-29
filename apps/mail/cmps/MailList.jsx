import { MailPreview } from "./MailPreview.jsx";

export function MailList({ mails }) {
    const { Link } = ReactRouterDOM;

  if (!mails.length) return <h1>There are no books to show</h1>;
  return (
    <section className="mail-list">
        <Link to={'/mail/compose'}><button className={'mail-list btn'}><span className={'mail-list compose-span'}>Compose</span><span className={'mail-list fas fa-plus'}><span className={'mail-list gradient'}></span></span></button></Link>
      {mails.map(
        (mail) =>
          !mail.isDeleted && (
            <React.Fragment key={mail.id}>
              <MailPreview key={mail.id} mail={mail} />
            </React.Fragment>
          )
      )}
    </section>
  );
}
