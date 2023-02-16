const User = require("../model/User");
const jwt = require("jsonwebtoken"); // This Library will help us give and verify access tokens
const Profile = require("../model/Profile");
const PetPost = require("../model/PetPost");


const getPost = async (req,res) => {
    //connect 2 tables profiles and petpost
    const result = await PetPost.aggregate([
    {
        $lookup:{
            from: "profiles",
            localField:"userID",
            foreignField:"userID",
            as:"profile"
        }
    }
]);
    //console.info(result[8].profile[0]);
    res.render("pages/list",{result:result})
}



module.exports = {
    getPost
  };
  

