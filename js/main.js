//@ Firework JS 

'use strict';
var orderNumber = '';
var prevOrderType = '';
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

$(document).ready(function() {
	const baseUrl = "https://script.google.com/macros/s/AKfycbyUFUzskzjec-Ta3Ag-lNyS14yAjMG3_CmbPH7srOLRtu6NR7so03Tx-z3YYUIIXjWDFQ/exec"; 
	const para = {
	  spreadsheetId: "1KwEnyjdiTlP5EQoq5utfbvrTSXh2WeTvAV3g090Xo-0", 
	  sheetName: "Sheet1" 
	};
	const q = new URLSearchParams(para);
	const url = baseUrl + "?" + q;
	var body_row = [];
	fetch(url)
	  .then(res => res.json())
	  .then(res => {
	    const values = res.values;
	    // console.log(values);

	    
	    $.each(res.values, function(index, cols) {
	    	if (index > 0) {
			    if (body_row[index-1] === undefined) {
			      body_row[index-1] = $('<tr class="' + (index%2==0?'even':'odd') + '"/>');
			    }
			    var isPrdGroup = false;
			    if (cols[1].trim() != '') { // don't show if product name is empty
				    $.each(cols, function(colnum, val) {
				    	if (colnum == 0 && val == '') {
				    		isPrdGroup = true;
				    		body_row[index-1].append('<td colspan="1"></td>');
				    		body_row[index-1].addClass('group-header');
				    		body_row[index-1].removeClass("even odd");
				    	} 
				    	if (isPrdGroup && colnum == 1) {
				    		body_row[index-1].append('<td colspan="7" class="bold">' + val + '</td>');
				    	}

				    	if (!isPrdGroup) {
					    	if (colnum <= 3) {
					    		body_row[index-1].append('<td>' + val + '</td>');
					    	} else if (colnum == 4) {
					    		body_row[index-1].append('<td class="rightAlign">' + val + '</td>');
					    	} else if (colnum == 5) {
					    		if (val == '') {
					    			body_row[index-1].append('<td></td><td></td><td></td>');
					    		} else {
						    		body_row[index-1].append('<td class="rightAlign" id="unit_price">' + val + '</td>');
						     		body_row[index-1].append('<td class="quantity">' + 
						    			'<div class="col-lg-4"><div class="number" id="number"> ' +
						    			'<span class="minus">-</span> <input class="qty_id" type="text" value="0"> ' +
						    			'<span class="plus">+</span></div></div></td>');
						     		body_row[index-1].append('<td class="rightAlign"><span class="item-total" id="item_total"></span></td>');
					     		}
					    	}
					    }
				    });
				}
			}
		  });
	    $('#fmm_table_body').append(body_row);
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

	$('#clear-order').click(function(e){
		prevOrderType = '';
		orderNumber = '';
		$( ".qty_id" ).each(function( index ) {
		  $( this ).val(0);
		  $( this ).change();
		});
		$('#name').val('');
		$('#cellNumber').val('');
		$('#email').val('');
		return!1;
	});

	$('#order_form').on('keypress','input.qty_id',function(e) {
		if (!isNumber(e)) {
			e.preventDefault();
			return false;
		}
		return true;
	});

	$('#order_form').on('change','input.qty_id',function(e) {
		calcTotal($(this));
		return!1;
	});

	$('#order_form').on('click','span.minus',function(e){
		var $input=$(this).parent().find('input');
		var count=parseInt($input.val())-1;
		count=count<0?0:count;
		$input.val(count);
		$input.change();
		calcTotal($(this));
		return!1;
	});
	$('#order_form').on('click','span.plus',function(e){
		var $input=$(this).parent().find('input');
		$input.val(parseInt($input.val())+1);
		$input.change();
		calcTotal($(this));
		return!1;
	});

	function calcTotal(element) {
		var $input = element.parent().find('input');
		var unitPrice = element.parent().parent().parent().parent().find('#unit_price').text();
		element.parent().parent().parent().parent().find('#item_total').text(eval($input.val()*unitPrice));
		updateTotal();
	}

	function updateTotal() {
		var orderTotal = 0;
		var itemsCount = 0;
		$( ".item-total" ).each(function( index ) {
		  var itemTotal = $( this ).text();
		  if(itemTotal != '' && !isNaN(itemTotal)) {
		  	orderTotal = orderTotal + eval(itemTotal);
		  }
		});

		$( ".qty_id" ).each(function( index ) {
		  itemsCount += eval($( this ).val());
		});

		$( "#itemsCount" ).text(itemsCount);
		$( "#orderTotal" ).text(orderTotal);
	}

	function isNumber(event) {
		var keyCode = event.which? event.which : event.keyCode;
		if (keyCode > 31 && (keyCode < 48 || keyCode > 57)) {
			return false;
		}
		return true;
	}
})(jQuery);
