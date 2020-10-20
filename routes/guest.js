var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var news = require('../model/guestbook');

// mongoose.connect('mongodb://lazygang:lzg2752309@106.55.12.105:31212/test?authSource=admin', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', function () {
    // console.log('connected');
});

router.post('/', function (req, res,) {
    var comment = req.body
    console.log(comment)
    news.create(comment,function(err,doc){
        if(!err){
            console.log('成功添加');
        }
    })
})

router.get('/content', function (req, res, next) {
    news.find({}, function (err, doc) {
        if (err) {
            res.json({
                success: 'fail',
                data: null
            })
        } else {
            res.json({
                success: 'true',
                data: doc,
            })
        }
    })
})

module.exports = router;
