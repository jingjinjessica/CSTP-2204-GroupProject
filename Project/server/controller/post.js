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

  //owner post read  more
  const getOwnerPostInfo = async (req, res) => {
    const { postid } = req.params;
    //console.log("this is post id from server", postid);
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
    const { postid } = req.params;
  //console.log("this is post id from server", postid);
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
