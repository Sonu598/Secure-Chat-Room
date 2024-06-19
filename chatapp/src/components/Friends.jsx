import React, { useState, useEffect } from "react";
import api from "../api";

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/users/me/friends", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFriends(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFriends();
  }, []);

  const addFriend = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/users/me/friends",
        { email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEmail("");
      // Refresh friends list
      const response = await api.get("/users/me/friends", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFriends(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to add friend");
    }
  };

  return (
    <div>
      <h2>Friends</h2>
      <div>
        {friends.map((friend, index) => (
          <p key={index}>{friend.email}</p>
        ))}
      </div>
      <input
        type="email"
        placeholder="Friend Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={addFriend}>Add Friend</button>
    </div>
  );
};

export default Friends;
