import { BookApp } from "./apps/book/pages/BookApp.jsx";
import { KeepApp } from "./pages/KeepApp.jsx";
import { MailApp } from "./apps/mail/pages/MailApp.jsx";
import { AppHeader } from "./cmps/AppHeader.jsx";
import { BookDetails } from "./apps/book/cmps/BookDetails.jsx";
import { Home } from "./pages/Home.jsx";
import { About } from "./pages/About.jsx";
import { UserMsg } from "./cmps/UserMsg.jsx";

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

export function App() {
	return (
		<Router>
			<section className='app'>
				<AppHeader />
				<UserMsg />
				<main>
					<Switch>
						<Route component={BookDetails} path='/book/:bookId' />
						<Route component={BookApp} path='/book' />
						<Route component={KeepApp} path='/keep' />
						<Route component={MailApp} path='/mail' />
						<Route component={About} path='/about' />
						<Route component={Home} path='/' />
					</Switch>
				</main>
			</section>
		</Router>
	);
}
