const express = require("express");
const router = express.Router();
const validateToken = require("../../middleware/validate");

// Here we are using destructuring
const { registerUser, loginUser,getHistoryPost, getAllUsers,googleLogin,googleUserTypeRegister,logout,sendResetPasswordRequest,
    resetPassword,checkUserName } = require("../controller/user");

router.get("/", validateToken, getAllUsers);

// Dashboard
router.get("/dashboard",getHistoryPost)

// Registering
router.post("/register", registerUser);

// // Login
router.post("/login", loginUser);

//google
router.get("/googlelogin",googleLogin);
router.post("/google/usertype",googleUserTypeRegister);


//logout
router.get("/logout",logout);

//reset password
router.get("/resetrequest",sendResetPasswordRequest);
router.get("/resetpassword",resetPassword);

// router.get("/:id", userController.getUserById)

router.get("/checkusername",checkUserName);

module.exports = router;