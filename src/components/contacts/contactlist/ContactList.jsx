import { useContext, useEffect, useState } from "react";
import { ChatMessagesContext } from "../../../context/ChatMessagesContext";
import "./contactList.scss";
import { useNavigate } from "react-router-dom";

/**
 * Fetches contact list data from a JSON file and updates state.
 */
const ContactList = () => {
  const { fetchInitialMessages } = useContext(ChatMessagesContext);
  const [contactList, setcontactList] = useState([]);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const navigate = useNavigate();

  const fetchContactList = async () => {
    const response = await fetch("/data/contactList.json");
    const contactsData = await response.json();
    setcontactList(contactsData);
  };

  useEffect(() => {
    fetchContactList();
  }, []);

  const getMessages = async (contactId, chatId) => {
    try {
      console.log(chatId);
      await fetchInitialMessages(chatId);
      setSelectedContactId(contactId);
      navigate(`/messenger/` + chatId);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="contactList">
      <p>Friends</p>
      <div className="list">
        {contactList.map((contact) => (
          <div
            key={contact.id}
            className={`user ${
              selectedContactId === contact.id ? "selected" : ""
            }`}
            onClick={() => getMessages(contact.id, contact.chatId)}
            style={{
              pointerEvents: selectedContactId === contact.id ? "none" : "auto",
            }}
          >
            <img src={contact.img} alt="" />
            <div className="text">
              <span>{contact.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
