// NEW SYNTAX FOR 3.0, not up to date on udemy

// OBJECT DESTRUCTURING
// const MongoClient = require('mongodb').MongoClient; // ES5
const {
    MongoClient,
    ObjectId
} = require('mongodb'); // ES6


MongoClient.connect('mongodb://localhost:27017', (err, client) => { // Adresse server mongoDB
    if (err)
        return console.log('Unable to connect to MongoDB server', err);

    console.log('Connected to MongoDB server');

    // client.db('TodoApp').collection('Todos').find({
    //     // _id : "5a4627fee890d80599adda2c", // WILL NOT WORK
    //     // _id: new ObjectId("5a4627fee890d80599adda2c"), // WILL WORK
    //     completed: false
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));

    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });
    

    // client.db('TodoApp').collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count : ${count}`);

    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });



    client.db('TodoApp').collection('Users').find({
        name: 'GuimGuim'
    }).toArray().then((docs) => {
        console.log('Users : ');
        console.log(JSON.stringify(docs, undefined, 2));

    }, (err) => {
        console.log('Unable to fetch todos', err);
    });

    // client.close();
});