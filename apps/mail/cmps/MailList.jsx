import { MailPreview } from "./MailPreview.jsx";
import { mailService } from "../services/mail.service.js";

export function MailList({ mails ,loadMails}) {

	if (!mails.length) return <h1 className={'mail-list nothing-to-show'}>There Are No Mails to Show Right Now...</h1>;
	return (
		<section className='mail-list mail-list-container layout-container flex-column'>
			{mails.map((mail) => (!mail.isDeleted || mailService.checkDeletedFilter()) && <MailPreview key={mail.id} mail={mail} loadMails={loadMails}/>)}
		</section>
	);
}
