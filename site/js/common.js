$(document).ready(function() {

	$(document).click(function() {
		$(".js-select").removeClass("is-active");
		$(".js-select-list").slideUp(200);
	});

	// select list
	$("body").on("click",".js-select",function(event) {
		event.stopPropagation();
	});
	$("body").on("click",".js-select-text",function(event) {
		var select = $(this).parents(".js-select");
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
		var val = $(this).attr("data-val");
		var text = $(this).text();
		var select = $(this).parents(".js-select");
		var selectList = $(this).parents(".js-select-list");
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

	// tab
	function tab() {
		$(".js-tab").each(function(){
			var tab_link = $(this).find("a"),
				tab_item = $(this).find("li"),
				index = tab_link.attr("href"),
				parents = $(this).parents(".js-tab-group"),
				tab_cont = parents.find(".js-tab-cont");
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
});