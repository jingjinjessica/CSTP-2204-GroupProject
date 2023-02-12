const express = require("express");
const router = express.Router();
const validateToken = require("../../middleware/validate");

// Here we are using destructuring
const { registerUser, loginUser,getHistoryPost, getAllUsers } = require("../controller/user");

router.get("/", validateToken, getAllUsers);

// dashboard
router.get("/dashboard",getHistoryPost)

// Registering
router.post("/register", registerUser);

// // Login
router.post("/login", loginUser);


// router.get("/:id", userController.getUserById)

module.exports = router;