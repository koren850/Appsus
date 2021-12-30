export class MailFilter extends React.Component {
  state = {
    filterBy: null,
  };

  handleChange = (val) => {
    const filter = ("string" === typeof val) ? val : val.target.value;
    this.setState({ filterBy: filter }, () => console.log(this.state));
    this.props.loadMails(filter);
  };

  render() {
    return (
      <React.Fragment>
        <button onClick={() => this.handleChange('')}>All</button>
        <button onClick={() => this.handleChange("isStar")}>Favorite</button>
        <button onClick={() => this.handleChange("isSent")}>Sent</button>
        <button onClick={() => this.handleChange("isDeleted")}>Deleted</button>
        <button onClick={() => this.handleChange("isRead")}>Read</button>
        <button onClick={() => this.handleChange(["isRead"])}>Un Read</button>
        <button onClick={() => this.handleChange(["isSent"])}>InComming</button>
        <button onClick={() => this.handleChange("isRead")}>Draft</button>
        <button onClick={() => this.handleChange("isRead")}>Labels</button>
        <input type="search" onChange={this.handleChange} />
      </React.Fragment>
    );
  }
}
