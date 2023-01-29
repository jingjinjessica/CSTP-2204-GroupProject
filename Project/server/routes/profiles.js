const express = require("express");
const router = express.Router();


// Here we are using destructuring
const { getProfile, saveProfile } = require("../controller/profile");


// create a new profile
router.post("/", saveProfile);

// get a profile
router.get("/", getProfile);

// update a profile
router.put("/", saveProfile )

module.exports = router;