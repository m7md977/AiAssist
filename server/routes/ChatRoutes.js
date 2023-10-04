// create a server route that get request data from the client check if the data exists get the messages from that data if there's no messages send an error message, sit a tokenCount go through the messages and add the length of each message to the tokenCount, run a moderation request from api.openai.com/v1/moderation if the result is flagged send an error message, constructing our prompt and then we add up our prompts tokens to our total token count before we check to make sure that we are not over the 4000 which I believe is actually 4096 for this new API but I'm just going to leave it at 4 000 and then for the messages we're going to construct new messages array with the first message being our system message


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
    const { messages } = req.body;
    if (!messages) {
        res.json({ answer: 'Error' });
        return;
    }
    let tokenCount = 0;
    for (const message of messages) {
        tokenCount += message.length;
    }
    const moderation = await openai.createModerationRequest({
        model: 'gpt-3.5-turbo',
        prompt: messages.join(''),
        max_tokens: 1000,
        temperature: 0.5,
    });
    if (moderation.data.result === 'flagged') {
        res.json({ answer: 'Error' });
        return;
    }
    const systemMessage = 'The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\n';
    tokenCount += systemMessage.length;
    const newMessages = [systemMessage, ...messages];
    if (tokenCount > 4000) {
        res.json({ answer: 'Error' });
        return;
    }
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: newMessages,
        max_tokens: 4000,
        temperature: 0.5,
    });
    const answer = response.data.choices[0].text;
    if (answer) {
        res.json({ answer });
    }
    else {
        res.json({ answer: 'Error' });
    }
});

export default router;
