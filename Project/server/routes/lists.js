const express = require("express");
const router = express.Router();

const { getPetPost} = require("../controller/petPostList");
const { getSitterPost} = require("../controller/sitterPostList");

router.get("/listpetpost",getPetPost);
router.post("/listpetpost",getPetPost);

router.get("/listsitterpost",getSitterPost);
router.post("/listsitterpost",getSitterPost);

module.exports = router;