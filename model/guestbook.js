var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var aa=new Schema({
	// //这里根据你的数据库的内容来更改
	// "goodId" : Number, 
    // "goodName" : Number, 
    // "goodPrice":Number,
    // name : String, 
    // age : String,
    title:String,
    content:String,
    date:String
});
module.exports=mongoose.model('guests',aa);