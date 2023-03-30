const express = require("express");
const router = express.Router();

const { getCurrUserChatRoom } = require("../controller/message");

router.get("/getChatroom", getCurrUserChatRoom);

module.exports = router;
