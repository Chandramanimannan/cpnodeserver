const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const router = express.Router();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'DB1',
  password: '1234',
  port: 5432,
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const query = {
      text: 'SELECT * FROM signup WHERE username = $1',
      values: [username],
    };
    const result = await pool.query(query);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).send('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid username or password');
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Error during login');
  }
});

module.exports = router;