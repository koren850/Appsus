import { eventBusService } from "../services/event-bus.service.js";

const { NavLink, withRouter } = ReactRouterDOM;

class _AppHeader extends React.Component {
	state = { open: false };
	removeEventBus = null;

	toggleOpenClose = () => {
		this.setState({ open: !this.state.open });
	};

	componentDidMount() {
		this.removeEventBus = eventBusService.on("books-count", (booksCount) => {
			this.setState({ booksCount });
		});
	}

	componentDidUpdate() {
		console.log(this.state.open);
	}

	componentWillUnmount() {
		this.removeEventBus();
	}

	render() {
		return (
			<header className='app-header layout-container'>
				<div onClick={this.toggleOpenClose} className={`${this.state.open ? "black-screen" : ""}`}></div>
				<div className={"layout flex between align-center"}>
					<h1 className={"inline-block logo"} onClick={() => this.props.history.push("/")}>
						Appsus
					</h1>
					<div onClick={this.toggleOpenClose} className='hamburger hide'></div>
					<nav className={`main-nav ${this.state.open ? "open" : ""} inline-block`}>
						<NavLink activeClassName='my-active' exact to='/'>
							Home
						</NavLink>
						<NavLink to='/about'>About</NavLink>
						<NavLink to='/book'>Books</NavLink>
						<NavLink to='/keep'>Notes</NavLink>
						<NavLink to='/mail'>Mail</NavLink>
					</nav>
				</div>
			</header>
		);
	}
}

export const AppHeader = withRouter(_AppHeader);
