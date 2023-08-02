import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const app = express();
const port = 9001;

app.get('/', async (_req, res) => {
  const database = await open({
    filename: 'database.db',
    driver: sqlite3.Database,
    mode: sqlite3.OPEN_READONLY,
  });

  const rows = await database.all('SELECT 1 FROM Subcontractors');

  res.send(rows);
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
