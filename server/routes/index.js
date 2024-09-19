const express = require("express");
const registerUser = require("../controller/registerUser");
const checkEmail = require("../controller/checkEmail");
const getAllUsers = require("../controller/getUsers");
const checkPassword = require("../controller/checkPassword");
const userDetails = require("../controller/userDetails");
const logout = require("../controller/logout");
const login = require("../controller/login");
const updateUserDetails = require("../controller/updateUser");

const router = express.Router();

// create user api
router.post("/register", registerUser);

// check email for login
router.post("/email", checkEmail);

// check user password
router.post("/password", checkPassword);

// login
router.post("/login", login);

// get logged user details
router.get("/user-details", userDetails);

// get all users
router.get("/getUsers", getAllUsers);

// user logout
router.post("/logout", logout);

// update user
router.post("/update-user", updateUserDetails);

module.exports = router;
