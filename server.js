const express = require('express');
// install bcrypt-nodejs via npm (it's deprecated but it's okay for this project)
// bcrypt lets us hash passwords and compare hashes
const bcrypt = require('bcrypt-nodejs');
// install the middleware cors to solve 'Access-Control-Allow-Origin' error in the console
const cors = require('cors');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// connect to our postgres database via the npm package knex
const db = require('knex')({
  // connect to your own database here:
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'karyseaweed',
    password: '',
    database: 'face-detection',
  },
});

const app = express();
app.use(express.json()); // without this, /signin route will fail
app.use(cors());

app.get('/', (req, res) => {
  res.send(db.users);
});
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});
app.get('/profile/:id', (req, res) => {
  profile.handleProfileGet(req, res, db);
});
app.put('/image', (req, res) => {
  image.handleImage(req, res, db);
});
app.post('/imageurl', (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(3000, () => {
  console.log('app is running on port 3000');
});
