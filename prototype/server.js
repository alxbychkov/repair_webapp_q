const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Path to JSON file for storing requests
const REQUESTS_FILE = path.join(__dirname, 'requests.json');

// Initialize JSON file if it doesn't exist
const initializeFile = async () => {
  try {
    await fs.access(REQUESTS_FILE);
  } catch {
    await fs.writeFile(REQUESTS_FILE, JSON.stringify([]));
  }
};
initializeFile();

// Middleware to validate Telegram initData
const validateTelegram = (req, res, next) => {
  // Simplified validation (in production, verify Telegram initData hash)
  if (!req.query.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// Helper to read requests from JSON file
const readRequests = async () => {
  const data = await fs.readFile(REQUESTS_FILE, 'utf8');
  return JSON.parse(data);
};

// Helper to write requests to JSON file
const writeRequests = async (requests) => {
  await fs.writeFile(REQUESTS_FILE, JSON.stringify(requests, null, 2));
};

// API Endpoints
app.post('/requests', async (req, res) => {
  const { userId, brand, model, issue, photos, status } = req.body;
  try {
    const requests = await readRequests();
    const newRequest = {
      id: requests.length + 1,
      user_id: userId,
      brand,
      model,
      issue,
      photos: photos || [],
      status: status || 'Created',
      created_at: new Date().toISOString()
    };
    requests.push(newRequest);
    await writeRequests(requests);
    res.json(newRequest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/requests', async (req, res) => {
  const userId = req.query.userId;

  try {
    const requests = await readRequests();
    const userRequests = requests.filter(r => r.user_id === userId);
    res.json(userRequests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Instructions for switching to PostgreSQL
/*
To switch to PostgreSQL, replace the above file-based logic with the following:

const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'repair_db',
  password: 'your_password',
  port: 5432
});

// Create table
pool.query(`
  CREATE TABLE IF NOT EXISTS requests (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(50),
    brand VARCHAR(100),
    model VARCHAR(100),
    issue VARCHAR(100),
    photos TEXT[],
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`).catch(err => console.error('Error creating table:', err));

// POST /requests
app.post('/requests', validateTelegram, async (req, res) => {
  const { userId, brand, model, issue, photos, status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO requests (user_id, brand, model, issue, photos, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [userId, brand, model, issue, photos, status]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /requests
app.get('/requests', validateTelegram, async (req, res) => {
  const userId = req.query.userId;
  try {
    const result = await pool.query('SELECT * FROM requests WHERE user_id = $1', [userId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
*/

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});