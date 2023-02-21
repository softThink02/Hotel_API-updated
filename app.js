const express = require("express");
const cors = require("cors");
const connectDB = require("./src/utils/database");
const roomRoutes = require("./src/routes/room.route");
const authRoutes = require("./src/routes/auth")
require("dotenv/config");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// Register all routes here
app.get("/", (req, res) => res.send("Welcome to this HOTEL API..."));

// room routes
app.use("/api/v1", roomRoutes);

// authentication routes
app.use("/api/v1", authRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

// error handler middleware
app.use((err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .json({ message: err.message, success: false });
});

const PORT = process.env.PORT || 3000;

connectDB(() => {
  app.listen(PORT, () => console.log(`Connected to port ${PORT}`));
});
