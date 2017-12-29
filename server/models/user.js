var mongoose = require('mongoose');

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minLength: 1

    }
});

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