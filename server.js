const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',        // replace with your DB user
  password: '',        // replace with your DB password
  database: 'userdb'   // make sure this database exists
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database.');
});

// Handle form submission
app.post('/submit', (req, res) => {
  const { name, mobile, date } = req.body;
  const sql = 'INSERT INTO details (name, mobile, date) VALUES (?, ?, ?)';
  db.query(sql, [name, mobile, date], (err, result) => {
    if (err) throw err;
    res.send('User data saved successfully!');
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
