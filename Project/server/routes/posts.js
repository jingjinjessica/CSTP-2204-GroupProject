const express = require("express");
const router = express.Router();
const validateToken = require("../../middleware/validate");
const multer = require("../library/multer");

// Here we are using destructuring
const {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
} = require("../controller/post");

const { uploadImage } = require("../controller/image");

router.post(
  "/image/upload",
  validateToken,
  multer.single("image"),
  uploadImage
);

router.get("/", getAllPosts);

router.post("/create", validateToken, createPost);



router.put("/:id", validateToken, updatePost);

router.delete("/delete/:id", validateToken, deletePost);



module.exports = router;
