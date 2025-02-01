const User = require('../Model/userModel');
const path = require('path');
const bcrypt = require('bcrypt');

const modifyProfileController = async (req, res) => {
  const { name, email, password } = req.body;
  const file = req.file; 
  console.log(file);

  try {
    const userToUpdate = await User.findOne({ email: email });

    if (!userToUpdate) {
      return res.status(404).json({ message: 'User not found' });
    }

    userToUpdate.name = name || userToUpdate.name;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10); 
      userToUpdate.password = hashedPassword;
    }

    if (file) {
      const filePath = path.join('uploads', file.filename);
      userToUpdate.image = filePath;
    }

    await userToUpdate.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        name: userToUpdate.name,
        email: userToUpdate.email,
        image: userToUpdate.image,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, unable to update profile' });
  }
};

module.exports = modifyProfileController;
