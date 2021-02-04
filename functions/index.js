const functions = require('firebase-functions')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const express = require('express')
const cors = require('cors')
const app = express()

const admin = require('firebase-admin')
admin.initializeApp()
// Automatically allow cross-origin requests
app.use(cors({ origin: true }))

app.get('/', async (req, res, next) => {
  try {
    res.send('Not found')
  } catch (error) {
    next(error)
  }
})

app.get('/scores', async (req, res, next) => {
  try {
    const snapshot = await admin.firestore().collection('scores').get()
    const response = []
    snapshot.forEach((doc) => {
      response.push({ id: doc.id, data: doc.data() })
    })
    res.send(response)
  } catch (error) {
    next(error)
  }
})

app.post('/scores', async (req, res, next) => {
  try {
    let data = req.body
    const response = await admin.firestore().collection('scores').add(data)
    res.send(response)
  } catch (error) {
    next(error)
  }
})

exports.api = functions.https.onRequest(app)
