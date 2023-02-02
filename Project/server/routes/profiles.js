const express = require("express");
const router = express.Router();
// const multer = require("../library/multer");

const {createPetOwner, createPetSitter, getProfile,createOwnerProfilePost} = require("../controller/profile");
const {uploadImage} = require("../controller/image");

router.get("/getProfile",getProfile);

router.get("/createPetOwner",createPetOwner);

router.get("/createPetSitter",createPetSitter);


router.post("/create",createOwnerProfilePost);
router.post("/uploadImage", uploadImage);

module.exports = router;