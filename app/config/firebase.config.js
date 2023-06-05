const firebase = require("firebase-admin")

const credential = require("../../serviceAccountKey.json")

firebase.initializeApp({
  credential: firebase.credential.cert(credential),
})

module.exports = firebase
