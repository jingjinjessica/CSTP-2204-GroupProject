const express = require("express");
const router = express.Router();

const {createPetOwner, createPetSitter, getProfile,createOwnerPost,createSitterPost} = require("../controller/profile");


router.get("/getProfile",getProfile);
router.get("/createPetOwner",createPetOwner);
router.get("/createPetSitter",createPetSitter);


router.post("/create",createOwnerPost);
router.post("/createsitter",createSitterPost);


module.exports = router;


