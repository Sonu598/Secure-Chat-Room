const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const authRoutes = require("./routes/userroute");
const roomRoutes = require("./routes/room");
const profileRoutes = require("./routes/profile");
const friendRequestRoutes = require("./routes/friendRequest");
const Room = require("../models/room");

app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", roomRoutes);
app.use("/api", profileRoutes);
app.use("/api", friendRequestRoutes);

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("joinRoom", ({ roomId }) => {
    socket.join(roomId);
  });

  socket.on("message", async ({ roomId, userId, message }) => {
    const room = await Room.findOne({ where: { roomId } });
    if (room) {
      room.chats.push({ userId, message });
      await room.save();

      io.to(roomId).emit("message", { userId, message });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
