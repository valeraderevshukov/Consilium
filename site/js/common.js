$(document).ready(function() {

	// variables
	var drop 		= $('.js-dropdown'),
		allList 	= $('.js-dropdown-list'),
		select 		= $('.js-select'),
		selectList 	= $('.js-select-list');


	$('body').on('click', function() {
		select.removeClass("is-active");
		selectList.slideUp(200);
	});

	// select list
	$("body").on("click",".js-select",function(event) {
		event.stopPropagation();
	});
	$("body").on("click",".js-select-text",function(event) {
		var select = $(this).parents(".js-select");

		drop.removeClass('is-active');
		allList.slideUp(200);

		if (select.hasClass("is-active")) {
			$(".js-select").removeClass("is-active");
			$(".js-select-list").slideUp(200);
		}
		else {
			$(".js-select").removeClass("is-active");
			$(".js-select-list").slideUp(200);
			select.toggleClass("is-active").find(".js-select-list").slideToggle(200);
		}
		
	});

	$("body").on("click",".js-select-list li",function() {
		var val 		= $(this).attr("data-val"),
			text 		= $(this).text(),
			select 		= $(this).parents(".js-select"),
			selectList 	= $(this).parents(".js-select-list");
		select.find(".js-select-text span").text(text);
		select.find("option").removeAttr("selected");
		select.find('option[value="'+val+'"]').attr("selected", "selected");
		selectList.find("li").removeClass("is-active");
		$(this).addClass("is-active");
		select.removeClass("is-active");
		selectList.slideUp(200);
		return false;
	});

	$(".js-select select").on("change", function() {
		var text = $(this).val();
		$(this).parents(".js-select").find(".js-select-text span").text(text);
	});

	// dropdown
	$('.js-dropdown-text').on('click', function(event){
		var this_ 	= $(this),
			parent 	= this_.parents('.js-dropdown'),
			list 	= parent.find('.js-dropdown-list');

		select.removeClass("is-active");
		selectList.slideUp(200);

		if (!parent.hasClass('is-active')){
			drop.removeClass('is-active');
			allList.slideUp(200);
			parent.addClass('is-active');
			list.slideDown(200);
		}
		else {
			parent.removeClass('is-active');
			list.slideUp(200);
		}
	});
	$('body').on('click', function() {
		drop.removeClass('is-active');
		allList.slideUp(200);
	});
	$('.js-dropdown-text').on("click", function(event) {
		event.stopPropagation();
	});

	// tab
	function tab() {
		$(".js-tab").each(function(){
			var tab_link 	= $(this).find("a"),
				tab_item 	= $(this).find("li"),
				index 		= tab_link.attr("href"),
				parents 	= $(this).parents(".js-tab-group"),
				tab_cont 	= parents.find(".js-tab-cont");

			tab_link.on("click", function() {
				var index = $(this).attr("href");

				$('.js-tab-item').removeClass("is-active");
				$(this).parent().addClass("is-active");
				tab_cont.fadeOut(0);
				parents.find("."+index).fadeIn(300);
				return false;
			});

			$(this).find('li:first').addClass("is-active");
			parents.find("."+index).fadeIn(300);
		});
	}
	tab();

	// datepicker
	$("#from").datepicker({
		showOn			: "both",
		buttonImage 	: "img/calendar.png",
		buttonImageOnly	: true,
		buttonText		: "Select date",
		numberOfMonths	: 1,
		dateFormat		: "dd.mm.yy",
		onClose: function( selectedDate ) {
			$("#to").datepicker("option", "minDate", selectedDate);
		}
	});
	$("#to").datepicker({
		showOn			: "both",
		buttonImage 	: "img/calendar.png",
		buttonImageOnly	: true,
		buttonText		: "Select date",
		numberOfMonths	: 1,
		dateFormat		: "dd.mm.yy",
		onClose: function( selectedDate ) {
			$("#from").datepicker("option", "maxDate", selectedDate);
		}
	}); 

	// calendar
	$('.js-calendar').slick({
		dots 			: false,
		infinite 		: false,
		speed 			: 500,
		cssEase 		: 'linear',
		slidesToShow 	: 3,
		slidesToScroll 	: 1
	});

	// video slider
	$('.js-video-slider').slick({
		dots 			: false,
		speed 			: 500,
		fade 			: true,
		slidesToShow 	: 1,
		slidesToScroll 	: 1
	});
});