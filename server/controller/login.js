const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function login(request, response) {
  try {
    const { email, password } = request.body;
    const user = await UserModel.findOne({ email });

    //check email
    if (!user) {
      return response.status(400).json({
        message: "wrong email, please try again!",
        error: true,
      });
    }

    //check password
    const verifyPassword = await bcryptjs.compare(password, user.password);
    if (!verifyPassword) {
      return response.status(400).json({
        message: "wrong password, please try again",
        error: true,
      });
    }

    const updateLogin = await UserModel.updateOne(
      { _id: user._id },
      { is_loggedin: true }
    );

    // token for response
    const tokenData = {
      id: user._id,
      email: user.email,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    const cookieOption = {
      http: true,
      secure: true,
    };

    return response.cookie("token", token, cookieOption).status(200).json({
      message: "Login successful",
      success: true,
      token: token,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = login;
