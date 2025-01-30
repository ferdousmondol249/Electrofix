const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../Model/userModel");

const resetPasswordController = async (req, res) => {
  const { id, token } = req.query;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded.id !== id) {
      return res.status(400).json({ message: "Invalid token" });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10); 

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = resetPasswordController;
