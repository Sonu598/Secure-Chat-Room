const User = require("../models/usermodel");

const getProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ where: { userId } });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user profile!" });
  }
};

module.exports = { getProfile };
