const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5a46747a074c071ad3d46c59';

// if(!ObjectID.isValid(id)){
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id // avec mongoose pas beosin de new ObjectId
// }).then((todos) => {
//     console.log('Todos',todos);

// });

// Todo.findOne({
//     _id: id // avec mongoose pas beosin de new ObjectId
// }).then((todo) => {
//     console.log('Todo',todo);

// });

// Todo.findById(id).then((todo) => {
//     if(!todo)
//         return console.log('id not found'); // id valide mais pas dans la BDD

//     console.log('Todo by id : ',todo);

// }).catch((err) => console.log(err)); // id non valide

User.findById('5a478d7e10fa823fb86687ff').then((user) => { // id valide mais pas dans la BDD
    if(!user)
        return console.log('user id not found'); 
    
    console.log('User by id : ', user);

}).catch((err) => console.log(err)) // id non valide