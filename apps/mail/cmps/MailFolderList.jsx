export class MailFolderList extends React.Component{
    handleChange = (val) => {
        let filter = ("string" === typeof val || (val.length === 1 && typeof val === 'object')) ? val : val.target.value;
        if (filter === this.props.filterBy) filter = '';
        this.props.updateFilter(filter);
      };

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
    </React.Fragment>
  );
}
}
