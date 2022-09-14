//@ Firework JS 

'use strict';
$(window).on('load', function() { 
	/*------------------
		Preloder
	--------------------*/
	$(".loader").fadeOut(); 
	$("#preloder").delay(400).fadeOut("slow");


	/*------------------
		Isotope Filter
	--------------------*/
	var $container = $('.isotope_items');
	$container.isotope();

	$('.portfolio-filter li').on("click", function(){
		$(".portfolio-filter li").removeClass("active");
		$(this).addClass("active");				 
		var selector = $(this).attr('data-filter');
		$(".isotope_items").isotope({
				filter: selector,
				animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false,
			}
		});
		return false;
	});
});



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





	/*------------------
		BG Parallax
	--------------------*/
	if ($(window).width() > 768) {
		$('.intro-bg').parallax("50%", 0.4);
		$('.promotion-bg').parallax("5%", -0.4);
	}


	/*------------------
		Text Rotator
	--------------------*/
	$(".rotate").textrotator({
		animation: "dissolve",
		separator: ",",
		speed: 2500
	});



	/*------------------
		Service Carousel
	--------------------*/
	/*$('#service-carousel').owlCarousel({
		dots: false,
		nav: true,
		margin:30,
		smartSpeed: 700,
		navText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>'],
		responsive:{
			0:{
				items:1,
			},
			600:{
				items:2,
			},
			1000:{
				items:3,
			}
		}
	});*/


	/*------------------
		Review Carousel
	--------------------*/
	$('.review-carousel').owlCarousel({
		center: true,
		dots: false,
		nav: true,
		loop: true,
		margin:30,
		smartSpeed: 700,
		items:1,
		autoplay:true,
		navText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>']
	});


	$('.open-popup-link').magnificPopup({
	  type:'inline',
	  midClick: true, // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
	  callbacks: {
	    open: function() {
	      $('#video_player')[0].src = './videos/' + this.currItem.el.context.attributes.id.nodeValue + ".mp4";
	      $("#video_player")[0].play();
              // $("#video_player")[0].attr('muted', true);
	    },
	    close: function() {
	      // Will fire when popup is closed
              $("#video_player")[0].pause();
	    }
	    // e.t.c.
	  }
	});

	/*------------------
		Magnific Popup
	--------------------*/
	// $('.work-popup').magnificPopup({
	// 	type:'image',
	// 	gallery:{enabled:true}
	// });


	/*------------------
		ScrollUp
	--------------------*/
	if ($(window).width() > 768) {
		$.scrollUp({
			scrollText: '<i class="fa fa-long-arrow-up"></i>',
			easingType: 'linear',
			scrollSpeed: 900,
			animation: 'fade',
			zIndex: 999
		});
	}



	/*------------------
		WOW JS
	--------------------*/
	new WOW().init();


	/*------------------
		Contact Form
	--------------------*/
	$('#con_form').on('submit', function() {
		var send_btn = $('#send-form'),
			form = $(this),
			formdata = $(this).serialize(),
			chack = $('#form-chack');
			send_btn.text('Wait...');

		function reset_form(){
		 	$("#name").val('');
			$("#email").val('');
			$("#massage").val('');
		}

		$.ajax({
			url:  $(form).attr('action'),
			type: 'POST',
			data: formdata,
			success : function(text){
				if (text == "success"){
					send_btn.addClass('done');
					send_btn.text('Success');
					setTimeout(function() {
						reset_form();
						send_btn.removeClass('done');
						send_btn.text('Send A Massege');
					}, 5000);
				}
				else {
					reset_form();
					send_btn.addClass('error');
					send_btn.text('Error');
					setTimeout(function() {
						send_btn.removeClass('error');
						send_btn.text('Send A Massege');
					}, 4000);
				}
			}
		});
		return false;
	});

	$('#order_form').on('click','span.minus',function(e){
		var $input=$(this).parent().find('input');
		var count=parseInt($input.val())-1;
		count=count<0?0:count;
		$input.val(count);
		$input.change();
		var unitPrice = $(this).parent().parent().parent().parent().find('#unit_price').text();
		$(this).parent().parent().parent().parent().find('#item_total').text(eval($input.val()*unitPrice));
		updateTotal();
		return!1;
	});
	$('#order_form').on('click','span.plus',function(e){
		var $input=$(this).parent().find('input');
		$input.val(parseInt($input.val())+1);
		$input.change();
		var unitPrice = $(this).parent().parent().parent().parent().find('#unit_price').text();
		$(this).parent().parent().parent().parent().find('#item_total').text(eval($input.val()*unitPrice));
		updateTotal();
		return!1;
	});

	function updateTotal() {
		var orderTotal = 0;
		$( ".item-total" ).each(function( index ) {
		  console.log( index + ": " + $( this ).text() );
		  var itemTotal = $( this ).text();
		  if(itemTotal != '' && !isNaN(itemTotal)) {
		  	orderTotal = orderTotal + eval(itemTotal);
		  }
		});

		$( "#orderTotal" ).text(orderTotal);
	}

})(jQuery);
