const { body, validationResult } = require("express-validator");

const validateRegistration = [
  body("userId").isString().notEmpty(),
  body("deviceId").isString().notEmpty(),
  body("name").isString().notEmpty(),
  body("phone").isString().notEmpty(),
  body("password").isString().notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateRegistration };
