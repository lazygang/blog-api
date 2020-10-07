var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../model/user');
const JwtUtil = require('../jwt');

mongoose.connect('mongodb://lazygang:lzg2752309@106.55.12.105:31212/test?authSource=admin', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', function () {
    console.log('connected');
});

router.post('/login', function (req, res,) {
    let jwt = new JwtUtil(req.body.name);
    let token = jwt.generateToken();

    // user.create(comment,function(err,doc){
    //     if(!err){
    //         console.log('成功添加');
    //     }
    // })
    // res.header('token',token)
    res.header("token", token);
    res.json({
      success:'true',
      token
    })
})
router.post('/register', function (req, res,) {
   
    console.log(req.body.name)
    let jwt = new JwtUtil(req.body.name);
    let token = jwt.generateToken();
    // user.create(comment,function(err,doc){
    //     if(!err){
    //         console.log('成功添加');
    //     }
    // })
    res.json({
      success:'true',
      token,
    })
})

router.post('/test', function (req, res, next) {
  console.log(res);
    res.json({
        success:'true',
      })
})

module.exports = router;
