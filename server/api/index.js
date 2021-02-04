const router = require('express').Router()
module.exports = router
const firebaseUtils = require('../db/firebase.utils')

// test routes
router.get('/', (req, res, next) => {
  res.send('Not found')
})

router.get('/scores', async (req, res, next) => {
  try {
    let response = await firebaseUtils.getCollection('scores')
    res.send(response)
  } catch (error) {
    next(error)
  }
})

router.post('/scores', async (req, res, next) => {
  try {
    let data = req.body
    await firebaseUtils.addDocument('scores', data)
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

router.use((req, res, next) => {
  const err = new Error('Not found')
  err.status = 404
  next(err)
})
