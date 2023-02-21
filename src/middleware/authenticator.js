const jwt = require("jsonwebtoken");
require("dotenv/config");

const JWT_SECRET = process.env.JWT_SECRET;

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.headers["authorization"] || req.headers["x-access-token"];

    if (!token) {
      return res.json({ message: "No token provided", success: false });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        let error = new Error("Invalid token, login again...");
        error.statusCode = 401;
        throw error;
      }

      req.userId = decoded.userId;
      req.userRole = decoded.role;
      next()
    });
  } catch (err) {
    next(err);
  }
};

module.exports = isAuthenticated;
