const bcrypt = require("bcryptjs");
const Room = require("../models/room");
const User = require("../models/usermodel");

const createRoom = async (req, res) => {
  const { roomId, password } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);

    if (user.role !== "prime") {
      return res
        .status(403)
        .json({ message: "Only prime members can create chat rooms!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newRoom = await Room.create({
      roomId,
      users: [userId],
      creator: userId,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Chat room created successfully!",
      roomId: newRoom.roomId,
    });
  } catch (error) {
    res.status(500).json({ error: "Chat room creation failed!" });
  }
};

const joinRoom = async (req, res) => {
  const { roomId, password } = req.body;
  const userId = req.user.id;

  try {
    const room = await Room.findOne({ where: { roomId } });

    if (!room || !(await bcrypt.compare(password, room.password))) {
      return res.status(401).json({ message: "Invalid room ID or password!" });
    }

    if (room.users.length >= 6) {
      return res.status(403).json({ message: "Room is full!" });
    }

    const user = await User.findByPk(userId);

    if (
      user.role === "non-prime" &&
      user.totalRoomJoined > 0 &&
      user.availCoins < 150
    ) {
      return res
        .status(403)
        .json({ message: "Not enough coins to join this room!" });
    }

    if (user.role === "non-prime" && user.totalRoomJoined > 0) {
      user.availCoins -= 150;
      await user.save();
    }

    room.users.push(userId);
    await room.save();

    user.room.push(roomId);
    user.totalRoomJoined += 1;
    await user.save();

    res.status(200).json({ message: "Joined the room successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to join the room!" });
  }
};

module.exports = { createRoom, joinRoom };
