const express = require("express");
const router = express.Router();

const {createPetOwner, createPetSitter, getProfile,createOwnerPost,post} = require("../controller/profile");


router.get("/getProfile",getProfile);

router.get("/createPetOwner",createPetOwner);

router.get("/createPetSitter",createPetSitter);


router.post("/create",createOwnerPost);



module.exports = router;