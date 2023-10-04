import React, { useState, useEffect } from "react";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

const ChatBot1 = () => {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);

  useEffect(() => {
    async function startChat() {
      const response = await fetch("http://localhost:3080/api/chat/start", {
        method: "POST",
      });
      const data = await response.json();
      setChatId(data.chatId);
      setMessages([
        {
          sender: "ChatBot",
          message: "Hello, how can I help you?",
          sentTime: "just now",
        },
      ]);
    }
    startChat();
  }, []);

  const handleSend = async (message) => {
    const newMessage = {
      sender: "user",
      message,
      direction: "outgoing",
    };
    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setTyping(true);

    await fetch(`http://localhost:3080/api/chat/${chatId}/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        const aiMessage = {
          message: data.aiResponse,
          sender: "ChatBot",
        };

        setMessages([...newMessages, aiMessage]);
        setTyping(false);
      });
  };

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

export default ChatBot1;
