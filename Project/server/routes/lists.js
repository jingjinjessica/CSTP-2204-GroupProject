const express = require("express");
const router = express.Router();

// const { getPetPost} = require("../controller/petPostList");
const { getSitterPost} = require("../controller/sitterPostList");

// testing
const { getPetPost} = require("../controller/filterTest");

router.get("/listpetpost",getPetPost);
router.post("/listpetpost",getPetPost);

router.get("/listsitterpost",getSitterPost);
router.post("/listsitterpost",getSitterPost);

module.exports = router;