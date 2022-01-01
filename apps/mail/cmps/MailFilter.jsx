import { MailFolderList } from "./MailFolderList.jsx";
export class MailFilter extends React.Component {
  state = {
    filterBy: ["isSent"],
  };

  updateFilter = (filter) => {
    this.setState({ filterBy: filter });
    this.props.loadMails(filter);
  }

  render() {
    return (
      <React.Fragment>
          <MailFolderList filterBy={this.state.filterBy} loadMails={this.props.loadMails} updateFilter={this.updateFilter}/>
      </React.Fragment>
    );
  }
}
