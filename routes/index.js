var express = require('express');
var router = express.Router();

//DB Import:
var { Pool, Client } = require('pg')


//DB Global variables:
//this variables are known only in this module. (index.js)
//var constring = 'postgresql://postgres:123@localhost:5432/postgres'
var constring = 'postgresql://postgres:123@localhost:5432/postgres'
var constring = 'postgres://xvsxbzdclqjwhk:5c4dcbdf1ff74529999cd901fe97c33e7f6a2d86f50308100b610deeaacbe66e@ec2-54-227-252-202.compute-1.amazonaws.com:5432/d9sdo0h3t1gemu'
var pool = new Pool({connectionString : constring});

/* GET form page. */
router.get('/', function(req, res) {
  res.render('index', {title: 'Welcome home!'});
});

router.post("/", function(req, res){
  var bodyParams = req.body;

  res.json(bodyParams);
})

router.get('/api/students', function(req, res){
  pool.query("SELECT * FROM Students", [], function(err, dbResult){
    if(err){
      return res.render('error', {message:err.message, error:err})
    }
    else{
      var rows = dbResult.rows;
      return res.json(rows)
    }
  })
})

router.get('/api/addStudent', function(req, res){
  var name = req.query.name;
  var lastname = req.query.lastname;

  if(name && lastname){

    var SQL = "INSERT INTO Students(name, lastname) VALUES($1, $2)";
     pool.query(SQL,[name, lastname], function(err, result){
       if(err){
         return res.json(err);
       }else{
         return res.json({message:"success"});
       }
     })
  }else{
    return res.json({err:'bad request'});
  }

 
});

router.get('/hodor', function(req, res) {
  var q = req.query;
  print(q);
  res.render('hodor', {name:'hodor', friend:'aria', title:'hodor'});
});

module.exports = router;
