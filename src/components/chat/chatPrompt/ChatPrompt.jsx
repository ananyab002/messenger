import { getFormattedDate, formatTime } from "../../../utils/date";
import { useForm } from "react-hook-form";
import { memo, useContext, useState } from "react";
import { ChatMessagesContext } from "../../../context/ChatMessagesContext";
import { useParams } from "react-router-dom";
import "./chatPrompt.scss";

/**
 *  Handles the input and submission of new chat messages.
 */
const ChatPrompt = () => {
  const { register, handleSubmit, watch, reset } = useForm();

  const [messages, setMessages] = useState([]);
  const { chatID } = useParams();

  const { updateAllMessages } = useContext(ChatMessagesContext);

  const handleSendMessage = async (data) => {
    if (data.message.trim().length === 0) {
      return;
    }
    const messageObject = {
      // id 1 is for the user
      id: 1,
      message: data.message,
      time: formatTime(new Date()),
      date: getFormattedDate(new Date()),
    };
    setMessages((prevData) => [...prevData, ...data.message]);
    console.log(messages);
    await updateAllMessages(messageObject, chatID);
    reset();
  };

  /**
   * Handles the Enter key press event to send the message.
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const currentMessage = watch("message");
      if (currentMessage.trim()) handleSubmit(handleSendMessage)();
    }
  };
  return (
    <div className="bottom">
      <form onSubmit={handleSubmit(handleSendMessage)}>
        <input
          {...register("message")}
          className="messageInput"
          type="text"
          placeholder="Type a message...."
          onKeyDown={handleKeyDown}
        />
        <button type="submit" className="sendButton">
          Send
        </button>
      </form>
    </div>
  );
};

export default memo(ChatPrompt);
