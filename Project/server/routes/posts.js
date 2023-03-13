const express = require("express");
const router = express.Router();


const {getPost, getOwnerPostInfo,getSitterPostInfo, editOwnerPost, editSitterPost} = require("../controller/post");


router.get("/getPost",getPost);

router.get("/ownerlist/:postid",getOwnerPostInfo);
router.get("/sitterlist/:postid",getSitterPostInfo);


router.get("/editpost/:postid",editOwnerPost);
router.get("/editsitterpost/:postid",editSitterPost);

module.exports = router;