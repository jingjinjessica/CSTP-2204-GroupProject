const express = require("express");
const router = express.Router();
const validateToken = require("../../middleware/validate");
const multer = require("../library/multer");

// Here we are using destructuring
const {
  createPetPost,
  getAllPosts,
  updatePetPost,
  deletePetPost,
} = require("../controller/post");

const { uploadImage } = require("../controller/image");

router.post(
  "/image/upload",
  validateToken,
  multer.single("image"),
  uploadImage
);

router.get("/", getAllPosts);

router.post("/create", validateToken, createPetPost);

// router.get("/:id", getPostById);

router.put("/:id", validateToken, updatePetPost);

router.delete("/delete/:id", validateToken, deletePetPost);

module.exports = router;
