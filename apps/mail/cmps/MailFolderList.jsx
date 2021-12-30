import {mailService} from "../services/mail.service.js";
import {eventBusService} from "../../../services/event-bus.service.js";
export class MailFolderList extends React.Component{

    state = {
        precents : 0,
    }

    removeEventBus = null;

    componentDidMount() {
        this.removeEventBus = eventBusService.on('meterRender', ()=>{
            this.setState({precents:0});
        })
    }

    componentWillUnmount() {
		this.removeEventBus();
	}
    
    handleChange = (val) => {
        let filter = ("string" === typeof val || (val.length === 1 && typeof val === 'object')) ? val : val.target.value;
        if (filter === this.props.filterBy) filter = '';
        this.props.updateFilter(filter);
    };
    
    get meterPrecents(){
        const mails = mailService.getMails();
        if (!mails) return;
        const precentsPerItem = 100 / mails.length;
        let precents = 0;
        mails.map(mail=> {
            if (mail.isRead) precents += precentsPerItem;
        })
        precents = precents.toFixed(1);
        return precents;
    }
    

    render() {
        return (
            <React.Fragment>
      <button onClick={() => this.handleChange("")}>All</button>
      <button onClick={() => this.handleChange("isStar")}>Favorite</button>
      <button onClick={() => this.handleChange("isSent")}>Sent</button>
      <button onClick={() => this.handleChange("isDeleted")}>Deleted</button>
      <button onClick={() => this.handleChange("isRead")}>Read</button>
      <button onClick={() => this.handleChange(["isRead"])}>Un Read</button>
      <button onClick={() => this.handleChange(["isSent"])}>InComming</button>
      <button onClick={() => this.handleChange("isDraft")}>Draft</button>
      <input type="search" onChange={this.handleChange} />
      <meter value={this.meterPrecents} min="0" max="100"></meter><span>{this.meterPrecents}%</span>
       </React.Fragment>
  );
}
}
