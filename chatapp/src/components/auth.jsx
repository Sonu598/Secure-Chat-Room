import React, { useState } from "react";
import api from "../api";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    try {
      if (isLogin) {
        const response = await api.post("/auth/login", { email, password });
        localStorage.setItem("token", response.data.token);
      } else {
        await api.post("/auth/register", { email, password });
        setIsLogin(true);
      }
    } catch (error) {
      console.error(error);
      alert("Authentication failed");
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAuth}>{isLogin ? "Login" : "Register"}</button>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Need to register?" : "Have an account?"}
      </button>
    </div>
  );
};

export default Auth;
