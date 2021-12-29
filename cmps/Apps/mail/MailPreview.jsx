import {MailTxt} from './MailTxt.jsx';
const { Link } = ReactRouterDOM;

export function MailPreview({ mail }) {

	return (
		<Link className='clean-link' to={`/mail/${mail.id}`}>
			<div className='mail-preview'>
				<h2>{mail.subject}</h2>
                <MailTxt mail={mail}/>
			</div>
		</Link>
	);
}
