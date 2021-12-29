import {MailTxt} from './MailTxt.jsx';
import { mailService } from '../services/mail.service.js';
// const { Link } = ReactRouterDOM;

export class MailPreview extends React.Component {
    
    state = {
        mail : this.props.mail,
        isLongTxtShown : false,
    }

    componentWillUnmount() {
        this.setState({isFocused: false});
    }

    updateIsRead =(currMail)=> {
        currMail.isRead = true;
        mailService.updateMail(currMail);
}

    setTxtShown =()=> {
        this.setState({isLongTxtShown: !this.state.isLongTxtShown});
    }

    handleFocus=(currMail)=> {
        this.updateIsRead(currMail);
        this.setTxtShown();
    }



render() {
    const currMail = {...this.state.mail};
    const isReadClass = (currMail.isRead) ? "light" : "bold";
    return (
        <div className='clean-link' to={`/mail/${currMail.id}`}>
            <div className='mail-preview' onClick={()=>this.handleFocus(currMail)}>
				<p className={`mail-preview title ${isReadClass}`}>{currMail.subject}</p>
                <MailTxt mail={currMail}
                        isLongTxtShown={this.state.isLongTxtShown}
                    />
			</div>
		</div>
	);
}

}