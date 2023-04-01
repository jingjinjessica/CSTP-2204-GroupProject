const jwt = require("jsonwebtoken"); // This Library will help us give and verify access tokens
const User = require("../model/User");
const petPost = require("../model/PetPost");
const sitterPost = require("../model/PetSitterPost");
const profile = require("../model/Profile");

//GET
// post request button
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

// Define userIsLoggedIn function
function userIsLoggedIn(req) {
  const token = req.cookies["access-token"];
  if (!token) {
    return false; // No token found, user is not logged in
  }
  try {
    const decodedValues = jwt.verify(token, process.env.SECRET_KEY);
    // Check if decodedValues contains expected properties indicating that the user is authenticated
    if (decodedValues.email) {
      return true; // User is logged in
    }
  } catch (error) {
    console.error(error);
  }
  return false; // Token is invalid or doesn't contain expected properties, user is not logged in
};

// Define getOwnerPostInfo function
const getOwnerPostInfo = async (req, res) => {
  // Check if user is logged in
  if (!userIsLoggedIn(req)) {
    // Redirect user to login page if they're not logged in
    res.redirect("/login");
    return;
  }
  // If user is logged in, retrieve post information
  const { postid } = req.params;
  try {
    const post = await petPost.findById(postid);
    const petowner = post.userID;
    const owner = await profile.findOne({ userID: petowner });
    res.render("pages/OwnerPostInfo", { post, owner });
  } catch (error) {
    res.status(500).json(error);
  }
};


//sitter post read more(detail)
const getSitterPostInfo = async (req,res) => {
  // Check if user is logged in
  if (!userIsLoggedIn(req)) {
    // Redirect user to login page if they're not logged in
    res.redirect("/login");
    return;
  }
  // If user is logged in, retrieve post information
    const { postid } = req.params;
  try {
    const post = await sitterPost.findById(postid);
    const petsitter = post.userID;
    const sitter = await profile.findOne({ userID: petsitter });
    res.render("pages/sitterPostInfo", { post, sitter });
  } catch (error) {
    res.status(500).json(error);
  }
};

// edit button
// owner post 
const editOwnerPost = async (req,res) => {
    const { postid } = req.params;
    //console.log("this is post id from server", postid);
    try {
      const post = await petPost.findById(postid);
      //console.info(post);
      const petowner = post.userID;
      const owner = await profile.findOne({ userID: petowner });
      res.render("pages/petOwnerPost", { post, owner, btnName:"Update"});
    } catch (error) {
      res.status(500).json(error);
    }
};

// sitter post
const editSitterPost = async (req,res) => {
    const { postid } = req.params;
    //console.log("this is post id from server", postid);
    try {
      const post = await sitterPost.findById(postid);
      console.info(post);
      const petsitter = post.userID;
      const sitter = await profile.findOne({ userID: petsitter });
      res.render("pages/sitterPost", { post, sitter, btnName:"Update"});
    } catch (error) {
      res.status(500).json(error);
    }
};



module.exports= { getPost, getOwnerPostInfo,getSitterPostInfo, editOwnerPost, editSitterPost};
