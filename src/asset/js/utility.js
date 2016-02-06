$(document).ready(function(){
	
	// NAVIGATION
	navigationCloner('.navigation-cloned');
	
	// TABS
	$('.tabs').tabs();
	
	// FANCYBOX
	$('.fancybox-button').fancybox();
	
	// FANCYBOX
	$('.fancybox-button-iframe').fancybox({
		'type': 'iframe'
	});
	
	// GOOGLE MAP
	initialize();
	
	// SCROLL TO
	scrollTo('.scroll-button');
	
	// SUMO SELECT
	$('.select').SumoSelect();
	
	// SLIDER
	$(".slider-single").owlCarousel({
    navigation : true,
		singleItem: true
  });
	
	$(".slider-multiple").owlCarousel({
    navigation : true,
		scrollPerPage: true,
		items: 6
  });
	
	// TOGGLE CLASS
	toggleClassOnClickOnThis('.dropdown', 'open');
	toggleClassOnClickOnThis('.popup', 'open');

	// MANSORY
	$(window).load(function() {	
		// ISOTOP - MASONRY
		$('.masonry').isotope({
			// options...
			layoutMode: 'masonry',
			itemSelector: '.grid-item'
		});	
	});
});


/*$(window).scroll(function() {
	if ( $(window).scrollTop() > $(alert).offset().top ) {
		
	}
	
	else {
		
	}
});*/