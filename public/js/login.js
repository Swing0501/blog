$(function () {
    var $loginBox = $("#loginBox");
    var $signBox = $("#registerBox");
    var $userInfo = $("#userInfo");

    //切换到注册面板
    $loginBox.find('a.colMint').on('click',function(){
        $signBox.show();
        $loginBox.hide();
    });

    //切换到登录面板
    $signBox.find('a.colMint').on('click',function(){
        $loginBox.show();
        $signBox.hide();
    });

    //注册
    $signBox.find('button').on('click',function(){
        //ajax请求
        $.ajax({
            type:'post',
            url:'/api/user/sign',
            data:{
                username:$signBox.find("[name='username']").val(),
                password:$signBox.find("[name='password']").val(),
                repassword:$signBox.find("[name='repassword']").val()
            },
            dataType:"json",
            success:function(result){
                    $signBox.find('.colWarning').html(result.message);
                    if(!result.code){
                        setTimeout(function(){
                            $loginBox.show();
                            $signBox.hide();
                        },1000);

                    }
            }
        });
    });

    //登录
    $loginBox.find('button').on('click',function(){
        $.ajax({
            type:'post',
            url:'/api/user/login',
            data:{
                username:$loginBox.find("[name='username']").val(),
                password:$loginBox.find("[name='password']").val()
            },
            dataType:"json",
            success:function(result){
                $loginBox.find('.colWarning').html(result.message);
                /*window.location.href="/";*/
                setTimeout(function () {
                    if(result.code==5){
                        window.location.href="/admin";
                    }else if(result.code==0){
                        window.location.href="/";
                    }else{
                        window.location.reload();
                    }
                },1000)

            }
        });
    });

    //退出
    $('#logout').on('click',function(){
        $.ajax({
            url:'/api/user/logout',
            success:function(result){
                if(!result.code){
                    window.location.reload();
                }
            }
        });
    });
});