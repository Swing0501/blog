var express = require("express");
var router = express.Router();
var User = require('../models/User');
var Content = require('../models/Content');

//统一返回格式
var responseDate;
router.use(function(req, res, next){
    responseDate = {
        code:0,
        message:''
    };
    next();
});
/*
* 用户注册
* 注册逻辑：
*   1.用户名不能为空
*   2.密码不能为空
*   3.两次输入密码必须一致
*
*   1.用户是否已经被注册
*       数据库查询
* */
router.post('/user/sign',function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;

    //用户名是否为空
    if(username == ''){
        responseDate.code = 1;
        responseDate.message = "用户名不能为空";
        res.json(responseDate);
        return;
    }
    //密码是否为空
    if(password == ''){
        responseDate.code = 2;
        responseDate.message = "密码不能为空";
        res.json(responseDate);
        return;
    }
    //两次输入的密码必须一致
    if(password != repassword){
        responseDate.code = 3;
        responseDate.message = "两次输入密码不一致";
        res.json(responseDate);
        return;
    }
    //用户是否已经被注册了，如果数据库中存在和我们注册的用户名同名的数据，表示该用户已经被注册
    User.findOne({
        username:username
    }).then(function (userInfo) {
        if(userInfo){
            //表示数据库中有该记录
            responseDate.code = 4;
            responseDate.message = "该用户名已经被注册";
            res.json(responseDate);
            return;
        }
        //保存用户注册的信息到数据库中
        var user = new User({
            username:username,
            password:password
        });
        return user.save();
    }).then(function (newUserInfo) {
        responseDate.message = "注册成功";
        res.json(responseDate);
    });
});
/*
* 登录
* */
router.post('/user/login',function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    if(username == ''||password == ''){
        responseDate.code = 0;
        responseDate.message = '用户名和密码不能为空';
        return;
    }
    //查询数据库相同的用户名和密码的记录是否存在，如果存在则登录成功
    User.findOne({
        username:username,
        password:password
    }).then(function(userInfo){

        if(!userInfo){
            responseDate.code = 2;
            responseDate.message = '用户名或密码错误';
            res.json(responseDate);
            return;
        }
        //用户名和密码正确
        /*console.log(userInfo)*/
        if(userInfo.isAdmin){
            responseDate.code = 5;
        }
        responseDate.message = '登录成功';
        responseDate.userInfo = {
            _id:userInfo._id,
            username:userInfo.username
        };
        req.cookies.set('userInfo', JSON.stringify({
            _id:userInfo._id,
            username:encodeURI(userInfo.username)
        }));
        res.json(responseDate);
        return;

        })

});

/*
* 退出
* */

router.get('/user/logout',function(req, res){
    req.cookies.set('userInfo', null);
    res.json(responseDate);
});

/*
* 获取文章的所有评论
* */

router.get('/comment',function(req, res){
    var contentId = req.query.contentid||'';

    Content.findOne({
        _id:contentId
    }).then(function (content) {
        responseDate.data = content.comments;
        res.json(responseDate);
    })
})
/*
评论提交
* */

router.post('/comment/post',function (req, res) {
    //内容的id
    var contentId = req.body.contentid||'';
    var postDate = {
        username:req.userInfo.username,
        postTime:new Date(),
        content:req.body.content
    };
    //查询这篇内容的信息
    Content.findOne({
        _id:contentId
    }).then(function (content) {
        content.comments.push(postDate);
        return content.save();
    }).then(function(newContent){
        responseDate.message = "评论成功";
        responseDate.data = newContent;
        res.json(responseDate);
    })
});
module.exports = router;