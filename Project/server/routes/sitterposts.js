const express = require("express");
const router = express.Router();
const validateToken = require("../../middleware/validate");

// Here we are using destructuring
const {
  createSitterPost,
  getAllPosts,
  updateSitterPost,
  deleteSitterPost,
} = require("../controller/sitterpost");

// router.get("/", getAllPosts);

router.post("/create", validateToken, createSitterPost);

// router.get("/:id", getPostById);

router.put("/:id", updateSitterPost);

router.delete("/delete/:id", deleteSitterPost);

module.exports = router;
