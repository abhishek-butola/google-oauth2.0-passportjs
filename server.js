const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');

//Passport Config
require('./config/passport')(passport);

//Routes
const auth = require('./routes/auth');
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true }, () =>
  console.log('Mongodb Connected')
);

const app = express();

app.use(cookieParser());
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  })
);
//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Set global vars
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.get('/', (req, res) => {
  res.json({ msg: 'hook successfully working version 4' });
});

app.use('/auth', auth);
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Server running at port 5000');
});
