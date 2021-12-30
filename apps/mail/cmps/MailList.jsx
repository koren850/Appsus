import { MailPreview } from "./MailPreview.jsx";
import { mailService } from "../services/mail.service.js";

export function MailList({ mails ,loadMails}) {
	const { Link } = ReactRouterDOM;

	if (!mails.length) return <h1>There are no books to show</h1>;
	return (
		<section className='mail-list'>
			<Link to={"/mail/compose"}>
				<button className={"mail-list btn"}>
					<span className={"mail-list compose-span"}>Compose</span>
					<span className={"mail-list fas fa-plus"}>
						<span className={"mail-list gradient"}></span>
					</span>
				</button>
			</Link>
			{mails.map((mail) => (!mail.isDeleted || mailService.checkDeletedFilter()) && <MailPreview key={mail.id} mail={mail} loadMails={loadMails}/>)}
		</section>
	);
}
