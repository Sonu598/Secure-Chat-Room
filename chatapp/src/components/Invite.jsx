import React, { useState } from "react";
import api from "../api";

const Invite = ({ roomId }) => {
  const [email, setEmail] = useState("");

  const inviteUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (email) {
        await api.post(
          `/chatRooms/${roomId}/invite`,
          { email },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEmail("");
      }
    } catch (error) {
      console.error(error);
      alert("Invitation failed");
    }
  };

  return (
    <div>
      <h2>Invite User</h2>
      <input
        type="email"
        placeholder="User Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={inviteUser}>Invite</button>
    </div>
  );
};

export default Invite;
