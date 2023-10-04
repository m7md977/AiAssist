import openai from "openai";

openai.apiKey = process.env.OPENAI_API_KEY;

async function createChatCompletion(messages) {
  const promptMessages = messages.map((msg) => {
    return {
      role: msg.role,
      content: msg.content,
    };
});

const response = await openai.Completion.create({
engine: "gpt-3.5-turbo",
prompt: { messages: promptMessages },
max_tokens: 150,
temperature: 0.7,
top_p: 1,
});

const aiReply = response.choices[0].text.trim();
return aiReply;
}

export default {
createChatCompletion,
};