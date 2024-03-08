const express = require('express');
const bodyParser = require('body-parser');
const signupRouter = require('./signup');
const loginRouter = require('./login');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(signupRouter); // Mount the signup routes onto the app object
app.use(loginRouter); // Mount the login routes onto the app object

app.get('/', (req, res) => {
  res.send('<h1>Welcome to node js<h1>')
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
