import React, { useEffect, useState } from "react";
import api from "../api";
import io from "socket.io-client";

const ChatRoom = ({ roomId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io("http://localhost:2015");
    setSocket(socketInstance);

    socketInstance.emit("joinRoom", roomId);

    socketInstance.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [roomId]);

  const sendMessage = async () => {
    if (newMessage) {
      socket.emit("sendMessage", { roomId, text: newMessage });
      setNewMessage("");
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
