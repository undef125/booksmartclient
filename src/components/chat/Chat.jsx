import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../api/api";
import "./chatstyle.css";
import io from "socket.io-client";

// const socket = io.connect("http://localhost:5000", { secure: true }); //development
// const socket = io.connect("https://serverbooksmart.herokuapp.com", { secure: true });             //production

let chatId = "";

const Chat = () => {
  const [toSendMessage, settoSendMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showMessagesection, setShowMessageSection] = useState(false);

  const location = useLocation();
  const { sellerId, buyerId } = location.state;

  const getMessages = () => {
    axios
      .get(`/msg/${chatId}`)
      .then((res) => setMessages([...res.data]))
      .catch((err) => console.log("error while fetching messages!!"));
  };

  const sendMessage = async () => {
    let messagetosend = {
      chatId: chatId,
      senderId: buyerId,
      text: toSendMessage,
    };
    try {
      await axios.post(`/msg/`, messagetosend);
    } catch (error) {
      console.log("error: " + error);
    }
    // await socket.emit("send_message", messagetosend);
    getMessages();
  };

  // useEffect(() => {
  //   socket.on("receive_message", (messageobj) => {
  //     if (messageobj) {
  //       getMessages();
  //     }
  //   });
  // }, [socket]);

  useEffect(() => {

    const getuserChats = async () => {
      try {
        const result = await axios.get(`/chat/${buyerId}`);
        setChats([...chats, ...result.data]);
        console.log(result);
      } catch (error) {
        console.log("Error: " + error);
      }
    };
    getuserChats();
  }, []);

  //socket.io configurations
  // const joinRoom = (id) => {
  //   socket.emit("join_room", id);
  // };

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
                      // joinRoom(chat._id);
                      setShowMessageSection(true);
                      getMessages();
                    }}
                  >
                    {chat?.members.filter((id) => id !== buyerId && id !== "")}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      {showMessagesection ? (
        <div className="rightsection">
          <div className="head">{buyerId}</div>
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
            <div className="sendholder">
              <img
                src="/send.png"
                onClick={() => {
                  settoSendMessage("");
                  sendMessage();
                }}
              ></img>
            </div>
          </div>
        </div>
      ) : (
        <p>Say Hello !!</p>
      )}
    </div>
  );
};

export default Chat;
