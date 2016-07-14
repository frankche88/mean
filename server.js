var mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/pokemon');
mongoose.connect('mongodb://admin:henry_09@ds015750.mlab.com:15750/pokemon_hgfv');


console.log(mongoose);

var express = require('express');
var app = express();
var path = require('path');

var adminRouter = express.Router();
var loginRouter = express.Router();

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname)+ '/index.html');
});
app.get('/error',function(req,res){
  res.sendFile(path.join(__dirname)+ '/error.html');
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

loginRouter.param('password',function(req,resp,next,password){

req.isvalidPassword = password == "123";

console.log("password",password);

if(!req.isvalidPassword){
  resp.redirect('/error');
}else{
  next();
}
});

loginRouter.param('name',function(req,resp,next,name){

req.name = name;

req.isvalidName = name == "henry";

if(!req.isvalidName){
  resp.redirect('/error');
}
else {
  next();
}

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

loginRouter.get('/',function(req,res){
res.send("I am in login");
});

loginRouter.get('/users/:name',function(req,res){
var mensaje = req.isvalid ? "welcome " + req.name: "usuario invalido";
res.send(mensaje);
});

loginRouter.get('/authenticate/:name/:password',function(req,res){

    res.send("auth welcome " + req.name);
});

app.use('/admin', adminRouter);

app.use('/login', loginRouter);

app.route('/account')
.get(function(req,res){
  console.log('method GET');
  res.send("method GET");
})
.post(function(req,res){
  console.log('method POST');
  res.send("method POST");
})
.put(function(req,res){
  console.log('method PUT');
  res.send("method PUT");
})
.delete(function(req,res){
  console.log('method DELETE');
  res.send("method DELETE");
})
;

app.set('port',(process.env.PORT || 5000));

app.listen(app.get('port'));

console.log("here we go");
