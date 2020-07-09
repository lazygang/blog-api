var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var news = require('../model/new');

mongoose.connect('mongodb://106.55.12.105:31212/test', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', function () {
    console.log('connected');
});

router.get('/top', function (req, res, next) {
    var page = 1;
    var backdata = []
    page = req.query.page;
    console.log(page);
  
    
    news.find({}, function (err, doc) {
        if (err) {
            res.json({
                success: 'fail',
                data: null
            })
        } else {
            backdata = doc.slice((page*10-10),(page*10))
            // console.log(backdata);
            // console.log(doc);
            
            res.json({
                success: 'true',
                data: backdata,
            })
        }
    })
})
router.get('/shehui', function (req, res, next) {
    news.find({ category: "社会" }, function (err, doc) {
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
router.get('/guonei', function (req, res, next) {
    news.find({ category: "国内" }, function (err, doc) {
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
router.get('/guoji', function (req, res, next) {
    news.find({ category: "国际" }, function (err, doc) {
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
router.get('/yule', function (req, res, next) {
    news.find({ category: "娱乐" }, function (err, doc) {
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
