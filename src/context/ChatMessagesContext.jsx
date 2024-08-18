import { createContext, useEffect, useState } from "react";

export const ChatMessagesContext = createContext();

export const ChatMessagesContextProvider = ({ children }) => {
  const [allMessages, setAllMessages] = useState(
    []
    // JSON.parse(sessionStorage.getItem("chatHistory")) || []
  );

  const fetchInitialMessages = async (chatID) => {
    try {
      const response = await fetch("/data/initialMessages.json");
      if (!response.ok) throw new Error("Failed to fetch messages");
      const data = await response.json();
      const findChatIdData = data[chatID];
      const chatIdData = { [chatID]: [...findChatIdData] };
      console.log("fetchInitialMessages");
      setAllMessages(chatIdData);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   sessionStorage.setItem("chatHistory", JSON.stringify(allMessages));
  // }, [allMessages]);

  return (
    <ChatMessagesContext.Provider value={{ allMessages, fetchInitialMessages }}>
      {children}
    </ChatMessagesContext.Provider>
  );
};
