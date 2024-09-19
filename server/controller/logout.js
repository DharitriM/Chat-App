const getUserDetailsFromToken = require("../helper/getUserDetailsFromToken");
const UserModel = require("../models/UserModel");

async function logout(request, response) {
  try {
    const token = request.cookies.token || "";

    const user = await getUserDetailsFromToken(token);
    if (!user) {
      return response.status(400).json({
        message: "logged user not found",
        error: true,
      });
    }
    const updateLogin = await UserModel.updateOne(
      { _id: user._id },
      { is_loggedin: false }
    );

    const cookieOption = {
      http: true,
      secure: true,
    };

    return response.cookie("token", "", cookieOption).status(200).json({
      message: "session out",
      success: true,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = logout;
