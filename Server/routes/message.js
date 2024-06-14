const express = require("express");
const { postMessage } = require("../controllers/message");
const authMiddleware = require("../middleware/authentication");
const router = express.Router();

router.post("/messages", authMiddleware, postMessage);

module.exports = router;
