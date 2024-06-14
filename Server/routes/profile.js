const express = require("express");
const { getProfile } = require("../controllers/profile");
const router = express.Router();

router.get("/profile/:userId", getProfile);

module.exports = router;
