//Call all packages
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('./models/user');
var Pokemon = require('./models/pokemon');

var port = process.env.PORT || 5000;

//APP CONFIGURATION
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//CORS

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-Width, content-type,Authorization');
    next();
});

app.use(morgan('dev'));

//DB conection
mongoose.connect('mongodb://localhost/pokemon');
//mongoose.connect('mongodb://admin:henry_09@ds015750.mlab.com:15750/pokemon_hgfv');

//API ROUTERS
app.get('/', function(req, res) {
    res.send('Welcome to the rela world');
});

//Express router instance
var apiRouter = express.Router();

apiRouter.get('/', function(req, res) {

    res.json({
        message: 'Welcome to Zion!(Our mother API)'
    });
});

apiRouter.route('/users')

//Create a user through POST
//URL: http://localhost:5000/api/users
    .post(function(req, res) {

        var user = new User();

        user.name = req.body.name;
        user.username = req.body.username;
        user.password = req.body.password;

        console.log(req.body.name);

        user.save(function(err) {
            // verify duplicate entry on username
            if (err) {
                if (err.code == 11000) {
                    console.log(err);
                    return res.json({
                        success: false,
                        message: 'El usuario ya existe'
                    });
                }
            }
            res.json({
                success: true,
                message: 'usuario creado exitosamente'
            });
        });
    })
    .get(function(req, res) {

        User.find(function(err, users) {
            if (err) return res.send(err);

            res.json(users);
        });
    });

apiRouter.route('/users/:user_id')
    .get(function(req, res) {

        User.findById(req.params.user_id, function(err, user) {
            if (err) return res.send(err);
            res.json(user);
        })
    })
    .put(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err) return res.send(err);

            if (req.body.name) user.name = req.body.name;
            if (req.body.username) user.username = req.body.username;
            if (req.body.password) user.password = req.body.password;

            user.save(function(err) {
                if (err) return res.send(err);
                res.json({
                    success: true,
                    message: 'usuario actualizado exitosamente'
                });
            });
        });
    })
    .delete(function(req, res) {

        User.remove({
                _id: req.params.user_id
            },
            function(err, user) {
                if (err) return res.send(err);
                res.json({
                    success: true,
                    message: 'usuario eliminado exitosamente'
                });
            }
        );
    });

    apiRouter.route('/pokemons')

    //Create a user through POST
    //URL: http://localhost:5000/api/pokemons
        .post(function(req, res) {

            var pokemon = new Pokemon();

            pokemon.name = req.body.name;
            pokemon.type = req.body.type;

            console.log(req.body.name);

            pokemon.save(function(err) {
                // verify duplicate entry on name
                if (err) {
                    if (err.code == 11000) {
                        console.log(err);
                        return res.json({
                            success: false,
                            message: 'El pokemon ya existe'
                        });
                    }
                }
                res.json({
                    success: true,
                    message: 'pokemon creado exitosamente'
                });
            });
        })
        .get(function(req, res) {

            Pokemon.find(function(err, pokemons) {
                if (err) return res.send(err);

                res.json(pokemons);
            });
        });

    apiRouter.route('/pokemons/:pokemon_id')
        .get(function(req, res) {

            Pokemon.findById(req.params.pokemon_id, function(err, pokemon) {
                if (err) return res.send(err);
                res.json(pokemon);
            })
        })
        .put(function(req, res) {
            Pokemon.findById(req.params.pokemon_id, function(err, pokemon) {
                if (err) return res.send(err);

                if (req.body.name) pokemon.name = req.body.name;
                if (req.body.type) pokemon.type = req.body.type;

                pokemon.save(function(err) {
                    if (err) return res.send(err);
                    res.json({
                        success: true,
                        message: 'pokemon actualizado exitosamente'
                    });
                });
            });
        })
        .delete(function(req, res) {

            Pokemon.remove({
                    _id: req.params.pokemon_id
                },
                function(err, pokemon) {
                    if (err) return res.send(err);
                    res.json({
                        success: true,
                        message: 'pokemon eliminado exitosamente'
                    });
                }
            );
        });
//Register our ROUTERS

app.use('/api', apiRouter);

app.set('port', (port));

app.listen(app.get('port'));

console.log("here we go");
