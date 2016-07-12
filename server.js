var express = require('express');
var app = express();
var path = require('path');

var adminRouter = express.Router();

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname)+ '/index.html');
});

//Middleware
adminRouter.use(function (req,res,next){

  console.log('--->',req.method,req.url);

  next();
});

adminRouter.param('name',function(req,resp,next,name){
console.log("req.name",req.name);
console.log("name",name);

req.name = "Mr robot was here";

next();
});

//Rutas
adminRouter.get('/',function(req,res){
res.send("I am in the first page");

});

adminRouter.get('/users',function(req,res){
  console.log('llegue a la vista usuarios');
res.send("users");

});

adminRouter.get('/users/:name',function(req,res){

res.send("hola "+req.name);

});

adminRouter.get('/posts',function(req,res){
res.send("posts");

});

app.use('/admin', adminRouter);

app.set('port',(process.env.PORT || 5000));

app.listen(app.get('port'));

console.log("here we go");
