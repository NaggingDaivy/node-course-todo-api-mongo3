const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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

    var user = this; // instance method
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

UserSchema.methods.removeToken = function(token) {
    var user = this;

    return user.update({ //pull permet de retirer des élements avec certains critères
        $pull : {
            tokens : {token}
        }
    });

}

UserSchema.statics.findByToken = function(token) {

    var User = this; // model method
    var decoded;
    try {
        decoded = jwt.verify(token, 'abc123');

    } catch (err) {
        // return new Promsise((resolve, reject) => {
        //     reject();

        // });

        return Promise.reject(err);
    }

    return User.findOne({
        _id: decoded._id, // id de l'user, pas du token
        'tokens.token': token,
        'tokens.access': 'auth'
    });


};

UserSchema.statics.findByCredentials = function (email, password) {

    var User = this;

    return User.findOne({ email }).then((user) => {
        if (!user)
            return Promise.reject();


        return bcrypt.compare(password, user.password).then((res) => {
            if(res)
                return user;
            else 
                return Promise.reject();
        });
    });
};

UserSchema.pre('save',function(next){
    var user = this;
    if (user.isModified('password')) { // we only want to encrypt the password if it has been modified
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    }
    else
        next();
});

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