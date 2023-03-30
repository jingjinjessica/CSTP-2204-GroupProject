const bcrypt = require("bcryptjs"); // This library/package will be used to encrypt the password
const jwt = require("jsonwebtoken"); // This Library will help us give and verify access tokens
const Profile = require("../model/Profile");
const User = require("../model/User");
const cloudinary = require("../library/cloudinary");
const fs = require("fs");

//GET

const getProfile = async (req,res) => {
  const token = req.cookies["access-token"];
  const decodedValues = jwt.verify(token, process.env.SECRET_KEY);
  let foundUser = await User.findOne({ email: decodedValues.email });
  //console.log(decodedValues, "decoded values");
      if(foundUser.userType === "owner"){
        res.redirect("/profile/createPetOwner");
      }
      if(foundUser.userType === "sitter"){
        res.redirect("/profile/createPetSitter");
      }  
};

//GET to satrt create Pet Owner Profile 
const createPetOwner = async (req,res) => {
    const token = req.cookies["access-token"];
    const decodedValues = jwt.verify(token, process.env.SECRET_KEY);
    const profileInform = await getProfileByUserEmail(decodedValues.email);
    if ( profileInform === null || JSON.stringify(profileInform) === "{}"){
        res.render('pages/createPetOwnerProfile',{
            email:decodedValues.email,
            name:"",
            phone:"",
            province:"Choose",
            city:"Choose",
            petName:"",
            petAge:"Choose",
            petWeight:"Choose",
            petType:"Choose",
            avatarImage: "/image/add-img.png",
            petImage: "/image/add-img.png",
            isCreate: true
        });
    }
    else {
        res.render('pages/createPetOwnerProfile',{
            email:decodedValues.email, 
            name:profileInform.name,
            phone:profileInform.phone,
            province:profileInform.province,
            city:profileInform.city,
            petName:profileInform.petName,
            petAge:profileInform.petAge,
            petWeight:profileInform.petWeight,
            petType:profileInform.petType,
            avatarImage: profileInform.avatar??"/image/add-img.png",
            petImage: profileInform.petImage??"/image/add-img.png",
            isCreate: false
        } );
    }
};

//Get user
const getUser = (req) => {
  return jwt.verify(req.cookies["access-token"], process.env.SECRET_KEY);
};

//Check has profile or not
const hasProfile = async (req) => {
    const user = getUser(req);
    const profile = await getProfileByUserEmail(user.email);
    return profile !== null;
}

//Find req user
const getUserEntity = async (req) => {
  const user = getUser(req);
  const entity = await User.findOne({ email: user.email });
  return entity;
};

// Get profile by user email
const getProfileByUserEmail = async (email) => {
  //console.info(email);
  const user = await User.findOne({ email: email });
  //console.info(user);
  const profile = await Profile.findOne({ userID: user._id.toString() });
  //console.info(profile);
  return profile;
};

// Upload Image to cloudinary
const uploadImage = async(req, name) =>{
    // if use dont change the image 
    if(req.files === null || req.files[name] === null){
        return {};
    }
    // save the image as a file
    const saveFile = req.files[name];
    if(saveFile === undefined){
      return {};
    }
    const fileName = saveFile["name"];
    try {
        fs.writeFileSync(fileName, saveFile["data"]);
        // file written successfully
        const result = await cloudinary.uploader.upload(fileName);
        return {
          public_id: result.public_id,
          url: result.secure_url,
        };
      } catch (error) {
        console.log("[ERROR] error uploadImage: ", error);
        return {};
      } 
      // delete the file
      finally{
        fs.unlinkSync(fileName) ;
      } 
}

// Owner profile post and update
const createOwnerPost = async(req,res) => {
    const avatarImageResult = await uploadImage(req, "myImg");
    //console.info(avatarImageResult);
    const petImageResult = await uploadImage(req, "petImg");
    const data = req.body;

    // password update
    if(data.password && data.password === data.cnfpwd){
        const encryptPassword = await bcrypt.hash(data.password, 10);
        await User.findOneAndUpdate({email:data.email},{$set: {password: encryptPassword}},{new:false});
    }
    const hasP = await hasProfile(req);
    // Owner profile update
    if (hasP){
        const userEntity =await getUserEntity(req);
        const updateClause = {$set:{name:data.name,
                                    phone:data.phone,
                                    province:data.province,
                                    city:data.city,
                                    petName:data.petName,
                                    petAge:data.petAge,
                                    petWeight:data.petWeight,
                                    petType:data.petType
                                }};
          if (JSON.stringify(avatarImageResult) !== "{}"){
            updateClause["$set"]["avatar"] = avatarImageResult.url;
          }
          if (JSON.stringify(petImageResult) !== "{}"){
            updateClause["$set"]["petImage"] = petImageResult.url;
          }
          Profile.findOneAndUpdate({userID: userEntity._id.toString()}, updateClause, {new: true}).then((data) => {
    
          return res.redirect("/list/listsitterpost")
          
        }).catch((error) => {
            console.log(error);
            return res.status(500). json({
              message: "fail to update user",
              error
            })
          });    
    }
    // Owner profile create
    else {
        const userEntity = await getUserEntity(req);
        const newProfile = new Profile({
            avatar:avatarImageResult.url,
            name: data.name,
            province:data.province,
            city:data.city,
            phone:data.phone,
            petImage:petImageResult.url,
            petName:data.petName,
            petAge:data.petAge,
            petWeight:data.petWeight,
            petType:data.petType,
            userID: userEntity._id
        })
        try{
            const output = await newProfile.save();
            // return res.status(201).json({
            //     message: "Post Succesfully Created",
            // data: output
            // });
            return res.redirect("/list/listsitterpost");
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
///////Pet Sitter
const createPetSitter = async(req,res) =>{
    const token = req.cookies["access-token"];
    const decodedValues = jwt.verify(token, process.env.SECRET_KEY);
    const profileInform = await getProfileByUserEmail(decodedValues.email);
    if ( profileInform === null || JSON.stringify(profileInform) === "{}"){
        res.render('pages/createPetSitterProfile',{
            email:decodedValues.email,
            name:"",
            phone:"",
            province:"Choose",
            city:"Choose",
            aboutMe:"",
            avatarImage: "/image/add-img.png",
            photo1: "/image/add-img.png",
            photo2: "/image/add-img.png",
            photo3: "/image/add-img.png"
        });
    }
    else {
        res.render('pages/createPetSitterProfile',{
            email:decodedValues.email, 
            name:profileInform.name,
            phone:profileInform.phone,
            province:profileInform.province,
            city:profileInform.city,
            aboutMe:profileInform.aboutMe,
            avatarImage: profileInform.avatar??"/image/add-img.png",
            photo1: profileInform.photo1??"/image/add-img.png",
            photo2: profileInform.photo2??"/image/add-img.png",
            photo3: profileInform.photo3??"/image/add-img.png"
        } );
    }
};

const createSitterPost = async(req,res) => {
    const avatarImageResult = await uploadImage(req, "myImg");
    //console.info(avatarImageResult);
    const photo1Result = await uploadImage(req, "photo1");
    //console.info(photo1Result);
    const photo2Result = await uploadImage(req, "photo2");
    const photo3Result = await uploadImage(req, "photo3");
    const data = req.body;
    // password update
    if(data.password && data.password === data.cnfpwd){
        const encryptPassword = await bcrypt.hash(data.password, 10);
        await User.findOneAndUpdate({email:data.email},{$set: {password: encryptPassword}},{new:false});
    }
    const hasP = await hasProfile(req);
    // Sitter profile update
    if (hasP){
        const userEntity =await getUserEntity(req);
        const updateClause = {$set:{name:data.name,
                                    phone:data.phone,
                                    province:data.province,
                                    city:data.city,
                                    aboutMe:data.aboutMe
                                }};
          if (JSON.stringify(avatarImageResult) !== "{}"){
            updateClause["$set"]["avatar"] = avatarImageResult.url;
          }
          if (JSON.stringify(photo1Result) !== "{}"){
            updateClause["$set"]["photo1"] = photo1Result.url;
          }
          if (JSON.stringify(photo2Result) !== "{}"){
            updateClause["$set"]["photo2"] = photo2Result.url;
          }
          if (JSON.stringify(photo3Result) !== "{}"){
            updateClause["$set"]["photo3"] = photo3Result.url;
          }
          Profile.findOneAndUpdate({userID: userEntity._id.toString()}, updateClause, {new: true}).then((data) => {
          // return res.status(200).json({
          //   message: "updated Succesfully",
          //   data
          // })
          console.info(data);
          return res.redirect("/list/listpetpost")
          
        }).catch((error) => {
            console.log(error);
            return res.status(500). json({
              message: "fail to update user",
              error
            })
          });    
    }
    // Sitter profile create
    else {
        const userEntity = await getUserEntity(req);
        const newProfile = new Profile({
            avatar:avatarImageResult.url,
            name: data.name,
            province:data.province,
            city:data.city,
            phone:data.phone,
            aboutMe:data.aboutMe,
            photo1:photo1Result.url,
            photo2:photo2Result.url,
            photo3:photo3Result.url,
            userID: userEntity._id
        })
        try{
            const output = await newProfile.save();
            // return res.status(201).json({
            //     message: "Post Succesfully Created",
            // data: output
            // });
            //console.info(data);           
            return res.redirect("/list/listpetpost");
        }catch (error) {
            console.info(error);
            return res.status(500).json({
            message: "There was an error",
            error,
            });
        }
    }
    //console.info(req.body);
}


module.exports= { createPetOwner,createPetSitter, getProfile,createOwnerPost,createSitterPost};
