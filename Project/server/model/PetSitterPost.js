const mongoose = require("mongoose");

const PetSitterPostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    rate: {
      type: String,
      required: false,
    },
    experience: {
      type: String,
      required: true,
    },
    userID: {
      type: String,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PetSitterPost = mongoose.model("PetSitterPost", PetSitterPostSchema);

module.exports = PetSitterPost;
