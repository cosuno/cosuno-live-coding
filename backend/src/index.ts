import express from 'express';
import sqlite3 from 'sqlite3';

const app = express();
const port = 9001;

app.get('/', (_req, res) => {
  const database = new sqlite3.Database('database.db', sqlite3.OPEN_READONLY);

  database.get('SELECT 1 FROM Subcontractors', (error, row) => {
    if (error) {
      throw error;
    }

    res.send(row);
  });
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
