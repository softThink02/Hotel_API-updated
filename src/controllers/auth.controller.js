const { validationResult } = require("express-validator");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SALT_ROUNDS = +process.env.SALT_ROUND;
const JWT_SECRET = process.env.JWT_SECRET;

class Auth_Controller {
  async signup(req, res, next) {
    const { username, password, email, role } = req.body;

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = new Error(errors.array()[0].msg);
        error.statusCode = 400;
        throw error;
      }

      //   hash user password before saving to DB.
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      const hashedPassword = await bcrypt.hash(password, salt);

      // create a new user...
      const newUser = new User({
        username,
        password: hashedPassword,
        email,
        role,
      });
      (await newUser.save()) &&
        res
          .status(200)
          .json({ message: "user created", data: newUser, success: true });
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    const { password, email } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = new Error(errors.array()[0].msg);
        error.statusCode = 400;
        throw error;
      }

      const user = await User.findOne({ email: email }).select("-password");
      if (!user)
        return res
          .status(200)
          .json({ message: "User not found", success: false });
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        JWT_SECRET,
        { expiresIn: "24h" }
      );

      return res
        .status(200)
        .json({
          message: "Login Successfull",
          data: { user, token },
          success: true,
        });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new Auth_Controller();
