// 
// --------------------------------------------
function toggleClassOnClick(buttonEl, targetEl, classEl) {
	$(buttonEl).click(function() {
		$(targetEl).toggleClass(classEl);
	});
};

function toggleClassOnClickOnThis(buttonEl, classEl) {
	$(buttonEl).click(function() {
		$(this).toggleClass(classEl);
	});
};


// 
// --------------------------------------------
function toggleOnHover(buttonEl, targetEl, classEl) {
	$(buttonEl).mouseenter(function() {
		$(targetEl).toggleClass(classEl);
	});
	
	$(buttonEl).mouseleave(function() {
		$(targetEl).toggleClass(classEl);
	});
};


// 
// --------------------------------------------
function toggleOnClick(buttonEl, targetEl) {
	$(buttonEl).click(function() {
		$(targetEl).toggle('fast');
	});
};