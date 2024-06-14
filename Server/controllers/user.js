const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");

const register = async (req, res) => {
  const { userId, deviceId, name, phone, availCoins, role, password } =
    req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      userId,
      deviceId,
      name,
      phone,
      availCoins,
      role,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: "User registration failed!" });
  }
};

const login = async (req, res) => {
  const { userId, password } = req.body;

  try {
    const user = await User.findOne({ where: { userId } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed!" });
  }
};

module.exports = { register, login };
