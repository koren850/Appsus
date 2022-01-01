export function About() {
	return (
		<section className='about'>
			<div className='team'>
				<div className='member-info'>
					<h1>Koren Aharon</h1>
					<p>
						Koren Aharon - 21 yeras old. live in kibutz beit hashita. served 3 years in the idf, 1.5 years as an network administrator and 1.5 years as a major general assistance.
					</p>
				</div>
				<div className='member-container'>
					<img className='member' src='assets/img/team/koren.jpg' alt='' />
					<div className='member-btns'>
						<a href='https://www.instagram.com/koren854/' target='blank' className='fab instagram'></a>
						<a href='https://github.com/koren850' target='blank' className='fab git'></a>
						<a href='' className='fab linkedin'></a>
					</div>
				</div>
				<div className='member-info'>
					<h1>Michael Aharoni</h1>
					<p>
						Michael Aharoni - 25 years old, have a lovely wife. served at the paratroopers unit 3 years, since then lived in Eilat, and worked at high-security jobs, proffesional
						dog trainer.
					</p>
				</div>
				<div className='member-container'>
					<img className='member' src='assets/img/team/michael.jpg' alt='' />
					<div className='member-btns'>
						<a href='https://www.instagram.com/bandana_dog_/?utm_medium=copy_link' target='blank' className='fab instagram'></a>
						<a href='https://github.com/MichaelAharoni' target='blank' className='fab git'></a>
						<a href='' className='fab linkedin'></a>
					</div>
				</div>
			</div>
		</section>
	);
}
