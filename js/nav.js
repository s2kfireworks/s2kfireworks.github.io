(function($){
	/*------------------
		Navigation
	--------------------*/
	$('.nav-switch').on('click', function(event) {
		$('.mainmenu').toggleClass('active');
		$(this).toggleClass('active');
		event.preventDefault();
	});
	$('.menu-list li a').on('click', function(event) {
		var anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $(anchor.attr('href')).offset().top - 0
		}, 1000);
		if ($(window).width() < 768) {
			$('.nav-switch').removeClass('active');
			$('.mainmenu').removeClass('active');
		}
		event.preventDefault();
	});
})(jQuery);
