$(document).ready(function() {

	// variables
	var drop 		= $('.js-dropdown'),
		allList 	= $('.js-dropdown-list'),
		select 		= $('.js-select'),
		selectList 	= $('.js-select-list'),
		wind 		= $('.js-wind');


	$('body').on('click', function() {
		select.removeClass("is-active");
		selectList.slideUp(200);
		$('.js-talk-popup').removeClass('is-active');
		wind.fadeOut(300);
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
	$('.js-dropdown-arr').on('click', function(event){
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
		return false;
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

				$('.js-fullcalendar').fullCalendar('render');

				return false;
			});

			if (tab_item.hasClass('is-active')) {
				var index = $('.js-tab-item.is-active a').attr("href");
				parents.find("."+index).fadeIn(300);
			}
			else {
				$(this).find('li:first').addClass("is-active");
				parents.find("."+index).fadeIn(300);
			}
			
		});
	}
	tab();

	// datepicker
	$('[id^="from"]').datepicker({
		showOn			: "both",
		buttonImage 	: "img/calendar.png",
		buttonImageOnly	: true,
		numberOfMonths	: 1,
		dateFormat		: "dd.mm.yy",
		dayNamesMin: ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],
		monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
		onClose: function( selectedDate ) {
			$("#to").datepicker("option", "minDate", selectedDate);
		}
	});
	$('[id^="to"]').datepicker({
		showOn			: "both",
		buttonImage 	: "img/calendar.png",
		buttonImageOnly	: true,
		numberOfMonths	: +1,
		dateFormat		: "dd.mm.yy",
		dayNamesMin: ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],
		monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
		onClose: function( selectedDate ) {
			$("#from").datepicker("option", "maxDate", selectedDate);
		}
	}); 

	function LastDayOfMonth(Year, Month) {
	    return(new Date((new Date(Year, Month+1,1))+1)).getDate();
	}
	$('[id^="with"]').datepicker({
		showOn			: "both",
		buttonImage 	: "img/calendar.png",
		buttonImageOnly	: true,
		numberOfMonths	: 1,
		dateFormat		: "dd.mm.yy",
		dayNamesMin: ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],
		monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
		onClose: function( selectedDate ) {
			$("#to").datepicker("option", "minDate", selectedDate);
		},
		beforeShowDay: function (date) {
        if (date.getDate() == LastDayOfMonth(date.getFullYear(),date.getMonth())) {
            	return [true, ''];
	        }
	        return [false, ''];
	    }
	});
	$('[id^="before"]').datepicker({
		showOn			: "both",
		buttonImage 	: "img/calendar.png",
		buttonImageOnly	: true,
		numberOfMonths	: +1,
		dateFormat		: "dd.mm.yy",
		dayNamesMin: ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],
		monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
		onClose: function( selectedDate ) {
			$("#from").datepicker("option", "maxDate", selectedDate);
		},
		beforeShowDay: function (date) {
        if (date.getDate() == LastDayOfMonth(date.getFullYear(),date.getMonth())) {
            	return [true, ''];
	        }
	        return [false, ''];
	    }
	}); 
	$('.js-datepicker').datepicker({
		showOn			: "both",
		buttonImage 	: "img/calendar.png",
		buttonImageOnly	: true,
		numberOfMonths	: 1,
		dayNamesMin: ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],
		monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
		dateFormat		: "dd.mm.yy"
	});

	// calendar
	$('.js-calendar').slick({
		dots 			: false,
		infinite 		: false,
		speed 			: 500,
		cssEase 		: 'linear',
		slidesToShow 	: 3,
		slidesToScroll 	: 3
	});

	// days
	$('.js-slider-days').slick({
		dots 			: false,
		speed 			: 500,
		infinite 		: false,
		cssEase			: 'linear',
		slidesToShow 	: 1,
		slidesToScroll 	: 1
	});

	// trigger
	$('.js-calendar .slick-next').on('click', function(){
		if ($(window).width() > 768) {
			$('.js-doc-right .js-slider-days .slick-next').trigger( "click" );
		};
	});
	$('.js-calendar .slick-prev').on('click', function(){
		if ($(window).width() > 768) {
			$('.js-doc-right .js-slider-days .slick-prev').trigger( "click" );
		};
	});
	
	$('.js-doc-calendar .js-calendar .slick-next').on('click', function(){
		$(this).parents('.js-doc-calendar')
		.find('.js-slider-days .slick-next')
		.trigger( "click" );
	});
	$('.js-doc-calendar .js-calendar .slick-prev').on('click', function(){
		$(this).parents('.js-doc-calendar')
		.find('.js-slider-days .slick-prev')
		.trigger( "click" );
	});

	// wrap calendar
	$('.js-wrap-calendar .js-calendar .slick-next').on('click', function(){
		$('.js-slider-days .slick-next').trigger( "click" );
	});
	$('.js-wrap-calendar .js-calendar .slick-prev').on('click', function(){
		$('.js-slider-days .slick-prev').trigger( "click" );
	});

	$('.js-wrap-calendar .day__in a').on('click', function(){
		$(this).parents('.js-wrap-calendar')
		.find('.js-popup')
		.toggleClass('is-active');
		$('body').addClass('is-hidden');
		return false;
	});

	$('.js-close-popup').on('click', function(){
		$(this).parents('.js-popup').removeClass('is-active');
		$('body').removeClass('is-hidden');
	});
	$('.js-popup').on('click', function(event){
		event.stopPropagation();
	});

	$('.js-popup').on('click', function(){
		$(this).removeClass('is-active');
		$('body').removeClass('is-hidden');
	});

	$('.js-popup-in').on('click', function(event){
		event.stopPropagation();
	});

	// oprn day
	$('.js-open-day').on('click',function(){
		$(this).parents('.js-slider-days')
		.addClass('is-open');

		return false;
	});

	// video slider
	$('.js-video-slider').slick({
		dots 			: false,
		speed 			: 500,
		fade 			: true,
		slidesToShow 	: 1,
		slidesToScroll 	: 1,
		responsive: [
			{
				breakpoint: 960,
				settings: {
					dots: true
				}
			}
		]
	});

	$('.js-ad-slide').slick({
		dots 			: true,
		speed 			: 800,
        arrows			: false,
		fade 			: true,
		// autoplay		: true,
		// autoplaySpeed	: 4000,
		cssEase			: 'linear',
		slidesToShow 	: 1,
		slidesToScroll 	: 1
	});

	// init calendar
	$('.js-fullcalendar').each(function(){
		var calendar 	= $(this),
			lastConsult = '#dfecec',
			dayConsult 	= '#caa6c8';
		calendar.fullCalendar({  
			firstDay: 1, 
			header: {
				left: 'prev',
				center: 'title',
				right: 'next'
			},
			height: "auto",
			monthNames:
				['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'], 
			events: [
				{
					start: '2015-12-14',
					overlap: false,
					rendering: 'background',
					color: lastConsult,
					textColor: '#fff',
					id: 'add',
				},
				{
					start: '2015-12-09',
					end: '2015-12-09',
					overlap: false,
					rendering: 'background',
					color: dayConsult
				}
			],
			eventRender: function(event, el){
				console.log(event, el);
			}
		});
	});

	// menu mob
	var headWrap 	= $('.js-header-wrap'),
		btnMenu 	= $('.js-btn-menu'),
		body 		= $('body');
	btnMenu.on('click', function(event){
		var this_ 	= $(this);
		if (!this_.hasClass('is-active')){
			this_.addClass('is-active');
			body.addClass('is-open-menu');
		}
		else {
			this_.removeClass('is-active');
			body.removeClass('is-open-menu');
		}

		$('.js-btn-search').removeClass('is-active');
		$('.js-filter-in').slideUp(300);

		event.stopPropagation();
	});
	$('body').on('click', function() {
		btnMenu.removeClass('is-active');
		body.removeClass('is-open-menu');
	});

	// filter mob
	var btnSearch 	= $('.js-btn-search'),
		filtIn 		= $('.js-filter-in');
	btnSearch.on('click', function(event){
		$(this).toggleClass('is-active');
		filtIn.slideToggle(300);
		event.stopPropagation();
	});
	$('body').on('click', function() {
		if($(window).width() <= 1024) {
			btnSearch.removeClass('is-active');
			filtIn.slideUp(300);
		}
	});

	$(document).scroll(function() {    
		var scroll 	= $(this).scrollTop(),
			hDoc 	= $(document).height(),
			hWind 	= $(window).height(),
			hFooter = $('.footer').height(),
			hCall 	= $('.js-call .call__circle').height(),
			call 	= $('.js-call'),
			scroll_position = hDoc - hWind - hFooter - hCall;
		if (scroll >= scroll_position) {
			call.addClass('is-go-top');
		}
		else{
			call.removeClass('is-go-top');
		}
	});
	
	// sub copy img
	$('.js-increase').on('click', function(){
		var this_ 		= $(this),
			wrap 		= this_.parents('.js-sub-wrap'),
			videoSmall 	= this_.parents('.js-sub-small'),
			srcSmall 	= videoSmall.data('src'),
			videoAct 	= wrap.find('.js-sub-active'),
			srcAct 		= videoAct.find('img');
		srcAct.attr('src', srcSmall);
		$('.js-sub-small').removeClass('is-active');
		videoSmall.addClass('is-active');
	});

	// open talk popup
	$('.js-open-wind').on('click', function(event){
		var this_ 	= $(this),
			parent 	= this_.parents('.js-talk-popup'),
			wind 	= parent.find('.js-wind');
		if (!parent.hasClass('is-active')) {
			parent.addClass('is-active');
			wind.fadeIn(300);
		}
		else {
			parent.removeClass('is-active');
			wind.fadeOut(300);
		}
		event.stopPropagation();
	});

	// sorting
	$('.js-sorting-item').on('click', function(){

		$(this).parents('.js-sorting')
		.find('.js-sorting-item')
		.removeClass('is-active');

		$(this).toggleClass('is-active');

		return false;
	});

	// reg text
	$('.js-reg-inf').on('click', function(){
		var this_ 	= $(this),
			parent 	= this_.parents('.js-field'),
			input 	= parent.find('.js-td-input');
		if (!parent.hasClass('is-reg')){
			parent.addClass('is-reg');
			input.removeAttr('readonly');
		}
		else {
			parent.removeClass('is-reg');
			input.attr('readonly');
		}
		return false;
	});

	// delete field
	$('.js-del-field').on('click', function(){
		$(this).parents('.js-field').remove();
		return false;
	});
	
	// messages open
	$('.js-open-messeges').on('click', function(){
		$(this).parents('.js-messages').addClass('is-open');
		return false;
	});

	// scroll to chat
	$('.js-scroll-to').on('click', function(){
		if ($(window).width() > 960) {
			return false;
		}
		else {
			var page = $(this).attr("href");
				$('html, body').animate({
					scrollTop: $(page).offset().top - 30
				}, 600);
				return false;
		}
	});

	// add remove wrapper
	$('body').on('click', '.js-btn-add-wrap', function(){
		var this_ 	= $(this),
			parent 	= this_.parents('.js-add-wrapper'),
			wrap 	= parent.find('.js-wrapper'),
			wrapIn 	= parent.find('.js-wrapper-in');
		if (parent.hasClass('is-mod')) {
			wrap.clone().appendTo(wrapIn)
			.removeClass('is-hide')
			.removeClass('js-wrapper');
		}
		else {
			wrap.clone().appendTo(parent)
			.removeClass('is-hide')
			.removeClass('js-wrapper');
		}
	});
	$('body').on('click', '.js-remove-wrapper', function(){
		$(this).parent().remove();
	});

	// item remove
	$('.js-remove-item').on('click', function(){
		$(this).parents('.js-item').remove();
		return false;
	});

	// add remove graph
	$('body').on('click', '.js-add-graph', function(){
		var this_ 	= $(this),
			parent 	= this_.parents('.js-graph-wrap'),
			wrap 	= parent.find('.js-graph'),
			wrapIn 	= parent.find('.js-graph-wrap-in');
		wrap.clone().appendTo(wrapIn)
		.removeClass('is-hide')
		.removeClass('js-wrapper');
	});

	$('body').on('click', '.js-btn-add-graph', function(){
		$(this).parents('.graph').remove();
	});
	
	$('.js-mute').on('click', function(){
		$(this).toggleClass('is-active');
	});

});