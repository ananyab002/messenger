import { useContext, useEffect, useRef, useState } from "react";
import { getDate } from "../../../utils/date";
import { ChatMessagesContext } from "../../../context/ChatMessagesContext";
import { useParams } from "react-router-dom";

import "./chatDialog.scss";

/**
 * ChatDialog component renders the chat interface displaying messages.
 * It fetches messages from the ChatMessagesContext based on the chatID
 */
const ChatDialog = () => {
  const todayDate = new Date();
  const centerRef = useRef(null);
  const { allMessages } = useContext(ChatMessagesContext);
  const { chatID } = useParams();

  const [messages, setMessages] = useState([]);

  /**
   * Fetches messages for the current chatID from the context and
   * updates the local state with the fetched messages.
   */
  const fetch = () => {
    if (allMessages) setMessages(allMessages[chatID]);
  };

  useEffect(() => {
    fetch();
  }, [chatID, allMessages]);

  /**
   * useEffect to bottom scroll.
   */

  useEffect(() => {
    const center = centerRef.current;
    if (center) {
      center.scrollTop = center.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="center" ref={centerRef}>
      {messages &&
        messages.map((message, index) => (
          <div
            key={index}
            className={message.id === 1 ? "message user" : "message"}
          >
            <div className="texts">
              <p>{message.message}</p>
              <div className="dateTime">
                <span>
                  {getDate(message.date) === getDate(todayDate)
                    ? "Today"
                    : message.date}
                </span>
                <span> {message.time}</span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ChatDialog;
