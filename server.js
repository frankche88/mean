//Call all packages
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var User = require('./models/user');
var Pokemon = require('./models/pokemon');

var superSecret = "123";

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
//mongoose.connect('mongodb://localhost/pokemon');
mongoose.connect('mongodb://admin:henry_09@ds015750.mlab.com:15750/pokemon_hgfv');

//API ROUTERS
// app.get('/', function(req, res) {
//     res.send('Welcome to the rela world');
// });

//Express router instance
var apiRouter = express.Router();

apiRouter.post("/authenticate", function(req, res) {

    User.findOne({
            username: req.body.username
        }).select('name username password')
        .exec(function(err, user) {
            if (err) throw err;
            if (!user) {
                res.json({
                    success: false,
                    message: "la autenticacion ha fallado.El usuario no existe"
                });
            } else if (user) {
                // Validate if passwords matches
                var validaPassword = user.comparePassword(req.body.password);

                if (!validaPassword) {
                    res.json({
                        success: false,
                        message: 'la autenticacion ha fallado.Contrasena no existe'
                    });
                } else {
                    //if  authenticate proccess is OK then
                    // generate a token
                    var token = jwt.sign({
                        name: user.name,
                        username: user.username
                    }, superSecret, {
                        expiresIn: '24h'
                    });

                    res.json({
                        success: true,
                        message: "Accesso autorizado",
                        token: token
                    })
                }

            }

        });
});

//Middleware to verify a token

apiRouter.use(function(req, res, next) {
    console.log('alguien entrando a la matrix');
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        //verify token
        jwt.verify(token, superSecret, function(err, decoded) {

            if (err) {
                return res.json({
                    success: false,
                    message: "Fallo autenticacion del token"
                })
            } else {
                console.log(decoded);
                req.decoded = decoded;
                next();
            }

        });

    } else {
        return res.status(403).send({
            success: false,
            message: 'No se envio el token'
        });
    }
});

//Accesed at get
apiRouter.get('/', function(req, res) {
    res.json({
        message: 'Welcome to the matrix'
    });
});

apiRouter.get('/me', function(req, res) {

  var decoded = req.decoded;
    res.json({
        message: 'Welcome '+decoded.username+' to the matrix'
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
        pokemon.owner = req.body.owner;

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

        // Pokemon.find(function(err, pokemons) {
        //     if (err) return res.send(err);
        //
        //     res.json(pokemons);
        // });
        Pokemon.find({}, function(err, pokemons) {
                User.populate(pokemons, {
                        path: 'owner',
                        select: {
                            name: 1,
                            username: 1
                        }
                        //,match:{name:'henry'}
                    },
                    function(err, pokemons) {

                        res.status(200).send(pokemons);
                    })
            })
            //.skip(1).limit(3)
            .sort({
                name: 1
            })
            .select({
                name: 1,
                type: 1,
                owner: 1
            })

        ;
    });

apiRouter.route('/pokemons/:pokemon_id')
    .get(function(req, res) {

        Pokemon.findOne({
            _id: req.params.pokemon_id
        }, function(err, pokemon) {
            if (err) return res.send(err);
            res.json({
                message: pokemon.sayHi(),
                count: "ha sido consultado " + pokemon.count
            });
        });
    })
    .put(function(req, res) {
        Pokemon.findById(req.params.pokemon_id, function(err, pokemon) {
            if (err) return res.send(err);

            if (req.body.name) pokemon.name = req.body.name;
            if (req.body.type) pokemon.type = req.body.type;
            if (req.body.owner) pokemon.owner = req.body.owner;

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

apiRouter.route('/pokemons/type/:type')
    .get(function(req, res) {
        Pokemon.find({
            $or: [{
                'type': new RegExp(req.params.type, 'i')
            }, {
                'type': /fire/i
            }],
            // count:{
            //   $gt:0,
            //   $lt:8
            // }
        }, function(err, pokemons) {
            if (err) return res.send(err);
            res.json(pokemons);
        });
    })
    //Register our ROUTERS

app.use('/api', apiRouter);

app.use(express.static(__dirname+'/public'));
app.get('*',function(req,res){
  res.sendFile(path.join(__dirname+'/public/views/index.html'));
});

app.set('port', (port));

app.listen(app.get('port'));

console.log("here we go");
