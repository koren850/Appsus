import { MailPreview } from "./MailPreview.jsx";
import { mailService } from "../services/mail.service.js";

export function MailList({ mails ,loadMails}) {
	const { Link } = ReactRouterDOM;

	if (!mails.length) return <h1>There are no books to show</h1>;
	return (
		<section className='mail-list layout-container flex-column'>
			{mails.map((mail) => (!mail.isDeleted || mailService.checkDeletedFilter()) && <MailPreview key={mail.id} mail={mail} loadMails={loadMails}/>)}
		</section>
	);
}
