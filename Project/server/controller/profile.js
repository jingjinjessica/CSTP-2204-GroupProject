const bcrypt = require("bcryptjs"); // This library/package will be used to encrypt the password
const jwt = require("jsonwebtoken"); // This Library will help us give and verify access tokens
const Profile = require("../model/Profile");
const User = require("../model/User");
// const cloudinary = require("../library/cloudinary");
const { response } = require("express");


//GET
const getProfile = async (req,res) => {
    const token = request.cookies["access-token"];
    const decodedValues = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decodedValues, "decoded values");
    res.render("pages/createPetOwner");    
};
   
const createPetOwner = async (req,res) => {
    const data =req.body;
    const token = req.cookies["access-token"];
    const decodedValues = jwt.verify(token, process.env.SECRET_KEY);
    res.render('pages/createPetOwner',{
        email:decodedValues.email});

};

const createPetSitter = async(req,res) =>{
    const data = req.body;
};

//get user
const getUser = (req) => {
    return jwt.verify(req.cookies["access-token"], process.env.SECRET_KEY);
}
const hasProfile = async (req) => {
    const user = getUser(req);
    const profile = getProfileByUserEmail(user.email);

    return JSON.stringify(profile) !== "{}";
}
//find req user
const getUserEntity = async (req) =>{
    const user = getUser(req);
    const entity = await User.findOne({email: user.email});
    return entity;
}


const getProfileByUserEmail = async (email) => {
    //console.info(email);
    const user = await User.findOne({email: email});
    //console.info(user);
    const profile = await Profile.findOne({userID: user._id.toString()});
    //console.info(profile);
    return profile;
}


// owner profile post
const createOwnerPost = async(req,res) => {
    const data = req.body;
    const hasP = await hasProfile(req);
    if (! hasP ){

        const userEntity = await getUserEntity(req);
        const newProfile = new Profile({
            name: data.name,
            province:data.province,
            city:data.city,
            phone:data.phone,
            petName:data.petName,
            petAge:data.petAge,
            petWeight:data.petWeight,
            petType:data.petType,
            userID: userEntity._id
        })
    
        try{
            const output = await newProfile.save();
            return res.status(201).json({
                message: "Post Succesfully Created",
            data: output

            });
        }catch (error) {
            console.info(error);
            return response.status(500).json({
            message: "There was an error",
            error,
            });
        }
    }
    // console.info(req.body);
};


module.exports= { createPetOwner,createPetSitter, getProfile,createOwnerPost};