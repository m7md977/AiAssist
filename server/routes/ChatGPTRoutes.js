import express from 'express';
import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.route('/').post(async (req, res) => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: req.body.messages,
    temperature: 0.7,

  });
  console.log(req.body.messages);
  console.log(response.data.usage.total_tokens);
    res.send(response.data);
});

export default router
