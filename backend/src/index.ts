import cors from 'cors';
import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const app = express();
const port = 9001;

app.use(cors());

app.get('/', async (_req, res) => {
  const database = await open({
    filename: 'database.db',
    driver: sqlite3.Database,
    mode: sqlite3.OPEN_READONLY,
  });

  const rows = await database.all(
    "SELECT name FROM sqlite_schema WHERE type = 'table' AND name NOT LIKE 'sqlite_%'",
  );

  res.send(rows);
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
