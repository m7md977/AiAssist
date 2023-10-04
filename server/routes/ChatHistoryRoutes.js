import mysql from 'mysql2/promise'; // Import mysql2/promise for async/await support
import express from 'express';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const router = express.Router();

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


// Add a POST endpoint to insert data into the database
router.route('/').post(async (req, res) => {
  const chatHistory = req.body.messages;

  // Loop through the array of messages and generate a unique ID for each one
  const chatHistoryWithIds = chatHistory.map(message => ({
    id: uuidv4(),
    role: message.role,
    content: message.content,
  }));

  // Use the updated chatHistoryWithIds array in the SQL query
  const query = `INSERT INTO chat_history (idchat_history, role, content) VALUES ?`;

  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Execute the query
    const [result] = await connection.query(query, [chatHistoryWithIds.map(({ id, role, content }) => [id, role, content])]);

    // Release the connection back to the pool
    connection.release();

    console.log({ message: 'Data inserted successfully' });
    res.status(200).json({ message: 'Data inserted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to insert data into database' });
  }
});

export default router;
