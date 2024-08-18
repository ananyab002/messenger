import "./contactInfo.scss";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const fetchContactInfo = async ({ queryKey }) => {
  try {
    const [, chatID] = queryKey;
    const response = await fetch("/data/contactList.json");
    const contactsData = await response.json();
    const chatIdData = contactsData.find((item) => item.chatId === chatID);
    return chatIdData || {};
  } catch (error) {
    console.log(error);
  }
};
const ContactInfo = () => {
  const { chatID } = useParams();
  const {
    data: contactInfo = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["contactInfo", chatID],
    queryFn: fetchContactInfo,
    enabled: !!chatID,
  });

  if (isLoading) {
    return <div className="loading">Loading contact info...</div>;
  }

  if (isError) {
    return <div className="error">Error loading contact info.{isError}</div>;
  }

  return (
    <div className="top">
      <div className="userInformation">
        {contactInfo && (
          <div className="user">
            <img src={contactInfo.img} alt="" />
            <div className="text">
              <span>{contactInfo.name}</span>
              <p>{contactInfo.status}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactInfo;
