import { mailService } from "../services/mail.service.js";
import { eventBusService } from "../../../services/event-bus.service.js";
export class MailFolderList extends React.Component {
  state = {
    precents: 0,
  };

  removeEventBus = null;

  componentDidMount() {
    this.removeEventBus = eventBusService.on("meterRender", () => {
      this.setState({ precents: 0 });
    });
  }

  componentWillUnmount() {
    this.removeEventBus();
  }

  handleChange = (val) => {
    let filter =
      "string" === typeof val || (val.length === 1 && typeof val === "object")
        ? val
        : val.target.value;
    if (filter === this.props.filterBy) filter = "";
    this.props.updateFilter(filter);
  };

  get meterPrecents() {
    const mails = mailService.getMails();
    if (!mails) return;
    const precentsPerItem = 100 / mails.length;
    let precents = 0;
    mails.map((mail) => {
      if (mail.isRead) precents += precentsPerItem;
    });
    precents = precents.toFixed(1);
    return precents;
  }

  render() {
    const { Link } = ReactRouterDOM;
    return (
        <React.Fragment>
        <input placeholder="ENTER TEXT TO SEARCH" id="search" type="search" onChange={this.handleChange} />
        <Link to={"/mail/compose"} className={'link'}>
          <button className={'mail-folder compose btn flex between align-center'}>
            <span className={"fas pluss mfl flex center"}></span>
            <span className={"mfl"}>Compose</span>
          </button>
        </Link>
        <aside className={"flex flex-column sidebar-layout"}>
        <Link to={"/mail"}> <button onClick={() => this.handleChange(["isSent"])} className={'first mail-folder btn flex between align-center active'}><span className={'far inbox-btn mfl flex center'}></span><span className={'mfl'}>Inbox</span></button></Link>
        <Link to={"/mail"}> <button onClick={() => this.handleChange("isStar")} className={'mail-folder btn flex between align-center'}><span className={'far favorite-btn mfl flex center'}></span><span className={'mfl'}>Favorite</span></button></Link>
       <Link to={"/mail"}>  <button onClick={() => this.handleChange(["isRead"])}className={'mail-folder btn flex between align-center'}><span className={'far unread-btn mfl flex center'}></span><span  className={'mfl'}>UnRead</span></button></Link>
       <Link to={"/mail"}>  <button onClick={() => this.handleChange("isRead")}className={'mail-folder btn flex between align-center'}><span className={'fas read-btn mfl flex center'}></span><span  className={'mfl'}>Read</span></button></Link>
       <Link to={"/mail"}>  <button onClick={() => this.handleChange("isSent")}className={'mail-folder btn flex between align-center'}><span className={'far sent-btn mfl flex center'}></span><span  className={'mfl'}>Sent</span></button></Link>
       <Link to={"/mail"}>  <button onClick={() => this.handleChange("")}className={'mail-folder btn flex between align-center'}><span className={'fas all-btn mfl flex center'}></span><span  className={'mfl'}>All</span></button></Link>
       <Link to={"/mail"}>  <button onClick={() => this.handleChange("isDraft")}className={'mail-folder btn flex between align-center'}><span className={'far draft-btn mfl flex center'}></span><span  className={'mfl'}>Draft</span></button></Link>
        <Link to={"/mail"}> <button onClick={() => this.handleChange("isDeleted")}className={'last mail-folder btn flex between align-center'}><span className={'far deleted-btn mfl flex center'}></span><span  className={'mfl'}>Deleted</span></button></Link>
      </aside>
      <meter value={this.meterPrecents} min="0" max="100"></meter>
      <span className={'meter-span'}>{this.meterPrecents}%</span>
        </React.Fragment>
    );
  }
}
