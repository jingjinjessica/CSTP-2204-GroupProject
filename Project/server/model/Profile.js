const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema(
  {
    name: {
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
    hireReasons: {
      type: String,
      required: false,
    },
    aboutMe: {
      type: String,
      required: false,
    },
    experiences: {
      type: String,
      required: false,
    },
    photo1: {
      type: String,
      required: false,
    },
    photo2: {
      type: String,
      required: false,
    },
    photo3: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    petImage: {
      type: String,
      required: false,
    },
    petName: {
      type: String,
      required: false,
    },
    petAge: {
      type: String,
      required: false,
    },
    petWeight: {
      type: String,
      required: false,
    },
    petType: {
      type: String,
      required: false,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
