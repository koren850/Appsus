import { eventBusService } from "../services/event-bus.service.js";

const { NavLink, withRouter } = ReactRouterDOM;

class _AppHeader extends React.Component {
	state = {
		booksCount: 0,
	};

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
		const { booksCount } = this.state;
		return (
			<header className='app-header'>
				<h1 onClick={() => this.props.history.push("/")}>Books R Us</h1>
				<span>books to show: {booksCount}</span>
				<nav className='main-nav'>
					<NavLink activeClassName='my-active' exact to='/'>
						Home
					</NavLink>
					<NavLink to='/about'>About</NavLink>
					<NavLink to='/book'>Our books</NavLink>
				</nav>
			</header>
		);
	}
}

export const AppHeader = withRouter(_AppHeader);
