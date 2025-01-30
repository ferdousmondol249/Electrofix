const User = require('../Model/userModel');

const userListController = async (req, res) => {
  try {
    const allUsers = (await User.find()).filter((user) => user.role !== 'Admin');
    if(allUsers.role!=='Admin'){
        res.status(200).json({
            message: "All users fetched successfully",
            users: allUsers,
          });

    }
    else{
        res.status(403).json({
            message: "There is no user at this time",
        });
    }
   
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = userListController;
