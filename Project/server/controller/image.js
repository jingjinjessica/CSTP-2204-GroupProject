// const cloudinary = require("../library/cloudinary");


const uploadImage = async (request, response) => {
  try {
    const result = await cloudinary.uploader.upload(request.file.path);
    response.json({
      public_id: result.public_id,
      url: result.secure_url,
    });
    console.log(result);
  } catch (error) {
    console.log("[ERROR] error uploadImage: ", error);
    response.status(500).json({
      message:
        "There was an error when uploading image. Your image may be too large.",
    });
  }
};

module.exports = {
  uploadImage
};
