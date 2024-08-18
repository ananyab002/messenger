import { createContext, useState } from "react";

export const ChatMessagesContext = createContext();

export const ChatMessagesContextProvider = ({ children }) => {
  const [allMessages, setAllMessages] = useState([]);

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

  const updateAllMessages = async (message, chatID) => {
    console.log(message);
    setAllMessages((prevData) => {
      console.log(prevData, prevData[chatID]);
      const updatedMessages = [...prevData[chatID], message];
      return {
        ...prevData,
        [chatID]: updatedMessages,
      };
    });
  };

  return (
    <ChatMessagesContext.Provider
      value={{ allMessages, fetchInitialMessages, updateAllMessages }}
    >
      {children}
    </ChatMessagesContext.Provider>
  );
};
