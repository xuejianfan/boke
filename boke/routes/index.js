var express = require('express');
var router = express.Router();
var mongodb=require('mongodb').MongoClient;
var db_str="mongodb://localhost:27017/users"
var querystring=require('querystring');
/* GET home page. */

router.get('/register', function(req, res, next) {
	var user=req.session.user
  res.render('register',{user:user});
});
router.get('/article', function(req, res, next) {
	var user=req.session.user
		var findData=function(db,callback){
			var conn=db.collection('content');
			conn.find({}).toArray(function(err,result){
				callback(result)
			})
		}	
		mongodb.connect(db_str,function(err,db){
			if(err){
				console.log('链接失败')
			}else{
				console.log('链接成功')
				findData(db,function(result){
					console.log(result);
					res.render('article',{result:result,title: '文档', user:user})
				})	
			}
		})	
});
router.get('/content', function(req, res, next) {
	var user=req.session.user
  res.render('content',{title:'文档',user:user});
});

router.get('/', function(req, res, next) {
	var user=req.session.user
	var findData=function(db,callback){
			var conn=db.collection('content');
			conn.find({}).toArray(function(err,result){
				callback(result)
			})
		}	
		mongodb.connect(db_str,function(err,db){
			if(err){
				console.log('链接失败')
			}else{
				console.log('链接成功')
				findData(db,function(result){
					console.log(result);
					res.render('index',{result:result,title: '博客', user:user});
				})	
			}
		})	

  	
});
router.get('/relogin', function(req, res, next) {
   req.session.destroy(function(err){
  	if(!err){
  		res.redirect('/');
  	}
  })
});
router.get('/login', function(req, res, next) {
	var user=req.session.user
  res.render('login',{user:user});
});
/*router.get('/liuyan', function(req, res, next) {
  res.render('liuyan',{user:req.session.user});
});*/
router.get('/liuyan',function(req,res,next){
	var user=req.session.user
		var findData=function(db,callback){
			var conn=db.collection('liuyan')
			conn.find({}).toArray(function(err,result){
				callback(result)
			})
		}	
		mongodb.connect(db_str,function(err,db){
			if(err){
				console.log('链接失败')
			}else{
				console.log(' success')
				findData(db,function(result){
					res.render('liuyan',{result:result,user:user})
				})	
			}
		})		
})

module.exports = router;
