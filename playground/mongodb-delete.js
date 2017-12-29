const {
    MongoClient,
    ObjectId
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', (err, client) => {

    if (err)
        return console.log('Unable to connect to MongoDB server', err);

    //deleteMany

    // client.db('TodoApp').collection('Todos').deleteMany({
    //     text: 'Eat lunch'
    // }).then((res) => {
    //     console.log(res);

    // }, (err) => {

    // });

    //deleteOne
    // client.db('TodoApp').collection('Todos').deleteOne({
    //     text: 'Eat lunch'
    // }).then((res) => {
    //     console.log(res);

    // }, (err) => {

    // });

    //findOneAndDelete
    // client.db('TodoApp').collection('Todos').findOneAndDelete({ // renvoie le document qui va être suprimé
    //     text: 'Eat lunch'
    // }).then((res) => {
    //     console.log(res);

    // }, (err) => {

    // });

    // client.db('TodoApp').collection('Users').deleteOne({
    //     name: 'Daivy'
    // }).then((res) => {
    //     console.log(res);

    // }, (err) => {

    // });

    client.db('TodoApp').collection('Users').deleteMany({
        name: 'Daivy'
    }).then((res) => {
        console.log(res);

    }, (err) => {

    });

    // client.close();

});