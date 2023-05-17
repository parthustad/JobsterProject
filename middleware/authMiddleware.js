const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { CustomAPIError } = require("../middleware/error-handle");

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new CustomAPIError("Authentication invalid", 400);
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the job routes
    req.user = { ...payload };
    next();
  } catch (error) {
    throw new CustomAPIError("Authentication invalid", 400);
  }
};

module.exports = auth;
