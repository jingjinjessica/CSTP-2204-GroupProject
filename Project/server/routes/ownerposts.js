const express = require("express");
const router = express.Router();
const validateToken = require("../../middleware/validate");

// Here we are using destructuring
const {
  createSitterPost,
  getAllPosts,
  updateSitterPost,
  deleteSitterPost,
} = require("../controller/ownerpost");

// router.get("/", getAllPosts);

router.post("/create", validateToken, createOwnerPost);

// router.get("/:id", getPostById);

router.put("/:id", updateOwnerPost);

router.delete("/delete/:id", deleteOwnerPost);

module.exports = router;
