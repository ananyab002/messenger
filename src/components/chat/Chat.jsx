import { useContext } from "react";
import ChatDialog from "./chatDialog/ChatDialog";
import ContactInfo from "./contactInfo/ContactInfo";
import { ChatMessagesContext } from "../../context/ChatMessagesContext";
import { useParams } from "react-router-dom";
import ChatPrompt from "./chatPrompt/ChatPrompt";
import "./chat.scss";

const Chat = () => {
  const { allMessages } = useContext(ChatMessagesContext);
  const { chatID } = useParams();
  return (
    <div className="chatComponent">
      {allMessages[chatID] ? (
        <div>
          <ContactInfo />
          <ChatDialog />
          <ChatPrompt />
        </div>
      ) : (
        <div className="info">Please select a friend to chat.</div>
      )}
    </div>
  );
};

export default Chat;
