const User = require("../model/User");
const bcrypt = require("bcryptjs"); // This library/package will be used to encrypt the password
const jwt = require("jsonwebtoken"); // This Library will help us give and verify access tokens
const Profile = require("../model/Profile");



const registerUser = async (request, response) => {
  const data = request.body;

  // We are hashing/encrypting password based the data.password string and the salt value 10 which is the utmost encryption
  const encryptPassword = await bcrypt.hash(data.password, 10);

  //const profile = new Profile({});
  const newUser = new User({
    email: data.email,
    password: encryptPassword,
    userType: data.userType
    
  });
  try {
     const p1 = await newUser.save();
     return response.status(201).json({
      message: "Succesfully Registered User"
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: "There was an error",
      error,
    });
  }
};


const getProfileByUserEmail = async (email) => {
  //console.info(email);
  const user = await User.findOne({email: email});
  //console.info(user);
  const profile = await Profile.findOne({userID: user._id.toString()});
  //console.info(profile);
  return profile;
}

const loginUser = async (request, response) => {
  const data = request.body;
  let foundUser = await User.findOne({ email: data.email });

  if (foundUser) {
    // Then we will check for password
    // This will be either true or false
    const matchPassword = await bcrypt.compare(data.password,foundUser.password);

    if (matchPassword) {
      // // We are trying to create an access token based on which the user will be able to interact with the website
      const accessToken = jwt.sign({
          email: foundUser.email
        },
        process.env.SECRET_KEY
      );
      response.cookie("access-token", accessToken);

      const profileInform = await getProfileByUserEmail(data.email);
      // has profile
      if (profileInform){
        response.redirect("/index");
      }
      // has not profile by type
      else if(foundUser.userType === "owner"){
        response.redirect("/profile/createPetOwner");
      }
      else if(foundUser.userType === "sitter"){

      }

    

      return;
    }
  }
    // If user doesn't exist
  response.render("pages/login", {title: "Login"});
  };

const getAllUsers = async (request, response) => {
  try {
    const data = await User.find();

    const filteredData = data.map((user) => {
      return {
        //name: user.name,
        email: user.email,
        userID: user._id,
        createdAt: user.createdAt,
      };
    });
    return response.status(200).json({
      message: "Users found Succesfully",
      filteredData,
    });
  } catch (error) {
    return response.status(500).json({
      message: "There was an error",
      error,
    });
  }
};


module.exports = {
  registerUser,
  loginUser,
  getAllUsers
};
