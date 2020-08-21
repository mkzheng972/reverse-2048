const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const compression = require('compression');
module.exports = app;

if (process.env.NODE_ENV !== 'production') {
  require('../secrets');
}

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user))
    .catch(done);
});

// logger for any debugging
app.use(morgan('dev'));

// handles static files: javascript files, css files, and images
app.use(express.static(path.join(__dirname, '../public')));

// body parsing middleware allows req.body to have json format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// compression middleware to compress responses
app.use(compression());

// session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'current secret is here',
    resave: false,
    saveUninitialized: false,
  })
);

// passport middleware goes after session middleware
app.use(passport.initialize());
app.use(passport.session());

// api routes
app.use('/api', require('./api'));

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    console.log(req.path);
    const err = new Error('Not found');
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// sends index.html for any requests that does not match any API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// error handling 500 server issues
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

// everything works, listen for the request
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
