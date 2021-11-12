

window.onload = function () {

	var elm = ".oneslide";
	var onpage_on = true;
	var section_index=3;
	var moveTop = 0;
	
	var total_section = 0; //전체 원페이지 수
	var current_idx = 0;
	var screen_h = 0; // 화면 높이
	var page_h = 0;
	var last_y = 0; // 스크롤 마지막 하단 높이
	var onpage_on = true;
	var isScroll = false;

	$(elm).each(function (index) {

		init();

		// 개별적으로 Wheel 이벤트 적용

		$(this).on("mousewheel DOMMouseScroll", function (e) {
			
			e.preventDefault();
			var delta = 0;		

			if(last_y > $(window).scrollTop() && !onpage_on){
			
			//원페이지 스크롤 진입
			console.log(":: 원페이지 시작 ::");
			onpage_on = true;
			isScroll = false;
			}

			if(last_y < $(window).scrollTop() && onpage_on){
			
			//원페이지 스크롤 끝
			console.log(":: 원페이지 끝 ::");
			onpage_on =false;
			isScroll = false;
			}

			if (!event) event = window.event;
			if (event.wheelDelta) {
				delta = event.wheelDelta / 120;
				if (window.opera) delta = -delta;
			} else if (event.detail)

			delta = -event.detail / 3;
			var moveTop = $(window).scrollTop();
			var elmSelecter = $(elm).eq(index);
					
			// 마우스휠을 위에서 아래로
			if (delta < 0) {
				if ($(elmSelecter).next() != undefined) {
					try{
						moveTop = $(elmSelecter).next().offset().top;
					}catch(e){}
				}
			// 마우스휠을 아래에서 위로
			} else {
				if ($(elmSelecter).prev() != undefined) {
					try{
						moveTop = $(elmSelecter).prev().offset().top;
					}catch(e){}
				}
			}		
		

			// 화면 이동 0.8초(800)
			$("html,body").stop().animate({
				scrollTop: moveTop + 'px'
			}, {
				duration: 500, complete: function () {
			}
			});

		});

	function init(){
		
		setHeight();
		
		total_section = 3;
		last_y = page_h * total_section;
	}
	
	function setHeight(){

	//var elmnt = document.getElementById("dd");
	// 높이 설정
	//screen_h = elmnt.clientHeight;
	screen_h = $(window).height();
	page_h = screen_h;
	$("#onepage > section").height(page_h);

}


});
}