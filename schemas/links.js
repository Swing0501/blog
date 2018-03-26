var mongoose = require("mongoose");

//友链的表结构
module.exports = new mongoose.Schema({
    //友链名称
    name:String,
    //友链简介
    description: {
        type: String,
        default: ''
    },
    //友链地址
    addr: {
        type: String,
        default: ''
    },
    //友链图片
    img: {
        type: String,
        default: ''
    }

});
