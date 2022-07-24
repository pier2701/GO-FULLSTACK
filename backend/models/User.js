// on importe mongoose
const mongoose = require('mongoose');

// on rajoute un "plug-in" qui est "unique-validator"
const uniqueValidator = require('mongoose-unique-validator');

// on créé le "Schema" depuis mongoose
const userSchema = mongoose.Schema({
    email: {type: 'string',required: true, unique: true},
    password: {type: 'string',required: true},
})

// on applique le plug-in au "schema"
userSchema.plugin(uniqueValidator);

// on est prêt à exporter le model "User" sous forme de schéma
module.exports = mongoose.model('User', userSchema);
