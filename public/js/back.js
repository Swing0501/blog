$( function() {
   
    
   $(".aside_sh").click(function(){
   	$(this).parent().next().toggleClass("aside_hide aside_show");
   	if ($(this).parent().next().attr("class")=="aside_hide") {
   		$(this).html("编辑");
   	} else if($(this).parent().next().attr("class")=="aside_show") {
   		$(this).html("取消");
   	}
   })

    

  } );