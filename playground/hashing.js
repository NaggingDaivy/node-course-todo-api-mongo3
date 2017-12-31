const {SHA256} = require('crypto-js'); // One way algorithme: on peut hasher, mais on ne ne peut pas déhasher

const jwt = require('jsonwebtoken');

//jwt.sign
//jwt.verify

var data = {
    id : 10
}

var token = jwt.sign(data,'123abc');
console.log(token);

var decoded = jwt.verify(token,'123abc');
console.log(decoded);



// var message = 'I am user number 3';
// var hash = SHA256(256).toString();

// console.log(`Message : ${message}`);
// console.log(`Hash : ${hash}`);

// // HASH + salt password

// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHAR256(JSON.stringify(data) + 'some secret').toString() // On doit faire du salt, car si un hacker possède uniquement le data, il pourra hasher
// }

// /** HACKER EXAMPLE BEGIN */
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
// /**HACKER EXAMPLE END */

// var resultHash = (SHA256(JSON.stringify(token.data)) + 'somesecret').toString();

// if(resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed.  Do not trust !');

// }