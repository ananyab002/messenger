import { getFormattedDate, formatTime } from "../../../utils/date";
import { useForm } from "react-hook-form";
import { memo, useContext, useState } from "react";
import { ChatMessagesContext } from "../../../context/ChatMessagesContext";
import { useParams } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import "./chatPrompt.scss";

/**
 *  Handles the input and submission of new chat messages.
 */
const ChatPrompt = () => {
  const { register, handleSubmit, watch, setValue, reset } = useForm();
  const [openEmoji, setOpenEmoji] = useState(false);
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

  const handleEmoji = (e) => {
    const sendMessage = watch("message") || "";
    setValue("message", sendMessage + e.emoji + "");
    setOpenEmoji(false);
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
        <div className="emoji">
          <img
            src="https://ananyab002.github.io/messenger/images/emoji.png"
            alt=""
            onClick={() => setOpenEmoji((prev) => !prev)}
          />
          <div className="emojiPicker">
            <EmojiPicker open={openEmoji} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button type="submit" className="sendButton">
          Send
        </button>
      </form>
    </div>
  );
};

export default memo(ChatPrompt);
