// set up ========================
var express  = require('express');
var app      = express();
var mysql      = require('mysql');                           // create our app w/ express
//var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
//var router = express.Router();
var path = __dirname + '/views/';

var pool = mysql.createPool({
    connectionLimit : 100, //important
      host     : 'localhost',
      user     : 'root',
      password : 'vasquez',
      database : 'FINDFUN',
      debug    :  false

});

// configuration =================

//mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.set('view engine', 'express')
//app.use(router);

/*router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});*/

/*router.get('/', function(req, res){
  res.render('/index', {
    title: 'Home'
  });
});*/

/*router.get("/",function(req,res){
  res.sendFile(path + "index.html");

   //res.write("hola mundo!");
   console.log(path + "hola lol");
});*?

/*router.get("/estemomento",function(req,res){

  res.sendFile(path + "estemomento.html")
});*/
app.get("/",function(req,res){
  res.sendFile(__dirname+"/views/index.html");
});

app.post('/getestemomento', function(req, res) {
  console.log("posteando estemomento");
  pool.getConnection(function(err, connection){
    if(err) {
      connection.release();
    }else{
      var query ="call sp_consultar_banner_actual();";
      pool.query(String(query),function(err,rows){
          connection.release();
          if(!err) {
            if(rows.length >0) {
              res.write(JSON.stringify(rows[0]));
              //res.write(rows);
              console.log(rows[0]);
              res.send();
            }else {
              rows=[];
              res.write(JSON.stringify(rows));
              res.send();
            }
          }else {
            console.log("Query failed");
          }
      });
    }
  });

});

app.post('/getlistadia', function(req, res) {
  console.log("posteando estemomento");
  pool.getConnection(function(err, connection){
    if(err) {
      connection.release();
    }else{
      var query ="call sp_consultar_banner_dia();";
      pool.query(String(query),function(err,rows){
          connection.release();
          if(!err) {
            if(rows.length >0) {
              res.write(JSON.stringify(rows[0]));
              //res.write(rows);
              console.log(rows[0]);
              res.send();
            }else {
              rows=[];
              res.write(JSON.stringify(rows));
              res.send();
            }
          }else {
            console.log("Query failed");
          }
      });
    }
  });

});



// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
