var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json()); // convert JSON to object, NE PAS OUBLIER SINON RETOURNERA UNDEFINED

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(200).send(err);

    });

});

// app.get((req,res) => {

// });

app.listen(3000, () => {

    console.log('Started on port 3000');

});