const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => { // retirer TOUT
//     console.log(result);

// }); 

// Todo.findOneAndRemove({_id: '5a47acd910fa823fb866949b'}).then((result) => {

// });

Todo.findByIdAndRemove('5a47acd910fa823fb866949b').then((todo) => {
    console.log(todo);

});