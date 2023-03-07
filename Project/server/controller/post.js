const jwt = require("jsonwebtoken"); // This Library will help us give and verify access tokens
const User = require("../model/User");

//GET
const getPost = async (req,res) => {
    const token = req.cookies["access-token"];
    const decodedValues = jwt.verify(token, process.env.SECRET_KEY);
    let foundUser = await User.findOne({ email: decodedValues.email });
        if(foundUser.userType === "owner"){
          res.redirect("/petownerpost");
        }
        if(foundUser.userType === "sitter"){
          res.redirect("/petsitterpost");
        }  
  };

module.exports= { getPost};
