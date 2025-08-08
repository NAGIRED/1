// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname)); // serve index.html

// Initialize database
const db = new sqlite3.Database('./users.db', (err) => {
  if (err) return console.error(err.message);
  console.log('Connected to SQLite database.');
});

// Create table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    mobile TEXT NOT NULL,
    date TEXT NOT NULL
  )
`);

// Handle form submission
app.post('/submit', (req, res) => {
  const { name, mobile, date } = req.body;
  const sql = `INSERT INTO users (name, mobile, date) VALUES (?, ?, ?)`;

  db.run(sql, [name, mobile, date], function (err) {
    if (err) {
      console.error(err.message);
      res.send("Error saving data.");
    } else {
      res.send(`<h3>Data saved!</h3><a href="/">Back</a>`);
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
