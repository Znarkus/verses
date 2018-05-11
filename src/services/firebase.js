'use strict'

const firebase = require('firebase')

const config = {
}

firebase.initializeApp(config)

module.exports = firebase

// firebase.database.ref().child('songs').once('value')
//   .then(function(dataSnapshot) {
//     // handle read data.
//   });
