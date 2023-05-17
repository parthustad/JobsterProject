const { CustomAPIError } = require("../middleware/error-handle");
const userModel = require("../models/userModel");
const register = async (req, res) => {
  const user = await userModel.create(req.body);
  res.status(200).json({ user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomAPIError("Email and Password is required", 400);
  }

  let user = await userModel.findOne({ email });
  if (user.length == 0) {
    throw new CustomAPIError("Invalid Credentials", 400);
  }

  const isPasswordCorrect = user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new CustomAPIError("Invalid Credentials", 400);
  }
  const token = await user.generateJwt();

  res.status(200).json({ token });
};

module.exports = {
  register,
  login,
};
