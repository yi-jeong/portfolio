var total_section = 0; //전체 원페이지 수
var current_idx = 0;
var screen_h = 0; // 화면 높이
var page_h = 0;
var last_y = 0; // 스크롤 마지막 하단 높이
var onpage_on = true;
var isScroll = false;

window.addEventListener('load', function(){
	setTimeout(function(){
		document.documentElement.scrollTop=0;
	})
});

$(document).ready(function(){


if ($(window).width()> 1200){
	
	
	init();

		
	// Scroll Event
	$('body').on('scroll touchmove mousewheel', function(event) {	
		
		var t=$("html").scrollTop();
		var zz=$(window).scrollTop();
		console.log("screen_h: "+screen_h);
		console.log("last_y: "+last_y);
		console.log("t: "+t);
		console.log("zz: "+zz);
		console.log("isScroll: "+isScroll);

		if(last_y > $("html").scrollTop() && !onpage_on){
			
			//원페이지 스크롤 진입
			console.log(":: 원페이지 시작 ::");
			onpage_on = true;
			isScroll = false;
		}

		var portimg=document.getElementById("port");
		if(last_y<=t){
			$('#port>div>ul').animate({opacity:1},'slow');
		}
		
		if(!onpage_on) return;
		
		//스크롤 이벤트 막기
		//event.preventDefault();
		//event.stopPropagation();		
		if(isScroll) return; // 현재 스크롤이 동작중이면 종료
		
		
		isScroll = true;		
		var direction = event.originalEvent.wheelDelta; //마우스 휠 방향
		var y = 0;

		if(direction > 0){
			// up
			if(current_idx > 0){current_idx --;}
			y = current_idx * page_h;
		}
		else{
			// down
			current_idx ++;		
			if(current_idx > total_section){
				current_idx = total_section;
				onpage_on = false;
				return;
			}			
			y = current_idx * page_h;		
		}

		console.log("direction: "+direction);
		console.log("onpage_on: "+onpage_on);
		console.log("current_idx: "+current_idx);
		console.log("total_section: "+total_section);

		$('html').animate({scrollTop: y}, 500, function(){isScroll=false;});	
	});


};

});

$( window ).resize(function() {
	
	// 반응형
	setHeight();
});


function init(){
	
	setHeight();
	
	total_section = $('#onepage > section').length;
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