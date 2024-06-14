const express = require("express");
const { createRoom, joinRoom } = require("../controllers/room");
const authMiddleware = require("../middleware/authentication");
const router = express.Router();

router.post("/chatrooms", authMiddleware, createRoom);
router.post("/joinroom", authMiddleware, joinRoom);

module.exports = router;
