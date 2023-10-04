import openai from "../../utils/openai.js";
import tokenCounter from "../../utils/tokenCounter.js";
// import Chat from "../Chat.js";
import Message from "../Message.js";

export async function startChat(req, res) {
  try {
    const chat = await Chat.create();
    res.status(201).json({ chatId: chat.id });
  } catch (error) {
    res.status(500).json({ error: "Failed to start chat" });
  }
}

export async function sendMessage(req, res) {
  try {
    const chatId = req.params.chatId;
    const userMessage = req.body.message;

    const chat = await Chat.findByPk(chatId, { include: [Message] });

    if (!chat) {
      res.status(404).json({ error: "Chat not found" });
      return;
    }

    const messages = chat.Messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    messages.push({ role: "user", content: userMessage });

    const tokenCount = tokenCounter.countTokens(messages);

    if (tokenCount >= process.env.MAX_TOKENS) {
      res
        .status(400)
        .json({ error: "Max tokens reached. Please start a new chat." });
      return;
    }

    const openaiResponse = await openai.createChatCompletion(messages);

    const aiMessage = {
      chatId: chat.id,
      role: "ai",
      content: openaiResponse,
    };

    const savedAiMessage = await Message.create(aiMessage);
    messages.push({ role: "ai", content: savedAiMessage.content });

    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ error: "Failed to send message" });
  }
}
