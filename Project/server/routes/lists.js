const express = require("express");
const router = express.Router();

const { getPost} = require("../controller/list");

router.get("/listpost",getPost);
router.post("/listpost",getPost);

module.exports = router;