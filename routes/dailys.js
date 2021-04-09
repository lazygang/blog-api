var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var dailys = require("../model/dailys");
var moment = require("moment");
var localhost = require("../localhost");
const JwtUtil = require("../jwt");
let fs = require("fs");

mongoose.connection.on("connected", function () {
  console.log("dailys");
});
// 添加数据接口
router.post("/add", async (req, res) => {
  let data = req.body;
  let img = req.body.img;
  delete data.img;
  let newImg = [];
  date = new Date();
  await img.map(async (item, index) => {
    // let base64Data = item.url.replace(/^data:image\/png;base64,/, "");
    let type = item.url.substring(11, 15);
    type = type.split(";")[0];
    console.log(type);
    let base64Data = item.url.replace(/^data:image\/\w+;base64,/, "");
    let dataBuffer = new Buffer(base64Data, "base64");
    // console.log(base64Data);
    let filePath =
      "../save/img/" + data.user.name + Number(date) + index + "." + type;
    newImg.push(
      "./save/img/" + data.user.name + Number(date) + index + "." + type
    );
    await fs.writeFile(filePath, dataBuffer, function (err) {
      if (err) {
        console.log(err);
        // reject({success:false})
      } else {
        // resolve({success:true,path:filePath})
        console.log(newImg);
      }
    });
  });
  console.log(newImg);
  data.img = newImg;
  console.log(data.img);
  dailys.create(data, function (err, doc) {
    if (err) {
      res.json({
        success: 0,
        data: null,
      });
    } else {
      res.json({
        success: 1,
        data: data,
      });
    }
  });
});
//获取内容总数

// 分页查询内容
router.post("/getContent",async function (req, res) {
  let contentTotal;
 await dailys
    .find({}, function (err, count) {
      if (!err) {
        contentTotal = count;
        console.log(count);
      }
    })
    .count();
  dailys
    .find({}, function (err, doc) {
      if (err) {
        res.json({
          success: 0,
          data: null,
        });
      } else {
        res.json({
          success: 1,
          data: doc,
          total: contentTotal,
        });
      }
    })
    .skip(req.body.current ? (req.body.current - 1) * req.body.pageSize : 0)
    .limit(req.body.pageSize ? req.body.pageSize : 10)
    .sort({ _id: -1 });
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
