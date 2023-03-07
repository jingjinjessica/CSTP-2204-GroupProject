const express = require("express");
const router = express.Router();
const validateToken = require("../../middleware/validate");

// Here we are using destructuring
const {
  createSitterPost,
  getAllPosts,
  updateSitterPost,
  deleteSitterPost,
  getPost
} = require("../controller/sitterpost");

// router.get("/", getAllPosts);

router.post("/create", createSitterPost);

// router.get("/:id", getPostById);

router.put("/:id", updateSitterPost);

router.get("/:id", getPost);

router.delete("/delete/:id", deleteSitterPost);

module.exports = router;
