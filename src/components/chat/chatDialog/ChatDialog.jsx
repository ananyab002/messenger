import { useContext, useEffect, useRef, useState } from "react";
import { getDate } from "../../../utils/date";
import { ChatMessagesContext } from "../../../context/ChatMessagesContext";
import { useParams } from "react-router-dom";

import "./chatDialog.scss";

const ChatDialog = () => {
  const todayDate = new Date();
  const centerRef = useRef(null);
  const { allMessages } = useContext(ChatMessagesContext);
  const { chatID } = useParams();

  const [messages, setMessages] = useState([]);
  const fetch = () => {
    if (allMessages) setMessages(allMessages[chatID]);
  };

  useEffect(() => {
    fetch();
  }, [chatID, allMessages]);

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
