const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");

async function registerUser(request, response) {
  try {
    const { name, email, password, profile_pic, is_loggedin } = request.body;
    const checkEmail = await UserModel.findOne({ email });

    // check email
    if (checkEmail) {
      return response.status(400).json({
        message: "Already user exists",
        error: true,
      });
    }

    //password convertion into hashed
    const salt = await bcryptjs.genSalt(10);
    const hashpassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      profile_pic,
      password: hashpassword,
      is_loggedin,
    };

    const user = new UserModel(payload);
    const usersave = await user.save();

    return response.status(201).json({
      message: "User created successfully",
      data: usersave,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = registerUser;
