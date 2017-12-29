const {
    MongoClient,
    ObjectId
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err)
        return console.log('Unable to connect to MongoDB server', err);

    //findOneAndUpdate
    // client.db('TodoApp').collection('Todos').findOneAndUpdate({
    //     _id: new ObjectId("5a46467c172da198eb704210")
    // }, {
    //     $set: { // update operator (voir donc MongoDB)
    //         completed: false

    //     }
    // }, {
    //     returnOriginal: false // retournera le document updaté au lieu de l'original (comportement par défaut)
    // }).then((res) => {
    //     console.log(res);
    // }, (err) => {
    // });

    /*USERS*/ 

    client.db('TodoApp').collection('Users').findOneAndUpdate({
        _id: new ObjectId("5a462ad5e43c2d05c2f612cd")
    }, {
        $inc: { // update operator (voir donc MongoDB : https://docs.mongodb.com/manual/reference/operator/update/)
            age: 1

        }
    }, {
        returnOriginal: false // retournera le document updaté au lieu de l'original (comportement par défaut)
    }).then((res) => {
        console.log(res);
    }, (err) => {
    });



    // client.close();

});