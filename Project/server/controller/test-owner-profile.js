const bcrypt = require("bcryptjs"); // This library/package will be used to encrypt the password
const jwt = require("jsonwebtoken"); // This Library will help us give and verify access tokens
const Profile = require("../model/Profile");
const User = require("../model/User");
const cloudinary = require("../library/cloudinary");
const fs = require("fs");

//Get current user
//access token
const getUser = (req) => {
    return jwt.verify(req.cookies["access-token"], process.env.SECRET_KEY);
  };

//Find req user
const getUserEntity = async (req) => {
    const user = getUser(req);
    const entity = await User.findOne({ email: user.email });
    return entity;
  };

// Get profile by user email
const getProfileByUserEmail = async (email) => {
    console.info(email);
    const user = await User.findOne({ email: email });
    console.info(user);
    const profile = await Profile.findOne({ userID: user._id.toString() });
    console.info(profile);
    return profile;
  };

const getProfile = async (req,res) => {
    const token = req.cookies["access-token"];
    const decodedValues = jwt.verify(token, process.env.SECRET_KEY);
    let foundUser = await User.findOne({ email: decodedValues.email });
    //console.log(decodedValues, "decoded values");
    res.redirect("/profile/createPetOwner");
        
};
const hasProfile = async (req) => {
    const user = getUser(req);
    const profile = await getProfileByUserEmail(user.email);
    return profile !== null;
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
            petImage: "/image/add-img.png"
        });
    }else {
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
                petImage: profileInform.petImage??"/image/add-img.png"
            } );
        }
};

// Owner profile post and update
const createOwnerPost = async(req,res) => {
    const avatarImageResult = await uploadImage(req, "myImg");
    console.info(avatarImageResult,"avatarImageResult");
    const petImageResult = await uploadImage(req, "petImg");
    console.info(petImageResult,"petImageResult");
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
            console.info(avatarImageResult,"avatarImageResult update");
          }
          if (JSON.stringify(petImageResult) !== "{}"){
            updateClause["$set"]["petImage"] = petImageResult.url;
            console.info(petImageResult,"petImageResult update");
          }
          Profile.findOneAndUpdate({userID: userEntity._id.toString()}, updateClause, {new: true}).then((data) => {
          // return res.status(200).json({
          //   message: "updated Succesfully",
          //   data
          // })

          console.info(data,"updated");
          return res.redirect("/users/dashboard")
          
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
            console.info(data,"created");
            return res.redirect("/users/dashboard");
        }catch (error) {
            console.info(error);
            return res.status(500).json({
            message: "There was an error",
            error,
            });
        }
    }
    console.info(req.body);
};


module.exports= { createPetOwner,getProfile,createOwnerPost};