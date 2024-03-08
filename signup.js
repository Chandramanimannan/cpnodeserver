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

router.post('/signup', async (req, res) => {
  try {
    const { company_name, username, country, email, password, confirm_password, mobile_number } = req.body;

    
    if (password !== confirm_password) {
      return res.status(400).send('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = {
      text: 'INSERT INTO signup (company_name, username, country, email, password, mobile_number) VALUES ($1, $2, $3, $4, $5, $6)',
      values: [company_name, username, country, email, hashedPassword, mobile_number],
    };
    await pool.query(query);

    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).send('Error during signup');
  }
});


module.exports = router;
