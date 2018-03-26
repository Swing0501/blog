$(function(){
  var jWindow = $(window);
  var jDocument = $(document);
  var oTop = $("#to_top");
  var oSearch = $("#to_search");
  var oSearchkey=$(".search_keys");
  var screenw = jWindow.width(); //屏幕宽
  var screenh = jWindow.height();//屏幕高

    
  //返回顶部
    oTop.css({
      left : screenw - oTop.outerWidth(true)-20 +"px",
      top : screenh - oTop.outerHeight(true)-20 + "px"
    }); 

    oSearch.css({
      left : screenw - oTop.outerWidth(true)-20 +"px",
      top : screenh - oTop.outerHeight(true)-65 + "px"
    }); 

    jWindow.scroll(function(){
      var scrollHeight = jWindow.scrollTop();
      oTop.css({
        left : screenw - oTop.outerWidth(true)-20 +"px",
        top : screenh - oTop.outerHeight(true)+scrollHeight-20 + "px"
      })  
      oSearch.css({
        left : screenw - oTop.outerWidth(true)-20 +"px",
        top : screenh - oTop.outerHeight(true)+scrollHeight-65 + "px"
      })  
    })
    
     oTop.click(function(){
        $("html,body").animate({scrollTop: 0},1500);
    });
        
    function center(obj){
        var windowWidth = document.documentElement.clientWidth;   
        var windowHeight = document.documentElement.clientHeight;   
        var popupHeight = $(obj).height();   
        var popupWidth = $(obj).width();    
        $(obj).css({   
        "position": "absolute",   
        "top": (windowHeight-popupHeight)/2+$(document).scrollTop(),   
        "left": (windowWidth-popupWidth)/2   
        });
    }

    function delDiv(obj){
      $(obj).hide();
      $(obj).css("display","none");
    } //点击删除层；

     function showDiv(obj){
         $(obj).show();
         center(obj);
         $(window).scroll(function(){
          center(obj);
         });
         $(window).resize(function(){
          center(obj);
         });
    }

    function pos(obj) {
       this.step = this.step ? this.step : 0;
       this.step = this.step == 4 ? 0 : this.step;
       var set = {
        0: { x: 0, y: -1 },
        1: { x: -1, y: 0 },
        2: { x: 0, y: 1 },
        3: { x: 1, y: 0 }
       }
       return set[this.step++];
      }
     
    var searchOn = true;
    oSearch.click(function(){
      if(!searchOn){
        delDiv(oSearchkey);
      }else{
        showDiv(oSearchkey);
        $("#search_key").focus();
      //抖动效果
      
        var len = 4, //晃动的距离，单位像素
        c = 8, //晃动次数，4次一圈
        step = 0, //计数器
        off = oSearchkey.offset();
        this.step = 0;
        timer = setInterval(function () {
          var set = pos(oSearchkey);
          oSearchkey.offset({ top: off.top + set.y * len, left: off.left + set.x * len });
          if (step++ >= c) {
            oSearchkey.offset({ top: off.top, left: off.left }); //抖动结束回归原位
            clearInterval(timer);
          }
        }, 45);
    } 
      searchOn = !searchOn;
    });

    $("#search_close").click(function(){
      delDiv(oSearchkey);
      searchOn = !searchOn;
    });

    $("#search_key").blur(function(){
      if ($("#search_key").val()=="") {
        delDiv(oSearchkey);
        searchOn = !searchOn;
      } 
    })

    //See More
    $("#seeMore").click(function(){
      $("html,body").animate({scrollTop: screenh},1500);
    })

      
})