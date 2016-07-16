
//Call all packages
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('./models/user');

var port = process.env.PORT || 5000;

//APP CONFIGURATION
app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

//CORS

app.use(function(req,res,next){
res.setHeader('Access-Control-Allow-Origin','*');
res.setHeader('Access-Control-Allow-Methods','GET, POST');
res.setHeader('Access-Control-Allow-Headers','X-Requested-Width, content-type,Authorization');
next();
});

app.use(morgan('dev'));

//DB conection
mongoose.connect('mongodb://localhost/pokemon');
//mongoose.connect('mongodb://admin:henry_09@ds015750.mlab.com:15750/pokemon_hgfv');

//API ROUTERS

app.get('/',function(req,res){

  res.send('Welcome to the rela world');
});


//Express router instance
var apiRouter = express.Router();

apiRouter.get('/',function(req,res){

  res.json({message:'Welcome to Zion!(Our mother API)'});
});

apiRouter.route('/users')

//Create a user through POST
//URL: http://localhost:5000/api/users
.post(function(req,res){

var user = new User();

user.name = req.body.name;
user.username = req.body.username;
user.password = req.body.password;

console.log(req.body.name);

user.save(function(err){
  // verify duplicate entry on username
  if (err){
  if(err.code == 11000){
    console.log(err);
    return res.json({success:false,message:'El usuario ya existe'});
  }}
  res.json({success:true,message:'usuario creado exitosamente'});
});

})
.get(function(req,res){

    User.find(function(err,users){
      if(err) return res.send(err);

      res.json(users);

    });
})


//Register our ROUTERS

app.use('/api',apiRouter);

app.set('port',(port));

app.listen(app.get('port'));

console.log("here we go");
