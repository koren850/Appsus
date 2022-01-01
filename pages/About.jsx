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
	return <section className='about'></section>;
}
