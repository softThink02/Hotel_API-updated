const Authorizer = (req, res, next) => {
  if (req.userRole !== "admin") {
    return res
      .status(401)
      .json({ message: "Not authorized to access resource", success: false });
  }
  next();
};

module.exports = Authorizer;
