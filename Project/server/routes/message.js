const express = require("express");
const router = express.Router();

const { getCurrUserChatRoom } = require("../controller/message");

router.get("/", getCurrUserChatRoom);

module.exports = router;
