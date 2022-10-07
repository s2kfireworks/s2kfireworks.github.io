var orderMap = new Map();
var customerMap = new Map();
const orderServiceUrl = "https://script.google.com/macros/s/AKfycbxzMdiws8zBaK7lEgujD1ufFxyWjriWfjVW5SrIUC_lABncpag7F5KptFw9zsEu2HRF/exec";
const orderConfUrl = "https://script.google.com/macros/s/AKfycbzOwXlcdjS-zU1qSl5p7Fx1yhYDaow2_mtg5z8ZkicU7E8CiWtaJ5CizJyAnpgo4Qdu/exec"; 

$(window).on('load', function() { 
	/*------------------
		Preloder
	--------------------*/
	$(".loader").fadeOut(); 
	$("#preloder").delay(400).fadeOut("slow");

});

function loadOrders() {
	const baseUrl = "https://script.google.com/macros/s/AKfycbxo1Muos3PPEdV5uFurPAqPX-jb9qRS4hlHiktrqQ2qq6JkyVCBwX6vc-Tz8uNOe345/exec"; 
	const para = {
	  entity: "orders", 
	};
	const q = new URLSearchParams(para);
	const url = baseUrl + "?" + q;
	var body_row = [];
	fetch(url)
	  .then(res => res.json())
	  .then(orders => {
	    $.each(orders.rows, function(index, order) {
		    body_row[index] = $('<tr class="' + (index%2==0?'even':'odd') + '"/>');
	    	body_row[index].append('<td class="orderNumber"><a>' + order.id + '</a></td>');
	    	body_row[index].append('<td class="rightAlign">' + order.items + '</td>');
	    	body_row[index].append('<td class="rightAlign">' + order.amount + '</td>');
	    	body_row[index].append('<td id="customerId">' + order.customer_id + '</td>');
	    	body_row[index].append('<td>' + order.type + '</td>');
	    	body_row[index].append('<td>' + order.created_date + '</td>');
	    	body_row[index].append('<td><a class="cancelOrder">Cancel</a></td>');
	    	orderMap.set(order.id.toString(), JSON.parse(order.order_data));
		});
	    $('#order_list_table_body').append(body_row);
	  });
}

function loadCustomers() {
	const baseUrl = "https://script.google.com/macros/s/AKfycbxo1Muos3PPEdV5uFurPAqPX-jb9qRS4hlHiktrqQ2qq6JkyVCBwX6vc-Tz8uNOe345/exec"; 
	const para = {
	  entity: "customers"
	};
	const q = new URLSearchParams(para);
	const url = baseUrl + "?" + q;
	var body_row = [];
	fetch(url)
	  .then(res => res.json())
	  .then(customers => {
	    $.each(customers.rows, function(index, customer) {
		    if (body_row[index] === undefined) {
		      body_row[index] = $('<tr class="' + (index%2==0?'even':'odd') + '"/>');
		    }
	    	body_row[index].append('<td>' + customer.id + '</td>');
	    	body_row[index].append('<td>' + customer.name + '</td>');
	    	body_row[index].append('<td>' + customer.mobile + '</td>');
	    	body_row[index].append('<td>' + customer.email + '</td>');
	    	body_row[index].append('<td>' + (customer.address1 == null ? '' : customer.address1) + '</td>');
		    body_row[index].append('<td></td>');
		    customerMap.set(customer.id.toString(), customer);
		});
	    $('#customer_list_table_body').append(body_row);
	  });
}

function cancelOrder(orderId) {
    const cancelOrderParams = {
        action: 'cancel'
    }
    const q = new URLSearchParams(cancelOrderParams);
    const orderRequest = {
        orderNumber: orderId
    };

    fetch(orderServiceUrl + "?" + q, {
      method: "POST",
      body: JSON.stringify(orderRequest),
      mode: 'no-cors',
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(res => {
       
    })
    .catch(function(err) {
        alert("Sorry we are unable to process your order currently. Please try again later.");
    });
}

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

	loadOrders();
	loadCustomers();

	$('#orders_list').on('click','td.orderNumber', function(e) {
		$('#order_details_table_body').empty();
		var order = orderMap.get($(this).text());
		if (order != '') {
			var customer = customerMap.get($(this).parent().find("#customerId").text());
			$('#orderDetailsTitle').text('Order Details for ' + $(this).text());
			$('#name').text(customer.name);
			$('#mobile').text(customer.mobile);
			$('#email').text(customer.email);
			var body_row = [];
			$.each(order, function(index, cols) {
			    body_row[index] = $('<tr class="' + (index%2==0?'even':'odd') + '"/>');
			    $.each(cols, function(colnum, val) {
		    		if (colnum > 3) {
		    			body_row[index].append('<td class="rightAlign">' + val + '</td>');
		    		} else {
		    			body_row[index].append('<td>' + val + '</td>');
		    		}
			    });
			});
		    $('#order_details_table_body').append(body_row);
		}

		$('#orderDetails').modal('show');
		// return!1;
	});

	$('#orders_list').on('click','a.cancelOrder', function(e) {
		var orderId = $(this).parent().parent().find(".orderNumber").text();
		var resp = confirm("Do you want to cancel order " + orderId);
		if (resp) {
			$(this).parent().parent().remove();
			orderMap.delete(orderId);
			cancelOrder(orderId);
		}
	});
})(jQuery);
