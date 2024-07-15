// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./models/user');
const session = require('express-session');
const crypto = require('crypto');

const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Login_Details', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

const secretKey = crypto.randomBytes(64).toString('hex');

// Setup session management
app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 } // Session expiration time in milliseconds
}));

// Handle logout
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
      if (err) {
          return res.redirect('/next');
      }
      res.redirect('/');
  });
});

// Check session status
app.get('/session-status', (req, res) => {
  if (req.session.username) {
      res.json({ loggedIn: true });
  } else {
      res.json({ loggedIn: false });
  }
});

// Sign up route
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password });
  try {
    await newUser.save();
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && user.password === password) {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: 'Invalid username or password' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// // Welcome route
// app.post('/user', async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ username });
//   if (user) {
//     res.json({ name: user.username }); // Assuming you want to return the username
//   } else {
//     res.status(404).json({ message: 'User not found' });
//   }
// });
