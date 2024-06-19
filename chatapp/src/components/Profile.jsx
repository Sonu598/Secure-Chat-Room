import React, { useEffect, useState } from "react";
import api from "../api";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      {user && (
        <div>
          <p>Email: {user.email}</p>
          <p>Coins: {user.coins}</p>
          <p>Prime Member: {user.isPrime ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
