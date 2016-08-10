
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

var User = require('../models/user');
var Pokemon = require('../models/pokemon');

var config = require('../../config');

var supersecret = config.supersecret;

module.exports = function(app, express) {
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

    apiRouter.post("/Password", function(req, res) {

        User.findOne({
                email: req.body.email
            }).select('email')
            .exec(function(err, user) {
                if (err) throw err;
                if (!user) {
                    res.json({
                        success: false,
                        message: "El Email no existe"
                    });
                } else if (user) {
                    //if  email proccess is OK then
                    // generate a token
                    var token = jwt.sign({
                        email: user.email
                    }, superSecret, {
                        expiresIn: '24h'
                    });

                    var nodemailer = require('nodemailer');

                    // create reusable transporter object using the default SMTP transport
                    var transporter = nodemailer.createTransport({
                        service: 'Gmail',
                        auth: {
                            user: 'XXX@gmail.com', // Your email id
                            pass: 'XXX' // Your password
                        }
                    });

                    var htmlEmail = '<a href="http://localhost:5000/api/Password?token=' + token + '">Click Reset</b>'
                        // setup e-mail data with unicode symbols
                    var mailOptions = {
                        from: 'henrygustavof@gmail.com', // sender address
                        to: user.email, // list of receivers
                        subject: 'Password Reset', // Subject line
                        //text: 'Password Reset Text', // plaintext body
                        html: htmlEmail // html body
                    };

                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, function(error, info) {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message sent: ' + info.response);
                    });
                    res.json({
                        success: true,
                        message: "Enviar email",
                        token: token
                    })
                }

            });
    });

    //Middleware to verify a token

    // apiRouter.use(function(req, res, next) {
    //     console.log('alguien entrando a la matrix');
    //     var token = req.body.token || req.query.token || req.headers['x-access-token'];
    //
    //     if (token) {
    //         //verify token
    //         jwt.verify(token, superSecret, function(err, decoded) {
    //
    //             if (err) {
    //                 return res.json({
    //                     success: false,
    //                     message: "Fallo autenticacion del token"
    //                 })
    //             } else {
    //                 console.log(decoded);
    //                 req.decoded = decoded;
    //                 next();
    //             }
    //
    //         });
    //
    //     } else {
    //         return res.status(403).send({
    //             success: false,
    //             message: 'No se envio el token'
    //         });
    //     }
    // });

    //Accesed at get
    apiRouter.get('/', function(req, res) {
        res.json({
            message: 'Welcome to the matrix'
        });
    });

    apiRouter.get('/me', function(req, res) {

        var decoded = req.decoded;
        res.json({
            message: 'Welcome ' + decoded.username + ' to the matrix'
        });
    });

    //RestPassowrd
    apiRouter.get("/Password", function(req, res) {

        var decoded = req.decoded;

        User.findOne({
                email: decoded.email
            }).select('name username email')
            .exec(function(err, user) {
                if (err) throw err;
                if (!user) {
                    res.json({
                        success: false,
                        message: "El Email no existe"
                    });
                } else if (user) {

                    res.json({
                        success: true,
                        message: "Welcome  rest password",
                        name: user.name,
                        username: user.username,
                        email: user.email
                    })
                }

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
            user.email = req.body.email;

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
                if (req.body.email) user.email = req.body.email;

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

            Pokemon.find({}, function(err, pokemons) {
                    User.populate(pokemons, {
                            path: 'owner',
                            select: {
                                name: 1,
                                username: 1
                            }
                        },
                        function(err, pokemons) {

                            res.status(200).send(pokemons);
                        })
                })
                .sort({name: 1 })
                .select({name: 1,type: 1,owner: 1});
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
                }]
            }, function(err, pokemons) {
                if (err) return res.send(err);
                res.json(pokemons);
            });
        });

    return apiRouter;

}
