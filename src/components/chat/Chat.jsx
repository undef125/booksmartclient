import React, { useEffect, useState, useContext, useRef } from "react";
import { DataContext } from "../../context/DataProvider";
import { useLocation } from "react-router-dom";
import axios from "../../api/api";
import "./chatstyle.css";
let chatId = "";
let messages = []


const Chat = () => {
  const [toSendMessage, settoSendMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [rerender, setrerender] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showMessagesection, setShowMessageSection] = useState(false)

  const location = useLocation();
  const { sellerId, buyerId } = location.state;

  useEffect(() => {}, [rerender]);

  useEffect(() => {
    const getuserChats = async () => {
      try {
        const result = await axios.get(`/chat/${buyerId}`);
        setChats([...result.data]);
        console.log(result);
      } catch (error) {
        console.log("Error: " + error);
      }
    };
    getuserChats();
  }, []);

  const sendMessage = async () => {
    try {
      const { data } = await axios.post(`/msg/`, {
        chatId: chatId,
        senderId: buyerId,
        text: toSendMessage,
      });
      console.log(data);
    } catch (error) {
      console.log("error: " + error);
    }
    setrerender(!rerender);
  };

  const getMessages = () => {
    console.log(chatId);
      axios.get(`/msg/${chatId}`)
        .then(res => setMessages([...res.data]))
        .catch(err => console.log("error while fetching messages!!"))
  };

  // setInterval(getMessages, 10000); 

  return (
    <div className="chatcontainer">
      <div className="leftsection">
        <div className="userslist">
          {chats?.map((chat) => {
            return (
              <>
                <div className="induser">
                  <div
                    className="name"
                    onClick={() => {
                      chatId = chat._id;
                      setShowMessageSection(true);
                      getMessages();
                    }}
                  >
                    {chat.members.filter((id) => id !== buyerId)}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      {showMessagesection && 
      <div className="rightsection">
        <div className="messages">
          {messages?.map((message) => (
            <>
              {message.senderId === buyerId ? (
                <p className="rightmsg">{message.text}</p>
              ) : (
                <p className="leftmsg">{message.text}</p>
              )}
            </>
          ))}
        </div>
        <div className="sendmessage">
          <input
            type="text"
            placeholder="Send Message!"
            value={toSendMessage}
            onChange={(e) => settoSendMessage(e.target.value)}
          />
          <button
            onClick={() => {
              sendMessage();
            }}
          >
            Send message
          </button>
        </div>
      </div>
}
    </div>
  );
};

export default Chat;