const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: [String],
      required: true,
    },
    // profile: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Profile",
    //     required: true
    // }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
