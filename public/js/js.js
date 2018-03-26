$(document).ready(function(){

	/*导航栏中的鼠标移入移出*/
	var timer = null;
	$('.dropdown-toggle').hover(function(){
		clearTimeout(timer);
		$('.share').addClass('open');
	},function(){
		timer = setTimeout(function(){
			$('.share').removeClass('open');
		},100);
	});
	$('.dropdown-menu').hover(function(){
		clearTimeout(timer);
	},function(){
		timer = setTimeout(function(){
			$('.share').removeClass('open');
		},100);
	});

var winheight = $(window).height();
var winwidth = $(window).width();
$('#main_pic').css({
    height:winheight,
    width:winwidth
});
$('#main_pic_small').css({
    height:winheight/3+60+"px",
    width:winwidth
});
console.log(winheight,winwidth);
console.log($('#main_pic').width());



	//侧边栏
	//导航条随着滚动条淡入淡出

	var jWindow = $(window);
	jWindow.scroll(function(e){
		sidebar_scroll("#main_con");
	});
	function sidebar_scroll(id){
		var scrollHeight = jWindow.scrollTop();
		var nav = $(".nav_title");
		var contentHeight = $(id).height()-$(".aside_right").height();
		/*console.log(scrollHeight+"---"+contentHeight);*/
		if (scrollHeight>winheight+350&&scrollHeight<contentHeight+winheight+350) {
			$(".aside_right").css({
				top:scrollHeight-350-winheight+'px'
			})
		}else if(scrollHeight<=350+winheight){
			$(".aside_right").css({
				top:"0px"
			})
		}
		if (scrollHeight<=600&&scrollHeight>0) {
			nav.fadeIn("fast",function(){
	         	nav.animate({"opacity":"0.8"},0);
	         });
		} else {
			nav.fadeIn("fast",function(){				
	         	nav.animate({"opacity":"1"},0);
	         });
		}
	}

//点击效果
	var clickCount = 0;
	$("body").click(function(e) {
	var a = new Array("富强", "文明", "和谐", "自由", "平等", "公正" ,"法治", "爱国", "敬业", "诚信", "友善");
	var $i = $("<span/>").text(a[clickCount]);
	        clickCount = (clickCount + 1) % a.length;
	var x = e.pageX, y = e.pageY;

		$i.css({
		"z-index": 9999,
		"top": y - 20,
		"left": x,
		"position": "absolute",
		"font-weight": "bold",
		"color": "#ff6651"
		});
		$("body").append($i);
		$i.animate({
			"top": y - 180,
			"opacity": 0
			},1500,function() {
	            $i.remove();
	     });
		e.stopPropagation();

});

	//时间
    var s1 = '2018-03-01';

    s1 = new Date(s1.replace(/-/g, "/"));
    s2 = new Date();

    var days = s2.getTime() - s1.getTime();
    var time = parseInt(days / (1000 * 60 * 60 * 24));
	$('#webdate').html('网站运行 : '+time+" 天");

	$('.navbar-toggle').on('click',
		function(){
			$('#myCollapse').toggle();
		}
	)
})
