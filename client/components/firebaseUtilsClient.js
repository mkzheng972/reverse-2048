/*
this firebase set-up is for the web (aka client side)
from moved here from the server folder
*/

import firebase from 'firebase'
// import  for side-effects
import 'firebase/auth'
import 'firebase/firestore'
import { firebaseConfig } from '../config'

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

/*
 **params: collectionName: string
 **return: array
 */
export const getCollection = async (collectionName) => {
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

/*
 **params: collectionName: string, data:object
 **return: document.id
 */
export const addDocument = async (collectionName, data) => {
  /*
  auto-generate ID -> use db.collection(collectionName).add(dataObj)
  specific ID -> use db.collection(collectionName).doc(docId).set(dataObj)
  Behind the scenes, .add(...) and .doc().set(...) are completely equivalent
  */

  const collectionRef = db.collection(collectionName)
  const response = await collectionRef.add(data)
  return response
}

/*
 **params: collectionName: string, documentId: string, data: object
 **return: void
 */
export const updateDocument = async (collectionName, documentId, data) => {
  const documentRef = db.collection(collectionName).doc(documentId)
  await documentRef.update(data)
}

/*
to update more than one document with matching condition
1. need to get all the document IDs first (need document id to update)
2. run thru all the documents from the list and update
https://stackoverflow.com/questions/48947499/can-firestore-update-multiple-documents-matching-a-condition-using-one-query
*/

/*
 **params: collectionName: string, data: object
 **return: void
 */
export const updateAllFromCollection = async (collectionName, data) => {
  const collectionRef = db.collection(collectionName)
  const documentIdArr = []
  const snapshot = await collectionRef.where('score', '==').get()
  snapshot.forEach((doc) => {
    documentIdArr.push(doc.id)
  })

  for (let id of documentIdArr) {
    updateDocument(collectionName, id, data)
  }
}
