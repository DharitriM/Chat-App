const UserModel = require("../models/UserModel");

async function getAllUsers(request, response) {
  try {
    const allUsers = await UserModel.find({});
    return response.status(200).json({
      message: "",
      success: true,
      data: allUsers?.length > 0 && allUsers,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = getAllUsers;
