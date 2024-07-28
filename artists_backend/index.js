const express = require("express");
const mysql = require('mysql2/promise');
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

let db;

// Function to initialize database connection
async function initDB() {
  try {
    db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });
    console.log('Connected to the database as id ' + db.threadId);
  } catch (err) {
    console.error('Error connecting to the database:', err.stack);
    throw err;
  }
}

// Initialize the database connection before starting the server
initDB().then(() => {
  // Define your routes here
  
  app.get('/', async (req, res) => {
    try {
      const query = 'SELECT * FROM transactions ORDER BY id DESC';
      const [results] = await db.query(query);
      res.json(results);
    } catch (err) {
      console.error('Database query error:', err);
      res.status(500).json({ error: 'Database error' });
    }
  });

  app.post('/add', async (req, res) => {
    try {
      const { id, type, amount, description, date } = req.body;

      // Convert the date to MySQL-compatible format
      const formattedDate = new Date(date).toISOString().slice(0, 19).replace('T', ' ');

      const getQuery = 'SELECT running_balance FROM transactions ORDER BY id DESC LIMIT 1';
      const [results] = await db.query(getQuery);

      let balance = results.length > 0 ? results[0].running_balance : 0;

      let running_balance;
      switch (type) {
        case 'credit':
          running_balance = parseInt(balance) + parseInt(amount);
          break;
        case 'debit':
          running_balance = balance - amount;
          break;
        default:
          return res.status(400).json({ error: 'Invalid transaction type' });
      }

      const data = { id, type, amount, description, date: formattedDate, running_balance };

      const query = 'INSERT INTO transactions SET ?';
      await db.query(query, data);
      res.status(201).json({ message: 'Transaction added successfully' });

    } catch (err) {
      console.error('Database error:', err);
      res.status(500).json({ error: 'Database error' });
    }
  });

  const port = process.env.PORT || 4000;
  const HOST = '127.0.0.1'; // Bind to all network interfaces

  app.listen(port, HOST, () => {
    console.log(`Listening at port number ${HOST}:${port}`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1); // Exit the application if the database connection fails
});
