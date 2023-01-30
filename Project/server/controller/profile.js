const User = require("../model/User");
const bcrypt = require("bcryptjs"); // This library/package will be used to encrypt the password
const jwt = require("jsonwebtoken");

const Profile = require("../model/Profile");
const { response } = require("express");
const getUser = (req) => {
    return jwt.verify(req.cookies["access-token"], process.env.SECRET_KEY);
}
const hasProfile = async (req, res) => {
    const user = getUser(req);
    const profile = getProfileByUserEmail(user.email);
    return res.status(201).json({
        result: JSON.stringify(profile) !== "{}"
    });

}

const getProfileByUserEmail = async (email) => {
    console.info(email);
    const user = await User.findOne({email: email});
    console.info(user);
    const profile = await Profile.findOne({userID: user._id.toString()});
    console.info(profile);
    return profile;
}
//
const getProfile = async (request, response) => {


        response.render("pages/editPetOwner", {title: "Jessica is a good girl"})
    };   
    
    
//   const data = request.body;

//   // We are hashing/encrypting password based the data.password string and the salt value 10 which is the utmost encryption
//   const encryptPassword = await bcrypt.hash(data.password, 10);

//   //const profile = new Profile({});
//   const newUser = new User({
//     email: data.email,
//     password: encryptPassword,
//     userType: data.userType
//   });
//   try {
//      const p1 = await newUser.save();
//      return response.status(201).json({
//       message: "Succesfully Registered User"
//     });
//   } catch (error) {
//     console.log(error);
//     return response.status(500).json({
//       message: "There was an error",
//       error,
//     });
//   }


const saveProfile = async (request, response) =>{

}

module.exports = {
    getProfile,
    saveProfile,
    hasProfile
}