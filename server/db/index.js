const admin = require('firebase-admin')

const serviceAccount = require('../../secrets/tofe-b19d2-firebase-adminsdk-nkaxj-acf8fae781.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://tofe-b19d2.firebaseio.com',
})

const db = admin.firestore()

/**
 *
 * @param {String} collectionName
 * @returns {Array}
 */
const getCollection = async (collectionName) => {
  // response is a snapshot
  const documents = []
  const collectionRef = db.collection(collectionName)
  const snapshot = await collectionRef.get()
  snapshot.forEach((doc) => {
    let obj = doc.data()
    obj.id = doc.id
    documents.push(obj)
  })
  return documents
}

/**
 *
 * @param {String} collectionName
 * @param {Object} data
 * @returns {id} document.id
 */
const addDocument = async (collectionName, data) => {
  /*
  auto-generate ID -> use db.collection(collectionName).add(dataObj)
  specific ID -> use db.collection(collectionName).doc(docId).set(dataObj)
  Behind the scenes, .add(...) and .doc().set(...) are completely equivalent
  */

  const collectionRef = db.collection(collectionName)
  const response = await collectionRef.add(data)
  return response
}

module.exports = {
  getCollection,
  addDocument,
}
