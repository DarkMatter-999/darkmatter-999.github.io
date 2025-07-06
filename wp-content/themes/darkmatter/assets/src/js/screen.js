document.addEventListener( 'DOMContentLoaded', ( e ) => {
	e.preventDefault();

	const header = document.querySelector( '.dm-header' );
	window.addEventListener( 'scroll', function () {
		if ( header ) {
			if ( window.scrollY > 200 ) {
				header.classList.add( 'slidedown' );
			} else {
				header.classList.remove( 'slidedown' );
			}
		}
	} );

	const homeFooter = document.querySelector( '.dm-footer-home' );

	if ( homeFooter ) {
		let curX = 0,
			curY = 0,
			tgX = 0,
			tgY = 0;
		const move = () => {
			curX += ( tgX - curX ) / 20;
			curY += ( tgY - curY ) / 20;
			const interBubble = document.getElementById( 'interBubble' );
			if ( interBubble ) {
				interBubble.style.transform = `translate(${ Math.round(
					curX
				) }px, ${ Math.round( curY ) }px)`;
			}
			requestAnimationFrame( move ); // eslint-disable-line no-undef
		};

		const handleMouseMove = ( event ) => {
			tgX = event.clientX;
			tgY = event.clientY;
		};

		window.addEventListener( 'mousemove', handleMouseMove );
		move();
	}
} );
