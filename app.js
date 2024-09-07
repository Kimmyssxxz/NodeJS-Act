const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// In-memory user storage (for simplicity, using an object)
const users = {};

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  if (users[username]) {
    return res.send('User already exists!');
  }
  users[username] = password;
  res.send('User registered successfully!');
});

app.get('/signin', (req, res) => {
  res.render('signin');
});

app.post('/signin', (req, res) => {
  const { username, password } = req.body;
  if (users[username] && users[username] === password) {
    return res.send('Welcome, ' + username + '!');
  }
  res.send('Invalid username or password!');
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
