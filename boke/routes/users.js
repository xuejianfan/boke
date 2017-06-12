var express = require('express');
var mongodb=require('mongodb');
var db_str='mongodb://localhost:27017/users';
var router = express.Router();

/* GET users listing. */
router.post('/form', function(req, res, next) {
	
  var user=req.body['user'];
   var pass=req.body['password'];
 var insertdata=function(db,callback){
   	    var conn=db.collection('register');
   	    var data=[{user:user,pass:pass}];
   	    conn.insert(data,function(err,result){
   	    	if(err){
   	    		console.log(err);
   	    	}else{
   	    		callback(result);
   	    	}
   	    })
   };
   if(user!=""&&pass!=""){
 mongodb.connect(db_str,function(err,db){
   	if(err){
   		console.log(err);
   	}else{
   		console.log('success');
   		insertdata(db,function(result){
   			console.log(result);
   		})
 	 			db.close();
 	 			res.redirect('/');
 	 		
   	}
   }) 
   }
   	
});
router.post('/liuyan', function(req, res, next) {
	if(req.session.user){
				function  time1(){
	var odate=new Date();
	var nian=odate.getFullYear();
	var yue=odate.getMonth()+1;
	var day=odate.getDate();
	var shi=odate.getHours();
	var fen=odate.getSeconds();
	var miao=odate.getMinutes();
	yue = yue<10 ? "0"+yue :yue;
	day = day<10 ? "0"+day : day;
	miao = miao<10 ? "0"+miao : miao;
	fen = fen<10 ? "0"+fen : fen;
	
	return nian+"-"+yue+"-"+day+" "+shi+":"+fen+":"+miao;
}
		var bt=req.body['bt'];
   var txt=req.body['txt'];
   var  persen=req.session.user
 var insertdata=function(db,callback){
   	    var conn=db.collection('liuyan');
   	    var data=[{title:bt,con:txt,who:persen,time:time1()}];
   	    conn.insert(data,function(err,result){
   	    	if(err){
   	    		console.log(err);
   	    	}else{
   	    		callback(result);
   	    	}
   	    })
   };  
 mongodb.connect(db_str,function(err,db){
   	if(err){
   		console.log(err);
   	}else{
   		console.log('success');
   		insertdata(db,function(result){
   			console.log(result);
 	 			res.redirect('/liuyan');
 	 			db.close();
   		})
   	}
   }) 
	}else{
		res.send('您的账号已经过期')
	}
  
   
   	
});
router.post('/content', function(req, res, next) {
	if(req.session.user){
		function  time(){
	var odate=new Date();
	var nian=odate.getFullYear();
	var yue=odate.getMonth()+1;
	var day=odate.getDate();
	yue = yue<10 ? "0"+yue :yue;
	day = day<10 ? "0"+day : day ;
	return nian+"-"+yue+"-"+day;
}
		var bt=req.body['title'];
   var txt=req.body['zhaiyao'];
 var insertdata=function(db,callback){
   	    var conn=db.collection('content');
   	    var data=[{title:bt,time:time(),zhaiyao:txt}];
   	    conn.insert(data,function(err,result){
   	    	if(err){
   	    		console.log(err);
   	    	}else{
   	    		callback(result);
   	    	}
   	    })
   };
   
 mongodb.connect(db_str,function(err,db){
   	if(err){
   		console.log(err);
   	}else{
   		console.log('success');
   		insertdata(db,function(result){
   			console.log(result);
 	 			res.redirect('/article');
 	 			db.close();
   		})
   	}
   }) 
	}else{
		res.send('您的账号已经过期')
	}
  
   
   	
});

router.post('/login', function(req, res, next) {
  var user=req.body['user'];
   var pass=req.body['password'];
 var finddata=function(db,callback){
   	    var conn=db.collection('register');
   	    var data={user:user,pass:pass};
   	    conn.find(data).toArray((err,result)=>{
   	    		if(!err){
   	    			if(result.length>0){
   	    				req.session.user=result[0].user;
   	    				res.redirect('/');
   	    			}else{
   	    				res.redirect('/login');
   	    			}
   	    		
   	    	}
   	    })
   };
   
 mongodb.connect(db_str,function(err,db){
   	if(err){
   		console.log(err);
   	}else{
   		console.log('success');
   		finddata(db,function(result){
   			console.log(result);
   			db.close();
   		})
 	 			
 	 		
 	 		
   	}
   }) 
   
   	
});
module.exports = router;

