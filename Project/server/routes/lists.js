const express = require("express");
const router = express.Router();

const { getPetPost} = require("../controller/petPostList");

router.get("/listpetpost",getPetPost);
router.post("/listpetpost",getPetPost);

module.exports = router;