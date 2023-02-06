const express = require("express");
const router = express.Router();
const validateToken = require("../../middleware/validate");

// Here we are using destructuring
const {
  createPetPost,
  getAllPetPosts,
  updatePetPost,
  deletePetPost,
} = require("../controller/ownerpost");

// router.get("/", getAllPosts);

router.post("/create", validateToken, createPetPost);

// router.get("/:id", getPostById);

router.put("/:id", updatePetPost);

router.delete("/delete/:id", deletePetPost);

module.exports = router;
