const express = require("express");
const router = express.Router();


// Here we are using destructuring
const { getProfile, saveProfile, hasProfile } = require("../controller/profile");


// create a new profile
router.post("/", saveProfile);

// get a profile
router.get("/", getProfile);

// update a profile
router.put("/", saveProfile );

router.get("/hasProfile", hasProfile );

module.exports = router;