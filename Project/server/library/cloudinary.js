const cloudinary = require("cloudinary").v2;

require("dotenv").config();

cloudinary.config({
  // cloud_name: "dl3wpyt6v",
  // api_key: "385627243238455",
  // api_secret: "iMtyPO4Nhi_tQRzRcVSfL-smMOg",

  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

module.exports = cloudinary;
