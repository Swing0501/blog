var express = require("express");//加载模块
var router = express.Router();
var Category = require("../models/Category");
var Content = require('../models/Content');
var data;

/*
* 处理通用的数据
* */
router.use(function (req, res, next) {
    data = {
        userInfo: req.userInfo,
        categories: [],
        contents:[]
    };
    Category.find().then(function(category){
        data.categories = category;
    });
    Category.count().then(function(count) {
        data.count = count;
        next();
    });
    Content.find().then(function(content){
        data.contents = content;
    });
});

/*
* 首页
* */
router.get('/', function(req, res, next) {

    data.category = req.query.category || '';
    data.count = 0;
    data.page = Number(req.query.page || 1);
    data.limit = 6;
    data.pages = 0;
    var where = {};
    if (data.category) {
        where.category = data.category;

    }

    Content.where(where).count().then(function(count) {

        data.count = count;
        //计算总页数
        data.pages = Math.ceil(data.count / data.limit);
        //取值不能超过pages
        data.page = Math.min( data.page, data.pages );
        //取值不能小于1
        data.page = Math.max( data.page, 1 );

        var skip = (data.page - 1) * data.limit;

        return Content.where(where).find().limit(data.limit).skip(skip).populate(['category', 'user']).sort({
            addTime: -1
        });

    }).then(function(contents) {
        data.contents = contents;
        res.render('main/index', data);
    })
});

router.get('/detail', function (req, res){

    var contentId = req.query.contentid || '';

    Content.findOne({
        _id: contentId
    }).then(function (content) {
        data.content = content;

        content.views++;
        content.save();

        res.render('main/detail', data);
    });

});
router.get('/main/article', function (req, res){
    res.render('main/article',data);
});
router.get('/main/link', function (req, res){
    res.render('main/link',data);
});
router.get('/main/about', function (req, res){
    res.render('main/about',data);
});
router.get('/main/gustbook', function (req, res){
    res.render('main/gustbook',data);
});
router.get('/main/login', function (req, res){
    res.render('main/login',data);
});
module.exports = router;