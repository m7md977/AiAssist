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
    max_tokens: 1000,
    temperature: 0.5,

  });
  console.log(response.data.usage.total_tokens);
  const answer = response.data.choices[0].message.content;
  if (answer) {
    res.json({answer});
  } else {
    res.json({answer: 'Error'});
  }
});

export default router
