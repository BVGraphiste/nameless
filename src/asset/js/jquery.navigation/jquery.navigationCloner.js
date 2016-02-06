// Function to add a string to an attribute
// --------------------------------------------
$.fn.appendAttr = function(attrName, suffix) {
    this.attr(attrName, function(i, val) {
        return val + suffix;
    });
    return this;
};

// Clone the menu
// --------------------------------------------
function navigationCloner(el) {
	var navigationClone = $(el).clone();
	// say how many elements there is in the page 
	var conditon = $('body').find(el).length;
	
	if (conditon > 0) {
		// Clone elements
		var navigationClone = $(el).clone();
		var container = 'navigation-clone-container';

		// Container
		$('body').prepend('<div class="' + container + '"><div></div></div>');

		// Past navigation
		navigationClone.attr('class','navigation-clone');
		$('.' + container + ' > div').prepend(navigationClone);

		// Icon
		$('body').prepend('<span class="navigation-button"><span class="ln1"></span><span class="ln2"></span><span class="ln3"></span></span>');
	};
	
	// Add a string to an attribute
	$('.navigation-clone li').removeAttr('id');
	
	toggleClassOnClick('.navigation-button', 'body', 'navigation-open');
};
