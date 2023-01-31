const bcrypt = require("bcryptjs"); // This library/package will be used to encrypt the password
const jwt = require("jsonwebtoken"); // This Library will help us give and verify access tokens
const Profile = require("../model/Profile");
const User = require("../model/User");
//const cloudinary = require("../library/cloudinary");
const { response } = require("express");



//GET
const getProfile = async (req,res) => {
    const token = request.cookies["access-token"];
    const decodedValues = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decodedValues, "decoded values");
    res.render("pages/createPetOwner");    
};
   
const createPetOwner = async (req,res) => {
   
    const token = req.cookies["access-token"];
    const decodedValues = jwt.verify(token, process.env.SECRET_KEY);
    const profileInform = await getProfileByUserEmail(decodedValues.email);
    res.render('pages/createPetOwner',{
        email:decodedValues.email, name:profileInform.name});
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
    const profile = await getProfileByUserEmail(user.email);
    //console.info(user);
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

    if(data.password && data.password === data.cnfpwd){
        const encryptPassword = await bcrypt.hash(data.password, 10);
        await User.findOneAndUpdate({email:data.email},{$set: {password: encryptPassword}},{new:false});
    }
    const hasP = await hasProfile(req);
    if (hasP){
        const userEntity =await getUserEntity(req);
        const updateClause = {$set:{name:data.name,city:data.city}};
          Profile.findOneAndUpdate({userID: userEntity._id.toString()}, updateClause, {new: true}).then((data) => {
          return res.status(200).json({
            message: "updated Succesfully",
            data
          })
          
        }).catch((error) => {
            console.log(error);
            return res.status(500). json({
              message: "fail to update user",
              error
            })
          });

        
    }
    else {
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
            return res.status(500).json({
            message: "There was an error",
            error,
            });
        }
        


    }
    // console.info(req.body);
};


module.exports= { createPetOwner,createPetSitter, getProfile,createOwnerPost};