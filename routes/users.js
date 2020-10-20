var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var users = require("../model/user");
var moment = require("moment");
const JwtUtil = require("../jwt");

mongoose.connection.on("connected", function () {
  console.log("connected");
});
// 登录验证接口
router.post("/login", function (req, res) {
  let jwt = new JwtUtil(req.body.name);
  let token = jwt.generateToken();
  res.header("token", token);
  users.findOne({ name: req.body.name }, function (err, doc) {
    // console.log(doc);
    if (err) {
      res.json({
        success: 0,
        data: null,
      });
    } else {
      if (doc.passWord == req.body.passWord) {
        res.json({
          success: 1,
          data: doc,
        });
      } else {
        res.json({
          success: 0,
          data: null,
          msg: "用户名或密码错误",
        });
      }
    }
  });
});
// 注册接口
router.post("/register", function (req, res) {
  let data = req.body;
  var createTime = new Date();
  createTime = moment(createTime).format("YYYY-MM-DD");
  data.createTime = createTime;
  data.level = "common";
  data.head = "#iconqie-01";
  // console.log(data);
  // return false
 
  users.create(data, function (err, doc) {
    if (err) {
      res.json({
        success: 0,
        data: null,
      });
    } else {
      console.log(data);
      res.json({
        success: 1,
        data: data,
      });
    }
  });
});
// 检查用户名是否已存在
router.get("/checkName", function (req, res, next) {
  users.findOne({ name: req.query.name }, function (err, doc) {
    if (err) {
      res.json({
        success: 0,
        data: null,
      });
    } else {
      res.json({
        success: 1,
        data: doc,
      });
    }
  });
});
// 检查昵称是否已存在
router.get("/checkNickName", function (req, res, next) {
  users.findOne({ nickName: req.query.nickName }, function (err, doc) {
    if (err) {
      res.json({
        success: 0,
        data: null,
      });
    } else {
      res.json({
        success: 1,
        data: doc,
      });
    }
  });
});

module.exports = router;
