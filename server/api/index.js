const router = require('express').Router();
module.exports = router;

// test routes
router.get('/', (req, res, next) => {
  res.send('all pets');
});

router.get('/puppies', (req, res, next) => {
  res.send('all dogs');
});

router.get('/kittens', (req, res, next) => {
  res.send('all cats');
});

router.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});
