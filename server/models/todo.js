var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = {
    Todo
};

// var newTodo = new Todo({
//     text: 'Add water to plants',
// });

// newTodo.save().then((doc) => {
//     console.log('Saved todo :', doc);
// }, (err) => {
//     console.log('Unable to save Todo : ', err);
// });

// var otherTodo = new Todo({
//     // text: 123 // WILL WORK AND CONVERT TO STRING
//     // text: true // WILL WORK AND CONVERT TO STRING
//     text: "Feed the cat",
//     completed: true,
//     completedAt: 123
// });

// otherTodo.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 2));

// }, (err) => {
//     console.log('Unable to save Todo : ', err);
// });