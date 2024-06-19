import React, { useEffect, useState } from "react";
import api from "../api";

const JoinRoom = ({ roomId }) => {
  const [user, setUser] = useState(null);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userResponse = await api.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchRoomData = async () => {
      try {
        const token = localStorage.getItem("token");
        const roomResponse = await api.get(`/chatRooms/${roomId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRoom(roomResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
    fetchRoomData();
  }, [roomId]);

  const joinRoom = async () => {
    try {
      if (!user) return;

      const token = localStorage.getItem("token");
      if (user.isPrime || user.coins >= 150) {
        await api.post(
          `/chatRooms/${roomId}/join`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!user.isPrime) {
          await api.post(
            `/users/me/decrement-coins`,
            { amount: 150 },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        }
      } else {
        alert("Not enough coins to join the room");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to join the room");
    }
  };

  return (
    <div>
      <h2>Join Room: {room ? room.name : ""}</h2>
      <button onClick={joinRoom}>Join Room</button>
    </div>
  );
};

export default JoinRoom;
