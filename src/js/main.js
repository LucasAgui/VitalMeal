///////////////////////////////////////////////////////////
//Make mobile navigation
const btnNavEl = document.querySelector('.nav__mobile-btn');
const headerEl = document.querySelector('.header');
const navLinks = document.querySelectorAll('.nav__link');
btnNavEl.addEventListener('click', function () {
	headerEl.classList.toggle('nav-open');
});

navLinks.forEach((element) => {
	element.addEventListener('click', function (e) {
		headerEl.classList.remove('nav-open');
	});
});

///////////////////////////////////////////////////////////
//Change language

const flagsEl = document.getElementById('flags');

flagsEl.addEventListener('click', function () {
	flagsEl.classList.toggle('open');
});

///////////////////////////////////////////////////////////
// Smooth scrolling animation

document.addEventListener('DOMContentLoaded', function () {
	// Selecciona todos los enlaces que comienzan con #
	const links = document.querySelectorAll('a[href^="#"]');

	links.forEach(function (link) {
		link.addEventListener('click', function (event) {
			var targetId = this.getAttribute('href').substring(1);
			var target = document.getElementById(targetId);

			if (target) {
				event.preventDefault();

				// Obtiene la posición del elemento en relación con la parte superior de la página
				var rect = target.getBoundingClientRect();

				// Ajusta el cálculo considerando el espacio adicional (margin-top) en el elemento de destino
				var offsetTop =
					rect.top +
					window.scrollY -
					document.querySelector('.header').offsetHeight;

				// Ajusta también para el espacio adicional (margin-top) en el elemento de destino
				var marginTop = window.getComputedStyle(target).marginTop;
				offsetTop -= parseFloat(marginTop);

				// Realiza la animación de desplazamiento suave
				scrollToOffset(offsetTop, 1000);
			}
		});
	});

	// Función para realizar el desplazamiento suave
	function scrollToOffset(offset, duration) {
		var start = window.pageYOffset;
		var startTime =
			'now' in window.performance ? performance.now() : new Date().getTime();

		function scroll() {
			var currentTime =
				'now' in window.performance ? performance.now() : new Date().getTime();
			var timeElapsed = currentTime - startTime;
			var progress = Math.min(timeElapsed / duration, 1);

			window.scrollTo(0, easeInOutCubic(start, offset, progress));

			if (timeElapsed < duration) {
				requestAnimationFrame(scroll);
			}
		}

		function easeInOutCubic(start, end, progress) {
			progress /= 0.5;
			if (progress < 1)
				return ((end - start) / 2) * progress * progress * progress + start;
			progress -= 2;
			return ((end - start) / 2) * (progress * progress * progress + 2) + start;
		}

		requestAnimationFrame(scroll);
	}
});

///////////////////////////////////////////////////////////
// Sticky navigation

const heroEl = document.querySelector('.section-hero');

const obs = new IntersectionObserver(
	function (entries) {
		const ent = entries[0];
		if (!ent.isIntersecting) document.body.classList.add('sticky');
		if (ent.isIntersecting) document.body.classList.remove('sticky');
	},
	{
		// In the viewport
		root: null,
		threshold: 0,
		rootMargin: '-80px'
	}
);
obs.observe(heroEl);
