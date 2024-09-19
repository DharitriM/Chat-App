const getUserDetailsFromToken = require("../helper/getUserDetailsFromToken");

async function userDetails(request, response) {
  try {
    const token = request.cookies.token || "";
    const user = await getUserDetailsFromToken(token);

    if (!user) {
      return response.status(400).json({
        message: "user details",
        error: true,
      });
    }

    return response.status(200).json({
      message: "User details after login",
      data: user,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = userDetails;
