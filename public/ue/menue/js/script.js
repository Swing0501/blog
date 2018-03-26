$(document).ready( function() {
	var $submenu = $('.submenu');
	var $mainmenu = $('.mainmenu');
	$submenu.hide();
	/*$submenu.first().delay(400).slideDown(700);*/
	$submenu.on('click','li', function() {
		$submenu.siblings().find('li').removeClass('chosen');
		$(this).addClass('chosen');
	});
	$mainmenu.on('click', 'li', function() {
		$(this).next('.submenu').slideToggle().siblings('.submenu').slideUp();
	});
    $('.htmleaf-content').height($(document).height()) ;
	/*$mainmenu.children('li:last-child').on('click', function() {
		$mainmenu.fadeOut().delay(500).fadeIn();
	});*/
    /*var scrollHeight = $(document).scrollTop();
    var winheight = $(window).height();

    $(document).scroll(function(){
        $('.htmleaf-content').css({
			top:scrollHeight-70-winheight+'px',
			position:"releative"
		})
	})*/

});