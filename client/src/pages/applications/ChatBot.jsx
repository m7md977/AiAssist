import React, { useState } from "react";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

const ChatBot = () => {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleSend = async (message) => {
    const newMessage = {
      sender: "user",
      message,
      direction: "outgoing",
    };
    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    setTyping(true);

    await processMessageToChatGPT(newMessages);
  };
  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatBot") {
        role = "assistant";
      } else {
        role = "user";
      }
      return {
        role: role,
        content: messageObject.message,
      };
    });
    const systemMessage = {
      role: "system",
      content: `you are Ai Assist`,
    };

    await fetch("http://localhost:3080/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: [systemMessage, ...apiMessages] }),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatBot",
          },
        ]);
        setTyping(false);
      });
  }
  return (
    <div>
      <div style={{ position: "relative" }}>
        <MainContainer className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 rounded ">
          <ChatContainer className="min-h-[calc(90vh-73px)] bottom-0 left-0 w-full">
            <MessageList
              className="overflow-y-auto"
              scrollBehavior="smooth"
              typingIndicator={
                typing ? <TypingIndicator content="ChatGPT is typing" /> : null
              }>
              {messages.map((message, i) => {
                return <Message key={i} model={message} />;
              })}
            </MessageList>
            <MessageInput
              className="mt-4"
              attachButton={false}
              placeholder="Type message here"
              onSend={handleSend}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
};

export default ChatBot;
