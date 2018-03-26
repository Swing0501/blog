var prepage = 10;
var page = 1;
var pages = 0;
var comments = [];

$("#messageBtn").on('click',function () {
    $.ajax({
        type:'POST',
        url:'/api/comment/post',
        data:{
            contentid:$('#contentId').val(),
            content:$('#messageContent').val()
        },
        success:function (responseDate) {
            $('#messageContent').val('');
            comments = responseDate.data.comments.reverse();
            renderComment();

        }
    })
});

//每次页面刷新时候获取该文章的所有评论
$.ajax({
    url:'/api/comment',
    data:{
        contentid:$('#contentId').val(),
    },
    success:function (responseDate) {
        comments = responseDate.data.reverse();
        renderComment();

    }
});

$('.pager').delegate('.page','click',function () {
    if($(this).parent().hasClass('previous')){
        page--;
    }else{
        page++;
    }
    renderComment();
});

function renderComment() {
    $('#messageCount').html(comments.length);

    pages = Math.max(Math.ceil(comments.length / prepage), 1);
    var start = Math.max(0, (page-1) * prepage);
    var end = Math.min(start + prepage, comments.length);
    var $lis = $('.pager li');
    $lis.eq(1).html(page+'/'+pages);

    if(page<=1){
        page=1;
        $lis.eq(0).html('<a href="javascript:;" class=" pull-left" disabled="disabled" title="没有上一页"><<<</a>');
    }else{
        $lis.eq(0).html('<a href="javascript:;" class=" pull-left page" title="上一页"><<<</a>');
    }
    if(page>=pages){
        page=pages;
        $lis.eq(2).html('<a href="javascript:;" class=" pull-right" disabled="disabled" title="没有下一页">>>></a>');
    }else{
        $lis.eq(2).html('<a href="javascript:;" class=" pull-right page" title="下一页">>>></a>');
    }

    if(comments.length == 0){
        $('#messageList').html('<div class="noReview"><p>静 待 您 来 抢 沙 发 .....</p></div>');
    }else {
        var html = '';
        for (var i = start; i < end; i++) {
            html += '<div class="review_box"><div class="review"><img src="/public/img/aboutme2.jpg" class="review_img"><span class="review_name">' + comments[i].username + '</span><time>' + formatDate(comments[i].postTime) + '</time><input type="button" value="回复" class="review_btn  pull-right" ><p class="review_content">' + comments[i].content + '</p></div></div>';
            $('#messageList').html(html);
        }
    }
}

function formatDate(d) {
    var date1 = new Date(d);
    return date1.getFullYear() + '年' + (date1.getMonth()+1) + '月' + date1.getDate() + '日 ' + date1.getHours() + ':' + date1.getMinutes() + ':' + date1.getSeconds();
}