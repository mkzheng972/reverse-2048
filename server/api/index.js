const router = require('express').Router()
module.exports = router

// test routes
router.get('/', (req, res, next) => {
  res.send('Hello World')
})

router.get('/puppies', (req, res, next) => {
  res.send('Hello puppies')
})

router.get('/kittens', (req, res, next) => {
  res.send('Hello kittens')
})

router.use((req, res, next) => {
  const err = new Error('Not found')
  err.status = 404
  next(err)
})
