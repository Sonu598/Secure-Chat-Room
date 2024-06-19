// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./components/auth";
import CreateRoom from "./components/CreateRoom";
import ChatRoom from "./components/ChatRoom";
import Profile from "./components/Profile";
import Friends from "./components/Friends";
import JoinRoom from "./components/JoinRoom";
import Invite from "./components/Invite";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth" component={Auth} />
        <Route path="/create-room" component={CreateRoom} />
        <Route path="/chat/:roomId" component={ChatRoom} />
        <Route path="/profile" component={Profile} />
        <Route path="/friends" component={Friends} />
        <Route path="/join/:roomId" component={JoinRoom} />
        <Route path="/invite/:roomId" component={Invite} />
        <Route path="/" component={Auth} />
      </Routes>
    </Router>
  );
};

export default App;
