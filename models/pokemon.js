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
    type: String,
    count: {
        type: Number,
        default: 0
    },
    owner:{
      type:Schema.ObjectId,
      ref:"User"
    }

});

pokemonSchema.methods.sayHi = function() {

    var pokemon = this;

    return 'hola!, soy ' + pokemon.name + ' de tipo ' + pokemon.type;

};

pokemonSchema.post('findOne', function(pokemon) {

    pokemon.count++;
    pokemon.save();

});

module.exports = mongoose.model('Pokemon', pokemonSchema);
