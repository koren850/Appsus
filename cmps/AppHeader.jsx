import { eventBusService } from "../services/event-bus.service.js";

const { NavLink, withRouter } = ReactRouterDOM;

class _AppHeader extends React.Component {
	removeEventBus = null;

	componentDidMount() {
		this.removeEventBus = eventBusService.on("books-count", (booksCount) => {
			this.setState({ booksCount });
		});
	}

	componentWillUnmount() {
		this.removeEventBus();
	}

	render() {
		return (
			<header className='app-header layout-container'>
				<div className={"layout flex between align-center"}>
					<h1 className={"inline-block logo"} onClick={() => this.props.history.push("/")}>
						Appsus
					</h1>
					<nav className='main-nav inline-block'>
						<NavLink activeClassName='my-active' exact to='/'>
							Home
						</NavLink>
						<NavLink to='/about'>About</NavLink>
						<NavLink to='/book'>Books</NavLink>
						<NavLink to='/keep'>Keep</NavLink>
						<NavLink to='/mail'>Mail</NavLink>
					</nav>
				</div>
			</header>
		);
	}
}

export const AppHeader = withRouter(_AppHeader);
