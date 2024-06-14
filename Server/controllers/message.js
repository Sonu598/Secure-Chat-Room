const Room = require("../models/room");

const postMessage = async (req, res) => {
  const { roomId, message } = req.body;
  const userId = req.user.id;

  try {
    const room = await Room.findOne({ where: { roomId } });

    if (!room) {
      return res.status(404).json({ message: "Room not found!" });
    }

    room.chats.push({ userId, message });
    await room.save();

    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send message!" });
  }
};

module.exports = { postMessage };
