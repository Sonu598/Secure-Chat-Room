const express = require("express");
const { sendFriendRequest } = require("../controllers/friendRequest");
const authMiddleware = require("../middleware/authentication");
const router = express.Router();

router.post("/friend-requests", authMiddleware, sendFriendRequest);

module.exports = router;
