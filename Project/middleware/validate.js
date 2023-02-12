const jwt = require("jsonwebtoken");

// This will be beaving as a middleware to authorize if the user request is valid
const validateToken = (req, res, next) => {
  console.info("hhhhhh");
  if (req.headers?.authorization?.split(" ")[1]) {
    const token = req.headers?.authorization?.split(" ")[1];

    try {
      const decodedValues = jwt.verify(token, process.env.SECRET_KEY);
      console.log(decodedValues, "decoded values");

      req.decodedEmail = decodedValues.email;

      next();
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.status(401).json({
      message: "You have to provide an access token!",
    });
  }
};

module.exports = validateToken;
