import React, { useState } from "react";
import api from "../api";

const CreateRoom = () => {
  const [roomName, setRoomName] = useState("");

  const createRoom = async () => {
    try {
      const token = localStorage.getItem("token");
      if (roomName) {
        await api.post(
          "/chatRooms",
          { name: roomName },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRoomName("");
      }
    } catch (error) {
      console.error(error);
      alert("Room creation failed");
    }
  };

  return (
    <div>
      <h2>Create Chat Room</h2>
      <input
        type="text"
        placeholder="Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <button onClick={createRoom}>Create Room</button>
    </div>
  );
};

export default CreateRoom;
