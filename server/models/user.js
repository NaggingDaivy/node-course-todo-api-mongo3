const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: '{VALUE} is not a valid email.'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true

        },
        token: {
            type: String,
            required: true

        }
    }]
});

UserSchema.methods.toJSON = function () { // ce que renvoie mongoose quand on convertit en JSON, on override pour ne pas afficher les tokens et le PWD
    var user = this;
    var userObject = user.toObject(); // convertit un objet mongoose en objet

    return _.pick(userObject,['_id','email']); // ne renverra que l'id et l'email au lieu de l'objet entier

};

UserSchema.methods.generateAuthToken = function() {

    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access},'abc123').toString();

    user.tokens.push({access, token});

    return user.save().then(() => { // return a promise
        return token;

    }); 

    // user.save().then(() => {
    //     return token;

    // }).then((token) => {

    // })

};

var User = mongoose.model('Users', UserSchema);

module.exports = {
    User
};

// var newUser = new User({
//     // email: 'daivy.merlijs@vivaldi.net'
// });

// newUser.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 2));

// }, (err) => {
//     console.log('Unable to save User : ', err);

// });