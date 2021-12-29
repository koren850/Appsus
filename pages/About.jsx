const { NavLink, Route } = ReactRouterDOM;

function Team() {
	return (
		<ul>
			<li>Puki ben david</li>
			<li>Shraga ben david</li>
			<li>Muki ben david</li>
		</ul>
	);
}

function Vision() {
	return (
		<div>
			<span>Our vision:</span>
			<ul>
				<li>selling best books</li>
				<li>Go to sleep and eat</li>
			</ul>
		</div>
	);
}

export function About() {
	return (
		<section className='about'>
			<h1>We're all about books...</h1>
			<p>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit earum tenetur, accusantium adipisci, provident
				reprehenderit eaque similique quia nemo commodi et laboriosam ab est sunt dolor velit repellat illum placeat.
			</p>
			<NavLink activeClassName='my-active' to='/about/team'>
				My Team
			</NavLink>
			<NavLink activeClassName='my-active' to='/about/vision'>
				Our vision
			</NavLink>
			<Route component={Team} path='/about/team' />
			<Route component={Vision} path='/about/vision' />
		</section>
	);
}
