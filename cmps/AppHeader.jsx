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
			<header className='app-header'>
				<h1 onClick={() => this.props.history.push("/")}>Books R Us</h1>
				<div className='fab facebook'></div>
				<nav className='main-nav'>
					<NavLink activeClassName='my-active' exact to='/'>
						Home
					</NavLink>
					<NavLink to='/about'>About</NavLink>
					<NavLink to='/book'>Books</NavLink>
					<NavLink to='/keep'>Keep</NavLink>
					<NavLink to='mail'>Mail</NavLink>
				</nav>
			</header>
		);
	}
}

export const AppHeader = withRouter(_AppHeader);
