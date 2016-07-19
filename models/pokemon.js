var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var bcrypt = require('bcrypt-nodejs');

//Pokemon Schema

var pokemonSchema = new Schema({

    name: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    type: String

});

module.exports = mongoose.model('Pokemon', pokemonSchema);
