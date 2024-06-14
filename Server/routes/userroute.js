const express = require("express");
const { register, login } = require("../controllers/user");
const { validateRegistration } = require("../utils/validate");
const router = express.Router();

router.post("/register", validateRegistration, register);
router.post("/login", login);

module.exports = router;
