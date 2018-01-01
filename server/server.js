require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');


var app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json()); // convert JSON to object, NE PAS OUBLIER SINON RETOURNERA UNDEFINED

//POST /todos
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);

    });

});

//GET /todos
app.get('/todos',(req,res) => {
    Todo.find().then((todos) => { 
        // res.send(todos);
        res.send({
            todos
        });
    }, (err) => {
        res.status(400).send(err);

    })

});

//GET /todos/1234
app.get('/todos/:id', (req,res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id))
        return res.status(404).send();

    Todo.findById(id).then((todo) => {
        if(!todo)
            return res.status(404).send();

        res.send({todo});
    }).catch((err) => {
        res.status(400).send();

    } );


});

//DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id))
        return res.status(404).send();

    Todo.findByIdAndRemove(id).then((todo) => {

        if (!todo)
            res.status(404).send();

        res.send({todo});

    }).catch((err) => {
        res.status(400).send();
    });

});


//PATCH /todos/:id
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;

    var body = _.pick(req.body,['text','completed']); // prendre uniquement les champs nécesasire

    if (!ObjectID.isValid(id))
        return res.status(404).send();

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();

    } else {

        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body},{new: true}).then((todo)  => { // new renvoie l'objet updaté
        if(!todo)
            return res.status(404).send();
        
        res.send({todo});

    }).catch((err) => {
        res.status(400).send();
    })

})

/*****************************************************USERS******************************************************************************** */
//POST /users

app.post('/users', (req, res) => {

    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

   

    //Avant de faire un save, il va faire un hash du mot de passe (voir user.js)

    user.save().then(() => { // pas nécessaire de mettre l'argument "user" car on fait une copie inutile
        return user.generateAuthToken();
        // res.send(user);
    }).then((token) => {
        res.header('x-auth',token).send(user);

    }).catch((err) => {
        res.status(400).send(err);
    });

});


// EXPRESS Middleware, voir authenticate.js

app.get('/users/me', authenticate, (req,res) => {
    res.send(req.user);
});


// POST /users/login {email, password}

app.post('/users/login',(req,res) => {

    var body = _.pick(req.body,['email','password']);

    User.findByCredentials(body.email,body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth',token).send(user);
        })
        // res.send(user);

    })
    .catch((err) => {
        res.status(400).send();

    });

})


app.listen(port, () => {

    console.log(`Started on port ${port}`);

});

module.exports = {
    app
}