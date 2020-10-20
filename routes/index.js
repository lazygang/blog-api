var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var aa = require('../model/test');
var news = require('../model/new');

// mongoose.connect('mongodb://lazygang:lzg2752309@106.55.12.105:31212/test?authSource=admin', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', function () {
	// console.log('connected');
});
// mongoose.connection.on('open',function(){

// });

/* GET home page. */
router.get('/top', function (req, res, next) {
	aa.find({}, function (err, doc) {
		//   console.log(doc+'');
		if (err) {
			res.json({
				success: 'fail',
				data: null
			})
		} else {
			res.json({
				success: 'true',
				data: doc,
				// aaa:'dadasdsa'
			})
			// res._write(doc)
		}
	})
})

module.exports = router;
