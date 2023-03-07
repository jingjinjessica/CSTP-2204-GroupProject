const express = require("express");
const router = express.Router();


const {getPost} = require("../controller/post");


router.get("/getPost",getPost);

module.exports = router;