const FriendRequest = require("../models/friendRequest");

const sendFriendRequest = async (req, res) => {
  const { receiverId } = req.body;
  const senderId = req.user.id;

  try {
    const newRequest = await FriendRequest.create({
      senderId,
      receiverId,
    });

    res.status(201).json({ message: "Friend request sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send friend request!" });
  }
};

module.exports = { sendFriendRequest };
