const express = require('express');
// install bcrypt-nodejs via npm (it's deprecated but it's okay for this project)
// bcrypt lets us hash passwords and compare hashes
const bcrypt = require('bcrypt-nodejs');
// install the middleware cors to solve 'Access-Control-Allow-Origin' error in the console
const cors = require('cors');
// logging middleware
const morgan = require('morgan');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// the requireAuth function we wrote will serve as a middleware
const auth = require('./controllers/authorization');

// connect to our postgres database via the npm package knex
const db = require('knex')({
  // connect to your own database here:
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
});

const app = express();
app.use(express.json()); // without this, /signin route will fail
app.use(cors());
app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.send('IT IS WORKING!');
});
app.post('/signin', signin.signinAuth(db, bcrypt));
app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});
app.get('/profile/:id', auth.requireAuth, (req, res) => {
  profile.handleProfileGet(req, res, db);
});
app.post('/profile/:id', auth.requireAuth, (req, res) => {
  profile.handleProfileUpdate(req, res, db);
});
app.put('/image', auth.requireAuth, (req, res) => {
  image.handleImage(req, res, db);
});
app.post('/imageurl', auth.requireAuth, (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(3000, () => {
  console.log('app is running on port 3000');
});
