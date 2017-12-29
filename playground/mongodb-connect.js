// NEW SYNTAX FOR 3.0, not up to date on udemy

// OBJECT DESTRUCTURING
// const MongoClient = require('mongodb').MongoClient; // ES5
const {MongoClient,ObjectId} = require('mongodb'); // ES6

// var obj = new ObjectID();
// console.log(obj);



MongoClient.connect('mongodb://localhost:27017', (err, client) => { // ADresse server mongoDB
    if (err)
        return console.log('Unable to connect to MongoDB server', err);

    console.log('Connected to MongoDB server');

    // client.db('TodoApp') // Database, si elle n'existe pas, elle sera cree SI on INSERE AU MOINS un element dedans
    //     .collection('Todos') // Collection
    //     .insertOne({ // Document
    //         text: 'Something to do',
    //         completed: false

    //     }, (err, result) => {
    //         if (err)
    //             return console.log('Unable to insert todo', err);

    //         console.log(JSON.stringify(result.ops, undefined, 2));
    //     });

    /*--------------------------------------------------------------------------------------------------- */
    /**
     * 
     * _id (ObjectID):
     * 4 premiers byte : timestamp du moment où l’id a été créé
     * 3 potchains bytes : id de la machine
     * 2  prochains bytes : process_id
     * 3  prochains bytes : valeur random
     */

    /*--------------------------------------------------------------------------------------------------- */


    client.db('TodoApp') // Database, si elle n'existe pas, elle sera cree SI on INSERE AU MOINS un element dedans
        .collection('Users') // Collection
        .insertOne({ // Document
            // _id: 123, // valide
            name: 'Daivy',
            age: 25,
            location: 'Liège'

        }, (err, result) => {
            if (err)
                return console.log('Unable to insert user', err);

            // console.log(JSON.stringify(result.ops, undefined, 2));
            console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2)); // Avoir la date où il a été créé
        });

    

    client.close();
});