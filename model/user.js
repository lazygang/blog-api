var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var api=new Schema({
// 添加数据需验证
    name:String,
    passWord:String,
    nickName:String,
    level:String,
    createTime:String,
    head:String,
});
module.exports=mongoose.model('users',api);