const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const bcrypt = require("bcrypt");

const User = require("../models/user.model");
const AuthController = require("../controllers/auth.controller");

// route for getting all room types from the database
router.post(
  "/signup",
  [
    body("username").not().isEmpty().withMessage("Username must not be empty"),
    body("email", "Invalid email provided")
      .isEmail()
      .custom(async (value, { req }) => {
        const existingEmail = await User.findOne({ email: value });
        if (existingEmail) {
          throw new Error("This email already exists, use another one.");
        }
      }),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be upto eight characters"),
    body("role")
      .not()
      .isEmpty()
      .withMessage("User role must be specified to be either user or admin"),
  ],
  AuthController.signup
);

// route for getting all room types from the database
router.post(
  "/login",
  [
    body("email", "Invalid email provided")
      .isEmail()
      .custom(async (value, { req }) => {
        const existingEmail = await User.findOne({ email: value });
        if (!existingEmail) {
          throw new Error("Email address not found");
        }
        return true;
      }),
    body("password").custom(async (value, { req }) => {
      const user = await User.findOne({ email: req.body.email });
      const passwordMatch = await bcrypt.compare(value, user.password);
      if (!passwordMatch) {
        throw Error("Incorrect Passoword");
      }
      return true;
    }),
  ],
  AuthController.login
);

module.exports = router;
