import { MailFolderList } from "./MailFolderList.jsx";
export class MailFilter extends React.Component {
  state = {
    filterBy: null,
  };

  updateFilter = (filter) => {
    this.setState({ filterBy: filter });
    this.props.loadMails(filter);
  }

  render() {
    return (
      <React.Fragment>
          <MailFolderList filterBy={this.state.filterBy} updateFilter={this.updateFilter}/>
      </React.Fragment>
    );
  }
}
