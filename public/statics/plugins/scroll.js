// --- plugins ---

$(document).ready(function(){
	$(document).scroll(function(){
		var scroll = $(window).scrollTop();
		if(scroll >= 150){
			$(".header").addClass("top-fixed")
		}else if(scroll < 150){
			$(".header").removeClass("top-fixed");
		}
	})
})