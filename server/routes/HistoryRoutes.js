import express from 'express';
import { CHAT_HISTORY } from '../data/chatHistory';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(CHAT_HISTORY);
});

export default router;
