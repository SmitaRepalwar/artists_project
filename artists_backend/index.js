const express = require("express");
const mysql = require('mysql2');
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();


app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as id ' + db.threadId);
});


app.get('/transaction_view', (req, res) => {
    const query = 'SELECT * FROM transactions';
    db.query(query, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });


app.post('/transaction_add', async (req, res) => {
    var { type, amount, description, date, running_balance } = req.body;

    const data = {
      id: null,
      type,
      amount,
      description,
      date,
      running_balance
    }

    const query = 'INSERT INTO transactions SET ?';
    db.query(query, data, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Transaction Added successfully' });
    });
  });
  
  const port = process.env.PORT || 4000  

  app.listen(port, ()=>{
    console.log(`listening at port number ${port}`)
  })  