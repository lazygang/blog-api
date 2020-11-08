var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var api=new Schema({
// 添加数据需验证
    user:Object,
    html:String,
    raw:String,
    date:String,
    img:Array
});
module.exports=mongoose.model('dailys',api);